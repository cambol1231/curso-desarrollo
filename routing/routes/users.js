
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const db = new DB('USERS')

router
  .get('/users', async (req, res) => {
    try {
      const data = await db.getAll()
      res.json(data)
    } catch(error) {
      res.json({ status: 'error', error })
    }
  })
  .get('/users/:id', async (req, res) => {
    try {
      const { params: { id }} = req
      const [data] = await db.getOne(id)
      res.json(data)
    } catch(error) {
      res.json({ status: 'error', error })
    }
  })
  .post('/users', async (req, res) => {
    try {
      const data = req.body
      data.access = bcrypt.hashSync(data.access, 10)
      const response = await db.create(data)
      res.json({ status: 'ok', response })
    } catch(error) {
      res.json({ status: 'error', error })
    }
  })
  .put('/users/:id', async (req, res) => {
    try {
      const { body: data } = req
      const { params: { id }} = req
      const response = await db.update(data, id)
      res.json({ status: 'ok', response })
    } catch (error) {
      res.json({ status: 'error', error })
    }
  })
  .delete('/users/:id', async (req, res) => {
    try {
      const { params: { id }} = req
      const response = await db.destroy(id)
      res.json({ status: 'ok', response })
    } catch(error) {
      res.json({ status: 'error', error })
    }
  })

  module.exports = router