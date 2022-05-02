const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { nuevoCurso, getCursos, editCurso, deleteCurso } = require("./app/consultas");

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

app.get("/", (_req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/curso", async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta);
});

app.get("/cursos", async (_req, res) => {
    const respuesta = await getCursos();
    res.send(respuesta);
});

app.put("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta);
});

app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const respuesta = await deleteCurso(id);
    respuesta > 0
        ? res.send(`El canal de id ${id} fue eliminado con éxito`)
        : res.send("No existe un canal registrado con ese id");
});

