const express = require('express');
const axios = require('axios');

const app = express();

const PORT = 3000;

app.get('/reporte', async (req, res) => {

    try {

        const javaResponse = await axios.get(
            'http://java-service:8080/estudiantes'
        );

        const pythonResponse = await axios.get(
            'http://172.20.0.4:5000/stats'
        );

        res.json({
            estudiantes: javaResponse.data,
            estadisticas: pythonResponse.data
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

app.get('/', (req, res) => {

    res.json({
        mensaje: 'Servicio Node funcionando'
    });

});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Node ejecutándose en puerto ${PORT}`);
});