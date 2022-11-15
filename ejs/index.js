const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;
const { Router } = express;
const routerProducts = Router();
const Contenedor = require('./desafio2');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use("/api/products", routerProducts);
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get('/', (req, res) => {
  res.render('pages/form');
});

app.post("/productos", async(req, res) => {
  const { body } = req;
  console.log(body);
  contenedor.save(body);
  const productos = await contenedor.getAll();
  console.log(productos)
  res.render('products', {products: productos, productsExist: true})
});

app.get('/productos', async(req, res) => {
  const contenedor = new Contenedor;
  const productos = await contenedor.getAll();
  if(productos != undefined){
    res.render('products', { products: productos, productsExist: true });
  }
  else{
    res.render('sinproductos');
  }
});
const contenedor = new Contenedor();

