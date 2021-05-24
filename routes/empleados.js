const express = require('express');
const empleados = express.Router();
const db = require('../config/database');

//Agregar empleados
empleados.post("/", async(req, res, next) => {
    const { name, last_name, phone, email, address } = req.body;

    if (name && last_name && phone && email && address) {
        let query = "INSERT INTO empleados (name, last_name, phone, email, address)"
        query += ` VALUES('${name}','${last_name}',${phone},'${email}','${address}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos" })
});

//Eliminar empleados
empleados.delete("/:id([0-9]{1,3})", async(req, res, next) => {
    const query = `DELETE FROM empleados WHERE user_id=${req.params.id}`

    const rows = await db.query(query)
    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente " });
    }

    return res.status(404).json({ code: 404, message: "Empleado no encontrado " });
});


//Actualizar datos de un empleado
empleados.put("/:id([0-9]{1,3})", async(req, res, next) => {
    const { name, last_name, phone, email, address } = req.body;

    if (name && last_name && phone && email && address) {
        let query = `UPDATE empleados SET name='${name}' , last_name= '${last_name}',`;
        query += `phone=${phone},email='${email}',address='${address}' WHERE user_id= ${req.params.id}`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrio un error" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos" })
});

//Consultar datos de empleado por nombre
empleados.get("/:name([A-Za-z '-]+)", async(req, res, next) => {
    const name = req.params.name;

    let query = `SELECT * FROM empleados WHERE CONCAT(name,last_name)='` + name + `'`
    const rows = await db.query(query);

    (rows.length) ?
    res.status(200).json({ code: 200, message: rows }):
        res.status(404).json({ code: 404, message: "Empleado no encontrado" });

});

module.exports = empleados;