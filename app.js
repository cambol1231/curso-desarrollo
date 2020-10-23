const express = require('express')
const bodyParser = require('body-parser')

const port = 3001
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

app.get('/', (req, res) => {
    res.json({ status: 'success' })
})

const routes = require('./routing/routes')
app.use('/api/v1.0/', routes)

app.get('*', (req, res) => {
    res.status(401).json({ status: 'error' })
})

app.listen(port, () => {
    console.log(`Servidor funcionando en localhost: ${port}`)
});