const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')


const Response = require('../reponse')

router

    .get('/Personal', async(req, res) => {
    try {
        const sql = `SELECT p.idPersonal,p.nombre , p.Correo, p.estado, c.Cargo, r.Descripcion
        FROM greenreportbdpruebas.personal p
        inner join greenreportbdpruebas.cargo c on c.id = p.idCargo
        inner join greenreportbdpruebas.usuario u on p.idPersonal = u.idPersonal
        inner join greenreportbdpruebas.permisos per on u.id = per.idUsuario
        inner join greenreportbdpruebas.rol r on r.idRol = per.idRol`;
        const data = await DB.query(sql);
        res.json(data)
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

.post('/Personal', async(req, res) => {
    try {
        const data = req.body
        const response = await DB.query(`INSERT INTO personal (Nombre,Correo,Estado,idCargo) VALUES (?,?,?,?); `, [req.body.nombre, req.body.Correo, req.body.estado, req.body.idCargo])
        Object.assign(response, { created_at: new Date() })
        res.json({ status: 'ok', response })
    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})

.post('/Usuario', async(req, res) => {
    try {
        const data = req.body
        const response = await DB.query(`INSERT INTO usuario (correo,idPersonal,idContraseña) VALUES(?,?,?);`, [req.body.Correo, 1, req.body.idContraseña])
        const [personal] = await DB.query('SELECT idPersonal from personal where correo =?', [req.body.Correo])
        await DB.query('UPDATE usuario SET idPersonal = ? where correo =?', [personal.idPersonal, req.body.Correo])
        Object.assign(response, { created_at: new Date() })
        res.json({ status: 'ok', response })
    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})

.post('/Contrasenas', async(req, res) => {
    try {
        const data = req.body
        const response = await DB.query(`INSERT INTO contraseñas (id)VALUES (?);`, [req.body.idContraseña])
        Object.assign(response, { created_at: new Date() })
        res.json({ status: 'ok', response })
    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})

.post('/rol', async(req, res) => {
    try {
        const data = req.body
        const response = await DB.query(`INSERT INTO rol (Descripcion)VALUES (?);`, [req.body.Descripcion])
        Object.assign(response, { created_at: new Date() })
        res.json({ status: 'ok', response })
    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})

.post('/permisos', async(req, res) => {
    try {
        const data = req.body
        const [Rol] = await DB.query('SELECT idRol,Descripcion FROM greenreportbdpruebas.rol where Descripcion =?', [req.body.Descripcion])
        const [Usuario] = await DB.query('SELECT id, correo FROM greenreportbdpruebas.usuario where correo =?', [req.body.Correo])
        const id = Rol.idRol
        const usuarioid = Usuario.id
        const response = await DB.query(`INSERT INTO permisos (idRol,idUsuario)VALUES (?,?);`, [id, usuarioid])
        Object.assign(response, { created_at: new Date() })
        res.json({ status: 'ok', response })
    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})


module.exports = router;