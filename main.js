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


const manager = new ProductManager();
manager.getProducts();

manager.addProduct("producto prueba","este es un producto prueba", 200,"sin imagen","abc123",25);
manager.addProduct("Reloj Tommy Hilfiger", "Reloj analogico", 1200, "sin imagen", "abc124", 50);
manager.addProduct("Cadena Oro", "Cadena de Oro 18 k", 1400, "sin imagen", "abc125", 50);

manager.getProducts();

manager.addProduct('Cadena Oro','Cadena de Oro 18 k',1400,'sin imagen','abc125',50);

manager.getProductById(2);
manager.getProductById(50);
