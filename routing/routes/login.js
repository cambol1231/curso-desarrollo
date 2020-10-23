const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const DB = require('../../db/db')
const jwt = require('../../jwt/jwt')


const Response = require('../reponse')

router

    .post('/login', async(req, res) => {
    const error = { error: 'Datos de acceso incorrectos' };
    console.log(req.body)
    try {
        const data = req.body;
        // const errors = data;
        /*   if (errors) {
               Response.error(res, errors);
           } else {*/
        //   console.log("2");
        const { username, password } = data;
        const sql = `SELECT  u.id,  u.correo, u.idContraseña , p.idRol as rol  
        FROM usuario u 
        inner join contraseñas c on c.id = u.idContraseña 
        inner join permisos p on p.idUsuario = u.id
        where correo = ?`;
        const [user] = await DB.query(sql, username);
        if (!user) {
            console.log("3");
            Response.error(res, error, 404);
        } else {
            const validatePassword = `SELECT  u.id,  u.correo, u.idContraseña  
            FROM greenreportbdpruebas.usuario u inner join greenreportbdpruebas.contraseñas c on c.id = u.idContraseña 
            where  u.idContraseña  = ?`;
            const [user2] = await DB.query(validatePassword, password);
            console.log(!user2);
            if (!user2) {
                Response.error(res, error, 404);
            } else {
                await DB.query(
                    `UPDATE ?? SET last_login=? WHERE id=?;`, ['usuario', new Date(), user.id]
                )
                delete user['access'];
                Response.succes(res, user);
            }
        }
        //}
    } catch (error) {
        Response.error(res, error)
    }
})

module.exports = router;