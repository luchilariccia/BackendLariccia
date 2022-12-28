const ProductManager = require("./managers/productManager");
const manager = new ProductManager();
const express = require ('express')
const app = express();
const products = require("./db/products.json")
const users = [];

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.listen(8080, () => {
    console.log("Server running")
})


//GET

app.get('/api/users', (req, res) =>{
    res.json({
        status: "Success!",
        data: users
    })
});

app.get('/api/users/:userName', (req, res) =>{
    const userFind = users.find (user => user.firstname === req.params.userName)
    if (!userFind) {
        res.status(404).json({
            status: "Error",
            data: "User not found"

        })
    }
    res.json({
        status: "Success!",
        data: userFind
    })
});


//DELETE

app.delete('/api/users/:userName', (req, res) => {
    const userIndex = users.findIndex (user => user.firstname === req.params.userName)
    if (userIndex < 0){
        return res.status(404).json({
            status: "Error",
            error: "User Not Found"
        });
    }
    users.splice(userIndex);
    console.log(users)
    res.json({
        status: "Success!",
        data: "User deleted correctly"
    })
})

//PUT

app.put('/api/users/:userId', (req, res) => {
    const newUser = req.body;
    if (!newUser.firstname || !newUser.lastname){
        return res.status(400).json({
            status: "Error",
            error: "Incomplete Values"
        });
    }
    const userIndex = users.findIndex (user => user.fisrtname === req.params.userName)
    if (userIndex < 0){
        return res.status(404).json({
            status: "Error",
            error: "User Not Found"
        });
    }

    users[userIndex] = newUser;
    console.log(users);
    res.json({
        status: "Success!",
        data: "User updates successfully"
    })
})

//POST

app.post('/api/users', (req, res) => {
    const user = req.body;
    console.log ("User => ", user);
    if (!user.firstname || !user.lastname){
        return res.status(400).json({
            status: "Error",
            error: "Incomplete Values"
        });
    }
    users.push(user);
    res.json({
        status: "Success!",
        data: user
    })
})

//GET

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
