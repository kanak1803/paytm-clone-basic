const express = require("express");
const connectDB = require("./config/db");
const rootRouter = require("./routes/index");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.send("heh;p");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
