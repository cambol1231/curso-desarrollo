const express = require('express')
const bodyParser = require('body-parser')
const http = require('http');
const port = 3001
const app = express()
const cors = require('cors')



var allowlist = ['*']
var corsOptionsDelegate = function(req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.get('/products/:id', cors(corsOptionsDelegate), function(req, res, next) {
    res.json({ msg: 'This is CORS-enabled for an allowed domain.' })
})

app.listen(port, function() {
    console.log(`CORS-enabled web server listening on port ${port}`)
})



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))


const routes = require('./routing/routes')
app.use('/api/v1.0/', routes)