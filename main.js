const fs =require("fs").promises;

class ProductManager {

    static ultId=0;

    constructor(path){
        this.products= [];
        this.path = path;

    }
    
     async addProduct (nuevoObjeto){

        let {title, description, price, thumbnail, code, stock} = nuevoObjeto;
        
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log (" Todos los campos son Obligatorios");
            return; 
        }

        if (this.products.some ( item =>item.code === code)){
            console.log("El codigo debe ser unico");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct);

        await this.guardarArchivo(this.products);


    }


    getProducts() {
        console.log(this.products);
    }


    async getProductById(id){
        try{ 
            const arrayProductos= await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

        if(!buscado){
            console.log("Producto no encontrado");
        }else{
            console.log("Producto encontrado");
            return buscado;
        }

    }catch (error){
        console.log ("Error al leer el archivo", error);
    }

}
    

    async leerArchivo(){ 

        try{
            const respuesta= await fs.readFile(this.path, "utf-8");
            const arrayProductos= JSON.parse(respuesta);
            return arrayProductos;
        
        } catch (error){
            console.log('Error al leer un Archivo', error);
        }

    }

    async guardarArchivo(arrayProductos){

        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null,2));
        } catch (eror){
            console.log("Error al Guardar el Archivo", error);
        }

    }

    async updateProduct(id, productoActualizado){
        try{
            const arrayProductos = await this.leerArchivo();
            const index = arrayProductos.findIndex(item=> item.id ===id);

            if (index !== -1) {

                arrayProductos.splice(index,1, productoActualizado);
                await this.guardarArchivo(arrayProductos);
            }else {
                console.log("No se encontro el producto");
            }

    
        }catch (error){
            console.log ("Error al Actualizar el Producto", error);
        }
    }

    async deleteProduct(id){
        try{
            const arrayProductos = await this.leerArchivo();
            const newArray = arrayProductos.filter(item => item.id !==id);
            await this.guardarArchivo(newArray);

        }catch (error){
            console.log ("Error al borrar el Producto", error)
        }
    }



}



//Testing 

const manager = new ProductManager("./productos.json");

manager.getProducts();

const reloj ={
    title: "Tommy Hilfiger",
    description: "Reloj Analogico Silver",
    price: 800,
    thumbnail:"sin imagen",
    code: "abc123",
    stock: 10

}

manager.addProduct(reloj);

const cadena={
    title:"Cadena Oro",
    description:"Cadena Oro 18k",
    price: 700,
    thumbnail:"sin imagen",
    code:"abc124",
    stock: 20
}

manager.addProduct(cadena);



const gafas = {
  title: "Aviator RayBan",
  description: "Modelo Aviator P RayBan",
  price: 400,
  thumbnail: 'sin imagen',
  code: 'abc125',
  stock: 30
}

manager.addProduct(gafas);

manager.getProducts();

async function testeamosBusquedaPorId(){
    const buscado=await manager.getProductById(2);
    console.log(buscado);
}

testeamosBusquedaPorId();

const pulsera ={
    id:1,
    title: "Pulsera",
    description:"Pulsera oro 18k",
    price: 400,
    thumbnail:"sin imagen",
    code: "abc123",
    stock: 10
};

/*
async function testeamosActualizar(){
    await manager.updateProduct(1,pulsera);
}

testeamosActualizar();
*/


async function testeamosBorrar(){
    await manager.deleteProduct(2);
}
testeamosBorrar();












