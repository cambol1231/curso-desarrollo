const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')


const Response = require('../reponse')

router

    .post('/Accesos', async(req, res) => {
    try {
        const rol = req.body.rol
        const sql = await DB.query(`SELECT rp.idRol,r.Descripcion,p.idPaginas, p.ulr, p.Descripcion FROM greenreportbdpruebas.rolespaginas rp
        inner join greenreportbdpruebas.rol r on r.idrol = rp.idrol
        inner join greenreportbdpruebas.paginas p on p.idPaginas = rp.idPagina
        where r.idRol = ?;`, [rol])
        const data = sql
        res.json(data)

    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})




module.exports = router;