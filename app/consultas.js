const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "123",
    database: "cursos",
    port: 5432,
});

async function nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const result = await pool.query(`insert into cursos (nombre, nivel, fecha, duracion) values ('${nombre}', '${nivelTecnico}', '${fechaInicio}', '${duracion}') RETURNING *`);
        console.log(`Curso ${nombre} creado con éxito`);
        return result.rows;
    } catch (e) {
        console.log('Error al ejecutar la consulta', e.message);
    }
}

async function getCursos() {
    try {
        const result = await pool.query(`select * from cursos order by id`);
        return result.rows;
    } catch (e) {
        console.log('Error al ejecutar la consulta', e.message);
    }
}

async function editCurso(id, nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const res = await pool.query(`UPDATE cursos SET nombre = '${nombre}', nivel='${nivelTecnico}', fecha='${fechaInicio}', duracion='${duracion}' WHERE id = '${id}' RETURNING *`);
        console.log(`Curso ${nombre} editado con éxito`);
        return res.rows;
    } catch (e) {
        console.log('Error al ejecutar la consulta', e.message);
    }
}

async function deleteCurso(id) {
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id ='${id}'`);
        console.log(`Curso con id ${id} eliminado con éxito`);
        return result.rowCount;
    } catch (e) {
        console.log('Error al ejecutar la instrucción: ' + error.code);
    }
}

module.exports = { nuevoCurso, getCursos, editCurso, deleteCurso }