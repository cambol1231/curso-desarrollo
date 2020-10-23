const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')


const Response = require('../reponse')

router

    .get('/Recuperacion', async(req, res) => {
    try {
        const sql = `SELECT p.idProc_Recupera as id, per.Correo as correo,m.nombre as Material, um.Descripcion as DescripcionUnidadMedida, p.Cantidad as Cantidad
        FROM greenreportbdpruebas.proc_recupera p
       left join greenreportbdpruebas.material m on p.idMaterialRec  = m.idMaterial
       left join greenreportbdpruebas.unidaddemedida um on um.idUnidadDeMedida = p.idUnidadMedida
       left join greenreportbdpruebas.personal per on per.idPersonal = p.idPersonalRec`;
        const data = await DB.query(sql);
        res.json(data)
    } catch (error) {
        res.json({ status: 'error', error })
    }
})


.post('/Recuperacion', async(req, res) => {
    try {
        const [id] = await DB.query('SELECT idPersonal FROM personal where correo = ?', [req.body.correo]);
        const response = await DB.query(`INSERT INTO proc_recupera (idPersonalRec, idMaterialRec, idUnidadMedida, Cantidad)  VALUES (?,?,?,?)`, [id.idPersonal, req.body.idMaterialRec, req.body.idUnidadMedida, req.body.Cantidad])
        Object.assign(response, { created_at: new Date() })
        const [consecutivo] = await DB.query('SELECT max(idProc_recupera) +1 as Consecutivo  FROM proc_recupera;');
        const fecha = consecutivo.Consecutivo;
        console.log(consecutivo.Consecutivo)
        await DB.query(`UPDATE ?? SET fechaRecuperación=? WHERE idProc_Recupera = ?;`, ['proc_recupera', new Date(), fecha])
        await DB.query(`UPDATE ?? SET created_at=? WHERE idProc_Recupera = ?;`, ['proc_recupera', new Date(), fecha])

        res.json({ status: 'ok', response })
    } catch (error) {
        res.json({ status: 'error', error })
        console.log(error)
    }
})



module.exports = router;