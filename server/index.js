import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("DB connected"))
//   .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(requestLogger)
// app.use(unknownEndpoint)

//ROUTES
app.use("/api", (req,res) => (res.send("Hello World")));
app.use("/auth", authRoutes);
app.use("/user", userRoutes)

const PORT = process.env.PORT

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
mongoose
	.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
