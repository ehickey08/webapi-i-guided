const express = require('express');

const Hubs = require('./data/hubs-model.js');

const server = express();
server.use(express.json());
server.get('/', (req, res) => {
    res.send('hello web 20.75');
});

server.get('/hubs', (req, res) => {
    Hubs.find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(error => {
            res.status(500).json({ message: 'error getting the list of hubs' });
        });
});

server.post('/hubs', (req, res) => {
    const hubInformation = req.body;

    Hubs.add(hubInformation)
        .then(hub => {
            res.status(201).json(hub);
        })
        .catch(error => {
            res.status(500).json({ message: 'error adding in the hub' });
        });
});

server.delete('/hubs/:id', (req, res) => {
    const hubID = req.params.id;

    Hubs.remove(hubID)
        .then(hub => {
            res.status(200).json({ message: 'hub deleted successfully' });
        })
        .catch(error => {
            res.status(500).json({ message: 'error removing the hub' });
        });
});

server.put('hubs/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Hubs.update(id, changes)
        .then(updated => {
            if(udpated){
                res.status(200).json(updated)
            } else {
                res.status(404).json({message: 'hub not found'})
            }
        }) 
        .catch(error => {
            res.status(500).json({message: 'error updating hub'})
        })
})
const port = 8000;
server.listen(port, () => console.log('\napi running\n'));
