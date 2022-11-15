const fs = require('fs');
class Contenedor{
    constructor(){
        this.file = "./productos.json"
    }
    getAll = async () =>{
        try{
            const ruta = await fs.promises.readFile(this.file, 'utf-8');
            const productos = JSON.parse(ruta);
            return productos;
        }
        catch(e){
            console.log(e)
        }
    } 
    save = async (producto) =>{
        try{
            let productos = await this.getAll();
            let id = productos.length === 0? 1 : productos[productos.length - 1].id + 1;
            productos = [...productos,{id, ...producto}];
            console.log('producto guardado'); 
            await fs.promises.writeFile(this.file, JSON.stringify(productos, null));
        }
        catch(e){
            console.log(e)
        }
    }
    getById =(id) =>{
        try{
            let productos = fs.readFileSync(this.file, 'utf-8');
            const result = JSON.parse(productos)
            const productoFiltrado = result.find(data => data.id === id);
            if(productoFiltrado == undefined){
                return 'el producto no se encuentra';
            }else{
                return productoFiltrado;
            }
        }
        catch(e){
            console.log(e)
        }
    }
    updateById = async (id, titulo, precio, thumbnail) =>{
        try{
            let productos = await this.getAll();
            const productExists = productos.find((data) => Number(data.id) === Number(id));
            const indice = productos.findIndex((data)=> Number(data.id) === Number(id));
            if(productExists != undefined){
                const productoNuevo = {id: id, titulo: titulo, precio: precio, thumbnail: thumbnail};
                productos[indice] = productoNuevo;
                fs.writeFileSync(
                    this.file, 
                    JSON.stringify(productos, null, 1)
                );
                return true;
            }
            else{
                return false;
            } 
        }
        catch(e){
            console.log(e)
        }
    }

    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const productoEncontrado = productos.find((data) => data.id == id);
            if (productoEncontrado == undefined || productoEncontrado.id !== id) return console.log("el id no existe");
            const productosFiltrados = productos.filter((data) => data.id != id);
            await fs.promises.writeFile(this.file, JSON.stringify(productosFiltrados));
            console.log("producto borrado");
        } catch (e) {
            console.log(e);
        }
    }
}
const contenedor = new Contenedor();
module.exports = Contenedor;





