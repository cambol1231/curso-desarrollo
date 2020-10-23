
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')
const validator = require('../../validate/validator')

const Response = require('../reponse')

router
  .post('/auth', async (req, res) => {
    const error = { error: 'Datos de acceso incorrectos' }
    try {
      const data = validator('auth').cleanData(req.body)
      const errors = validator('auth').isValid(data)
      if(errors) {
        Response.error(res, errors)
      } else {
        const { username, password } = data
        const sql = `
          SELECT
            u.id,
            u.name,
            u.username,
            u.email,
            u.access,
            u.last_login,
            p.name profile,
            u.status
          FROM USERS u
          INNER JOIN PROFILES p ON p.id = u.profile_id
          WHERE u.username=?;
        `
        const [user] = await DB.query(sql, username)
        if(!user){
          Response.error(res, error, 404)
        } else {
          const validatePassword = bcrypt.compareSync(password, user.access)
          if(!validatePassword) {
            Response.error(res, error, 404)
          } else {
            await DB.query(
              `UPDATE ?? SET last_login=? WHERE id=?;`,
              ['USERS', new Date(), user.id]
            )
            delete user['access']
            const token = jwt.createToken(user)
            if (token) {
              res.setHeader('Authorization', `Bearer ${token}`)
            }
            console.log('Token: ', token)
            Response.succes(res, user)
          }
        }
      }
    } catch(error) {
      Response.error(res, error)
    }
  })

  module.exports = router