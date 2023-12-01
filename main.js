class ProductManager {

    static ultId=0;

    constructor(){
        this.products= [];

    }
    
    addProduct(title, description, price, thumbnail, code, stock){
        
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

}

getProducts() {
    console.log(this.products);
}

getProductById(id){
    const product= this.products.find (item=> item.id === id);

    if(!product){
        console.log("Producto no encontrado");
    }else{
        console.log("Producto encontrado:" , product);
    }
    return product;

}

}



