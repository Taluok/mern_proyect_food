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
const { MongoClient, ServerApiVersion } = require('mongodb');
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
