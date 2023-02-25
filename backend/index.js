const express = require("express");
const connectDB = require("./config/db");

const app = express();

//DB Connection
connectDB();
app.use(express.json());

app.get("/", (req, res) => res.send("API Running"));

//ROUTES

app.use("/api/v1/events", require("./routes/events"));
app.use("/api/v1/tickets", require("./routes/tickets"));
app.use("/api/v1/users", require("./routes/users"));

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
