const express = require("express");
const app = express();
const ejs = require("ejs");

const PORT = process.env.PORT || 5001;

const products = require("./data/data");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Jika ada file internal yang diinclude
app.use(express.static("views"));

// Membaca file .ejs
app.set("view engine", "ejs");

//Page Home
app.get("/", (req, res) => {
    res.render("pages/home");
});

//Get All data
app.get("/products", (req, res) => {
    res.send({ message: "All data Products", data: products });
});

// ///Get Data by Product Type
// app.get("/products/search/:type", (req, res) => {
//     const { type, name } = req.params;

//     const searchByType = products.filter(
//         (product) => product.type.toLowerCase() === type.toLowerCase()
//     );

//     res.send({
//         message: `All data product by Type: ${type}`,
//         data: searchByType,
//     });
// });

//Get Data by Product Name
app.get("/products/search/:name", (req, res) => {
    const { name } = req.params;

    const searchByName = products.filter(
        (product) => product.name.toLowerCase() === name.toLowerCase()
    );

    res.send({
        message: `All data product by Name: ${name}`,
        data: searchByName,
    });
});

app.post("/products", (req, res) => {
    const { id, name, type, price, sizes } = req.body;
    const Data = {
        id,
        name,
        type,
        price,
        sizes: sizes.split(","),
    };

    products.push(Data);

    res.send({
        message: "Add data success",
        data: products,
    });
});

app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, type, price, sizes } = req.body;

    const productsID = products.findIndex(
        (product) => product.id === parseInt(id)
    );
    const newData = {
        id: parseInt(id),
        name,
        type,
        price,
        sizes: sizes.split(","),
    };

    products.splice(productsID, 1, newData);

    res.send({
        message: "Update data success",
        data: products,
    });
});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    const productsID = products.findIndex(
        (product) => product.id === parseInt(id)
    );

    products.splice(productsID, 1);

    res.send({
        message: "Delete data success",
        data: products,
    });
});

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
