
const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const db = new DB('PROFILES')

router
  .get('/profiles', async (req, res) => {
    try {
      const data = await db.getAll()
      res.json(data)
    } catch(error) {
      res.json({ status: 'error', error })
    }
  })
  .get('/profiles/:id', async (req, res) => {
    try {
      const { params: { id }} = req
      const [data] = await db.getOne(id)
      res.json(data)
    } catch(error) {
      res.json({ status: 'error', error })
    }
  })
  .post('/profiles', async (req, res) => {
    try {
      const data = req.body
      const response = await db.create(data)
      res.json({ status: 'ok', response })
    } catch(error) {
      res.json({ status: 'error', error })
    }
  })
  .put('/profiles/:id', async (req, res) => {
    try {
      const { body: data } = req
      const { params: { id }} = req
      const response = await db.update(data, id)
      res.json({ status: 'ok', response })
    } catch (error) {
      res.json({ status: 'error', error })
    }
  })
  .delete('/profiles/:id', async (req, res) => {
    try {
      const { params: { id }} = req
      const response = await db.destroy(id)
      res.json({ status: 'ok', response })
    } catch(error) {
      res.json({ status: 'error', error })
    }
  })

  module.exports = router