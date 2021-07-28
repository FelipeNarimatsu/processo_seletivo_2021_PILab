import express from 'express'
const app = express();

import indexrotas from './rotas/index'

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(indexrotas);

app.listen(3000);
console.log('server on port',3000);