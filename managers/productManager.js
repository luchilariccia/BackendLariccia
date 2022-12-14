const fs = require("fs/promises");
const { existsSync } = require("fs");

class ProductManager {
    constructor (path) {
        this.path = path;
    }

    async readFile() {
        return await fs.readFile(this.path, "utf-8")
    }

    async writeFile(string) {
        return await fs.writeFile(this.path, string, "utf-8")
    }

    async getProducts() {
        try {
            if(existsSync(this.path)) {
                const productsString = await this.readFile();
                const products = await JSON.parse(productsString);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getProductsById(id) {

        try {
            const products = await getProducts()
            const foundProduct = products.find (elem => elem.id===id);

            if(!foundProduct) {
                throw new Error ("That product does not exist.");
            }

            return foundProduct;

        } catch (error) {
            console.log(error.message)
        }
    }

    async updateProduct (id, newProperties) {
        const products = await this.getProducts();
        const foundProduct = await this.getProductsById(id);

        const productUpdated = {...foundProduct, ...newProperties}

        const updatedList = products.map(elem => {
            if(elem.id === productUpdated.id) {
                return productUpdated
            } else {
                return elem;
            }
        })

        const stringList = await JSON.stringify(updatedList, null, "\t");

        await this.writeFile(stringList)
    }

    async createProduct (product) {
        try {
            const productsArray = await this.getProducts();
            const newProduct1 = {id: productsArray.length+1, ...product}
            productsArray.push(newProduct1);

            const productsString = JSON.stringify(productsArray, null, "\t")

            await this.writeFile(productsString)
            console.log("Product saved successfully")

        } catch (error) {
            console.log(error);
        }
    }




}

module.exports = ProductManager;