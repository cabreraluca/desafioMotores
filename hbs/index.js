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
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);
app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  res.render("form", {title: "Agregar productos"});
});
app.get("/", (req, res)=>{
  res.render('bienvenido');
});
app.post("/form", (req, res) => {
  const { body } = req;
  console.log(body);
  contenedor.save(body);
  res.render('gracias');
});

app.get('/productos', async(req, res) => {
  const contenedor = new Contenedor;
  const productos = await contenedor.getAll();
  if(productos != undefined){
    res.render('productslist', { products: productos, productsExist: true });
  }
  else{
    res.render('sinproductos');
  }
});
const contenedor = new Contenedor();

