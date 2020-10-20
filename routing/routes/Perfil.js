const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')


const Response = require('../reponse')

router

    .post('/Perfil', async(req, res) => {
    try {
        const correo = req.body.correo
        const sql = await DB.query(`SELECT p.Nombre, r.Descripcion as rol , sum(convert (pe.cantidad , float))*sum(convert (co2.cantidaddeco2 , float)) as Aporte
        FROM greenreportbdpruebas.personal p
        inner join greenreportbdpruebas.cargo c on c.id = p.idCargo
        inner join greenreportbdpruebas.usuario u on p.idPersonal = u.idPersonal
        inner join greenreportbdpruebas.permisos per on u.id = per.idUsuario
        inner join greenreportbdpruebas.rol r on r.idRol = per.idRol
        left join greenreportbdpruebas.proc_recupera pe on p.idPersonal = pe.idPersonalRec
        inner join greenreportbdpruebas.proc_recupera_autori pa on pa.idPorc_Recupera = pe.idProc_Recupera
        left join greenreportbdpruebas.material m on pe.idMaterialRec  = m.idMaterial
        left join greenreportbdpruebas.unidaddemedida um on um.idUnidadDeMedida = pe.idUnidadMedida
        left join greenreportbdpruebas.co2material co2 on co2.idMaterial = m.idMaterial
        where p.correo = ? Group by p.Nombre, r.Descripcion`, [correo])
        const data = sql
        res.json(data)

    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})




module.exports = router;