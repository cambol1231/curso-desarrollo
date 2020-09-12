const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const db = new DB('material')

router
    .get('/materiales', async(req, res) => {
        try {
            const data = await db.getAll()
            console.log(data)
            res.json(data)
        } catch (error) {
            res.json({ status: 'error', error })
        }
    })
    .get('/materiales/:id', async(req, res) => {
        try {
            const { params: { id } } = req
            const [data] = await db.getOne(id)
            res.json(data)
        } catch (error) {
            res.json({ status: 'error', error })
        }
    })
    .post('/materiales', async(req, res) => {
        try {
            const data = req.body
            const response = await db.create(data)
            res.json({ status: 'ok', response })
        } catch (error) {
            res.json({ status: 'error', error })
        }
    })
    .put('/materiales/:id', async(req, res) => {
        try {
            const { body: data } = req
            const { params: { id } } = req
            const response = await db.update(data, id)
            res.json({ status: 'ok', response })
        } catch (error) {
            res.json({ status: 'error', error })
        }
    })
    .delete('/materiales/:id', async(req, res) => {
        try {
            const { params: { id } } = req
            const response = await db.destroy(id)
            res.json({ status: 'ok', response })
        } catch (error) {
            res.json({ status: 'error', error })
        }
    })

module.exports = router