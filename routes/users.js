const express = require('express');
const users = express.Router();
const db = require('../config/db'); 

//GET
users.get('/', async (req, res, next) => {
    const  user = await db.query("SELECT * FROM users");

    return res.status(200).json({code: 200, message: user});
});

users.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const user = await db.query("SELECT * FROM users WHERE user_id="+ id + ";");
    
    (user[0] == null) ?
    res.status(404).json({code: 404, message:"Usuario no encontrado."}) :
    res.status(200).json({code: 200, message: user});
});

users.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const user = await db.query("SELECT * FROM users WHERE user_fname='"+ name + "' OR user_lname='"+ name + "';");

    (user[0] == null) ? 
    res.status(200).json({code: 200, message: "Usuario no encontrado."}) : 
    res.status(404).json({code: 404, message: user});

});

//POST
users.post('/', async (req, res, next) => {
    const {user_fname, user_lname, user_phone, user_mail, user_address, user_password} = req.body;
    
    if(user_fname && user_lname && user_phone && user_mail && user_address && user_password){
    let query = "INSERT INTO users (user_fname, user_lname, user_phone, user_mail, user_address, user_password)";
    query += ` VALUES ('${user_fname}', '${user_lname}', '${user_phone}', '${user_mail}', '${user_address}', '${user_password}')`;
    
    const rows = await db.query(query);
    
    (rows.affectedRows == 1) ?
        res.status(201).json({code: 201, message: "Usuario insertado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
});

//PUT
users.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const {user_fname, user_lname, user_phone, user_mail, user_address, user_password} = req.body;
    
    if(user_fname && user_lname && user_phone && user_mail && user_address && user_password){
        let query = `UPDATE users SET user_fname='${user_fname}', user_lname='${user_lname}', user_phone='${user_phone}',`;
        query += ` user_mail='${user_mail}', user_address='${user_address}', user_password='${user_password}'`;
        query += ` WHERE user_id=${req.params.id};`;
    
    const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Usuario actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos."}); 
});

//PATCH
users.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    //Nombre
    if(req.body.user_fname){
        let query = `UPDATE users SET user_fname='${req.body.user_fname}' WHERE user_id=${req.params.id};`;
        const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Usuario actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    //Apellido
    if(req.body.user_lname){
        let query = `UPDATE users SET user_lname='${req.body.user_lname}' WHERE user_id=${req.params.id};`;
        const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Usuario actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    //Número telefónico
    if(req.body.user_phone){
        let query = `UPDATE users SET user_phone='${req.body.user_phone}' WHERE user_id=${req.params.id};`;
        const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Usuario actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    //Email
    if(req.body.user_mail){
        let query = `UPDATE users SET user_mail='${req.body.user_mail}' WHERE user_id=${req.params.id};`;
        const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Usuario actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    //Dirección
    if(req.body.user_address){
        let query = `UPDATE users SET user_address='${req.body.user_address}' WHERE user_id=${req.params.id};`;
        const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Usuario actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    //PW
    if(req.body.user_password){
        let query = `UPDATE users SET user_password='${req.body.user_password}' WHERE user_id=${req.params.id};`;
        const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Usuario actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }

    return res.status(500).json({code: 500, message: "Campo vacio o incompleto."});
});

//DELETE
users.delete('/:id([0-9]{1,3})', async (req, res, next) => {
    const query = `DELETE FROM users WHERE user_id =${req.params.id}`;

    const rows = await db.query(query);

    (rows.affectedRows == 1) ? 
    res.status(200).json({code: 200, message: "Usuario borrado correctamente."}) :
    res.status(404).json({code: 404, message: "Usuario no encontrado."});

});

module.exports = users;