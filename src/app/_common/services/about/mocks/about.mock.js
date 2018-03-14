var data = require('./about.data.json');

module.exports = {
    '/info': {
        get: (req, res) => {
            res.send(JSON.stringify(data.edgeVersion));
        }
    },
    '/api/v1/info': {
        get: (req, res) => {
            res.send(JSON.stringify(data.apiVersion));
        }
    }
}
