const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./config/db");
const authRouter = require("./routes/auth");

const taskRouter = require("./routes/task");
const bookRouter = require("./routes/book");
const authenticate = require("./middleware/authMiddleware");

const app = express();
app.use(cors());

const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/tasks", authenticate, taskRouter);
app.use("/api/books", authenticate, bookRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));
