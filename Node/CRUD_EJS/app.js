var express = require('express');
var app = express();
var sampleDataRouter = require('./routes/sample_data')
var path = require('path');
const porta = process.env.PORT || 3000
console.log(porta)


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//a ordem dos 'use' influencia em como a applicação roda.
app.use(express.urlencoded()) // cria um middleware nesta aplicação node; 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sample_data', sampleDataRouter)

app.listen(porta, () => { console.log('ouvindo porta: ' + porta) })