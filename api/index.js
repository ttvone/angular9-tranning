const express = require('express');
const cors = require('cors');
const database = require('./database');
const metadata = require('./metadata.json');
const app = express();
const port = 4100;
const purcheseOrders = database();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to nodejs web api',
        exampleModel: metadata.model
    });
});

app.get('/api/po', (req, res) => {
    res.json(purcheseOrders.map(m => {
        const data = Object.assign({}, m);
        delete data.products;
        return data;
    }));
});

app.get('/api/po/:id', (req, res) => {
    const data = purcheseOrders.find(m => m.poId == req.params.id);
    if (data) res.json(data);
    else res.status(404).json({ message: 'Not found purchase order' });
});

app.put('/api/po/:id', (req, res) => {
    let data;
    purcheseOrders.some(m => {
        if (m.poId != req.params.id) return;
        data = m = Object.assign(m, req.body, { poUpdated: new Date() });
        return true;
    });
    if (data) res.json({ message: 'Successfully', data: data });
    else res.status(404).json({ message: 'Not found purchase order' });
    database(purcheseOrders);
});

app.post('/api/po', (req, res) => {
    req.body.poDate = new Date(req.body.poDate);
    const data = {
        poId: Math.random(),
        ...req.body,
        poCreated: new Date(),
        poUpdated: new Date()
    };
    purcheseOrders.push(data);
    res.json({ message: 'Successfully', data: data });
    database(purcheseOrders);
});

app.delete('/api/po/:id', (req, res) => {
    const index = purcheseOrders.findIndex(m => m.poId == req.params.id);
    if (index >= 0) {
        purcheseOrders.splice(index, 1);
        res.json({ message: 'Successfully' });
    }
    else res.status(404).json({ message: 'Not found purchase order' });
    database(purcheseOrders);
});

app.listen(port, () => console.log(`starting : http://localhost:${port}`));