const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/authRoutes"); 
const cartRouter = require("./routes/cartRoutes");
const fruitRouter = require("./routes/fruitsRoutes");
const connection = require("./db/connect");
const createUsersTable = require("./models/userSchema");
const createFruitsTable = require("./models/fruitsSchema");
const createCartTable = require("./models/cartSchema");
//const createTables = require("./models/cartSchema");
require("dotenv").config();

const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/fruits", fruitRouter);

// Serve frontend.html at the root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/frontend.html');
});

// Ensure tables are created in order before starting the server
createUsersTable((err1) => {
    if (err1) return;
    createFruitsTable((err2) => {
        if (err2) return;
        createCartTable((err3) => {
            if (err3) return;
            app.listen(process.env.PORT, () => {
                console.log(`Server running on port http://localhost:${process.env.PORT}`);
            });
        });
    });
});