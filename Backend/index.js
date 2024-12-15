const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const empRoute= require("./routes/employeeRoute");
const adminRoute = require("./routes/adminRoute");
const taskRoutes = require("./routes/TaskRout");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB Connection
mongoose
  .connect(process.env.DBCONECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Routes
app.use("/employees", empRoute);
app.use("/adminuser", adminRoute);
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
