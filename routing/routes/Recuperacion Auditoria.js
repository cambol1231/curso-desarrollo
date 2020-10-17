const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')


const Response = require('../reponse')

router

    .get('/RecuperacionAuditoria', async(req, res) => {
    try {
        const sql = `SELECT p.idProc_Recupera as id, per.Correo as correo ,m.nombre as Material, um.Descripcion as UnidadDeMedida, p.Cantidad
        FROM greenreportbdpruebas.proc_recupera_autori pa
        left join greenreportbdpruebas.proc_recupera p on pa.idPorc_Recupera = p.idProc_Recupera
        left join greenreportbdpruebas.material m on p.idMaterialRec  = m.idMaterial
        left join greenreportbdpruebas.unidaddemedida um on um.idUnidadDeMedida = p.idUnidadMedida
        left join greenreportbdpruebas.personal per on per.idPersonal = p.idPersonalRec;`;
        const data = await DB.query(sql);
        res.json(data)
    } catch (error) {
        res.json({ status: 'error', error })
    }
})

.post('/RecuperacionAuditoria', async(req, res) => {
    try {
        const response = await DB.query(`INSERT INTO proc_recupera_autori (idPorc_Recupera, idPersonal, idMaterial, CantidadMaterial, idUnidadMedida)  VALUES (?,?,?,?,?)`, [req.body.idPorc_Recupera, req.body.idPersonal, req.body.idMaterial, req.body.CantidadMaterial, req.body.idUnidadMedida]);
        Object.assign(response, { created_at: new Date() })
        const fecha = req.body.idPorc_Recupera
        await DB.query(`UPDATE ?? SET Fecha_Proc_Recupera_Autor=? WHERE idPorc_Recupera = ?;`, ['proc_recupera_autori', new Date(), fecha]);
        await DB.query(`UPDATE ?? SET created_at =? WHERE idPorc_Recupera = ?;`, ['proc_recupera_autori', new Date(), fecha]);
        await DB.query(`UPDATE ?? SET idCO2Material =(Select distinct idCO2Material from co2material where idmaterial = ?) WHERE idPorc_Recupera = ?;`, ['proc_recupera_autori', req.body.idMaterial, fecha]);
        res.json({ status: 'ok', response })
    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})



module.exports = router;