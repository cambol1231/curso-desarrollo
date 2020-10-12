const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')


const Response = require('../reponse')

router

    .get('/Perfil', async(req, res) => {
    try {
        const sql = `SELECT p.idProc_Recupera, per.Correo,m.Descripcion, um.Descripcion, p.Cantidad
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




module.exports = router;