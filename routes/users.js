const express = require('express');
const users = express.Router();
const db = require('../config/db'); 

//GET
users.get('/', async (req, res, next) => {
    const  user = await db.query("SELECT * FROM users");

    return res.status(200).json({code: 200, message: user});
});

users.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id-1;
    if (id >= 1 && id <= id.lenght) {
        const user = await db.query("SELECT * FROM users WHERE user_id="+ id +";");
        return res.status(200).json({code: 200, message: user});
    }
    else{
        return res.status(404).json({code: 404, message:"Usuario no encontrado."})
    }
});

users.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    console.log(req.params);
    const user = await db.query("SELECT * FROM users WHERE user_fname"+ name +";");

    (user.lenght > 0) ? 
    res.status(200).json({code: 200, message: user}) : 
    res.status(404).json({code: 1, message: "Usuario no encontrado"});

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
    const {pok_name, pok_height, pok_weight, pok_base_experience} = req.body;
    
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height=${pok_height},`;
        query += `pok_weight=${pok_height}, pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;
    
    const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Pokémon actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    } 
});

//PATCH
users.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    if(req.body.pok_name){
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id};`;
        const rows = await db.query(query);

    (rows.affectedRows == 1) ?
        res.status(200).json({code: 200, message: "Pokémon actualizado correctamente."}) :
        res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos imcompletos."});
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