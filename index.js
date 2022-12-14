const ProductManager = require("./managers/productManager");
const manager = new ProductManager("./db/products.json");

const productManager = async () => {
    try {
        console.log("Primera Consulta")
        let products = await manager.getProducts();
        console.log(products); 

        console.log("Creando Producto 1")
        const newProduct1 = {
            "title": "Ferrari 458 Italia" , 
            "description": "Elegancia y adrenalina" ,
            "price": 190700 ,
            "thumbnail": "imagen",
            "stock": 6,
            "code": 140 
        };
        const product1Result = await manager.createProduct(newProduct1);
        console.log(product1Result)

        console.log("Segunda Consulta")
        products = await manager.getProducts();
        console.log(products); 


    }
    catch(error) {
        console.log(error);
    }
}

productManager ();
