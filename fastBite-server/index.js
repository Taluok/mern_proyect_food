const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 6001;
const mongoose = require('mongoose');

// Middleware
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-fastbite-cluster.1mpra.mongodb.net/demo-fastBite-client?retryWrites=true&w=majority&appName=demo-fastBite-cluster`,
        { useNewUrlParser: true, useUnifiedTopology: true } 
    )
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

// jwt authentication
app.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1h'
    });
    res.send({ token });
});

// Importar rutas
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);

app.get("/", (req, res) => {
    res.send("Hello FastBite Client Server!");
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
