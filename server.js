const express = require('express');
const app = express();
const path = require('path');


require('./config');
app.use(express.static(__dirname + '/dist/covid-map'));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname + '/dist/covid-map/index.html'))

});

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
})