const ProductManager = require("./managers/productManager");
const manager = new ProductManager();
const express = require ('express')
const app = express();
const products = require("./db/products.json")

app.listen(8080, () => {
    console.log("Server running")
})

app.get ('/products', (req, res) => {
    console.log(req.query);
    if(req.query.limit){
        const filterProductsByLimit = products.filter(product => product.id-1 < req.query.limit)
        return res.send(filterProductsByLimit);
    } else if (req.query.id){
        const filterProductsById = products.filter(product => product.id === +req.query.id)
        return res.send(filterProductsById);
    } else {
        res.status(404).send("Ta shoto esto shango")
    }
})


app.get('/products/:productId', (req,res) => {
    console.log(req.params);
    const productId = req.params.productId;
    const product = products.find(product => product.id === +productId)
    if(!product) {
        return res.status(404).send("Product not found")
    } 
    res.send(product);
})
// const productManager = async () => {
//     try {
//         console.log("Primera Consulta")
//         let products = await manager.getProducts();
//         console.log(products); 

//         console.log("Creando Producto 1")
//         const newProduct1 = {
//             "title": "Ferrari 458 Italia" , 
//             "description": "Elegancia y adrenalina" ,
//             "price": 190700 ,
//             "thumbnail": "imagen",
//             "stock": 6,
//             "code": 140 
//         };
//         const product1Result = await manager.createProduct(newProduct1);
//         console.log(product1Result)

//         console.log("Segunda Consulta")
//         products = await manager.getProducts();
//         console.log(products); 


//     }
//     catch(error) {
//         console.log(error);
//     }
// }

// productManager ();
