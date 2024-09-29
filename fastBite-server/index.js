const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 6001;

require('dotenv').config(); // Cargar las variables de entorno
console.log(process.env.DB_USER); // Verificación si DB_USER se carga correctamente

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Config
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-fastbite-cluster.1mpra.mongodb.net/?retryWrites=true&w=majority&appName=demo-fastBite-cluster`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Conectar al cliente MongoDB
        await client.connect();

        //Database & collections
        const menuCollections = client.db("demo-fastBite-client").collection("menus");
        const cartCollections = client.db("demo-fastBite-client").collection("cartItems")

        //all menu items operations
        app.get('/menu', async(req, res) => {
            const result = await menuCollections.find().toArray()
            res.send(result)
        })

        //all carts operations 
        app.post('/carts', async(req, res) => {
            const cartItems = req.body;
            const result = await cartCollections.insertOne(cartItems)
            res.send(result)
        })

        //get carts using email
        app.get('carts', async(req, res) => {
            const email = req.query.email;
            const filter = {email: email};
            const result = await cartCollections.find(filter).toArray();
            res.send(result)
        })

        //get specific cats 
        app.get('/carts/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const result = await cartCollections.findOne(filter);
            res.send(result)
        })

        //delete items from cart
        app.delete('/carts/:id', async(req,res) => {
            const id =  req.params.id;
            const filter = {_id: new ObjectId(id)};
            const result = await cartCollections.deleteOne(filter);
            res.send(result)
        })

        //update cats quantity
        app.put("/cats/:id", async(req, res) => {
            const id = req.params.id;
            const {quantity} = req.body
            const filter = {_id: new ObjectId(id)};
            const options = { upsert: true };

            const updateDoc = {
                $set: {
                    quantity: parseInt(quantity, 10)
                }
            }
            const result = await cartCollections.updateOne(filter, updateDoc, options)
        })

        // Ping para confirmar una conexión exitosa
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        
    }
}
run().catch(console.dir);

// Ruta principal
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
