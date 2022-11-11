const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;
const Contenedor = require('./desafio2')
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

app.post("/form", (req, res) => {
  const { body } = req;
  console.log(body);
  contenedor.save(body);
  res.send("Producto subido correctamente");
  res.render("pages/gracias", {title: "Producto correctamente agregado"});
});

app.get('/productos', async(req, res) => {
  const contenedor = new Contenedor;
  const productos = await contenedor.getAll();
  res.render('productslist', { products: productos, productsExist: true });
});
const contenedor = new Contenedor();

