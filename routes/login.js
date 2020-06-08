const express = require('express');
const jwt = require('jsonwebtoken');
const login = express.Router();
const db = require('../config/db'); 

// user.post('/signin', async (req,res,next) => {
//     const {user_fname, user_lname, user_phone, user_mail, user_address, user_password} = req.body
    
//     if(user_name && user_mail && user_password){
//     let query = "INSERT INTO user (user_fname, user_lname, user_phone, user_mail, user_address, user_password) ";
//     query += `VALUES ('${user_fname}', '${user_lname}', '${user_phone}', '${user_mail}', '${user_address}', '${user_password}');`;

//     const rows = await db.query(query);

//     (rows.affectedRows == 1) ?
//     res.status(201).json({code: 201, message: "Usuario registrado correctamente."}) :
//     res.status(500).json({code: 500, message: "No se ha podido registrar el usuario."})
//     }
//     return res.status(500).json({code: 500, message: "Ocurrió un error."});
// });

login.post("/login", async (req,res,next) => {
    const {user_mail, user_password} = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query);

    if(user_mail && user_password){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code: 200, message: token})
        }
        else{
            return res.status(200).json({code: 401, message: "Usuario y/o contraseña incorrectos."})
        }
        
    };
    return res.status(500).json({code: 500, message: "Campos incompletos."});
    
});

module.exports = login;