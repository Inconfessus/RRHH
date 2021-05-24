const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/login", async(req, res, next) => {
    const { email, pass } = req.body;
    const query = `SELECT * FROM admin WHERE email = '${email}' AND pass = '${pass}';`;
    const rows = await db.query(query);

    if (email && pass) {
        if (rows.length == 1) {
            const token = jwt.sign({
                admin_id: rows[0].admin_id,
                email: rows[0].email
            }, "debugkey");
            return res.status(200).json({ code: 200, message: token });
        } else {
            return res.status(200).json({ code: 400, message: "Usuario y/o contraseña incorrectos" });
        }
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

module.exports = user;