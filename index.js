// index.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Simulated bin data with random positions
const bins = generateRandomBins(50); // Generate 50 bins

function generateRandomBins(numberOfBins) {
    const bins = [];

    for (let i = 1; i <= numberOfBins; i++) {
        const bin = {
            name: `Bin${i}`,
            latitude: getRandomCoordinate(17.35, 17.45),
            longitude: getRandomCoordinate(78.45, 78.55),
            isFull: false,
        };
        bins.push(bin);
    }

    return bins;
}

function getRandomCoordinate(min, max) {
    return min + Math.random() * (max - min);
}

app.get('/getBins', (req, res) => {
    console.log('Sending bin data:', bins);
    res.json(bins);
});

app.post('/simulateAlert/:binName', (req, res) => {
    const { binName } = req.params;
    const bin = bins.find(b => b.name === binName);

    if (bin) {
        bin.isFull = true;
        console.log(`Alert simulated for ${binName}.`);
        res.json({ message: `Alert simulated for ${binName}.` });
    } else {
        console.error(`Bin ${binName} not found.`);
        res.status(404).json({ error: `Bin ${binName} not found.` });
    }
});

app.get('/simulationAlerts', (req, res) => {
    const filledBins = bins.filter(bin => bin.isFull);
    console.log('Sending filled bin data:', filledBins);
    res.json(filledBins);
});

app.get('*', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
