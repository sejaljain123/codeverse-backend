import express from "express";
import { execNode, execPython, execCpp } from "./utils/executor.js";
import cors from "cors";


const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/", (req, res) => {
  res.send("First server!!");
});
app.post("/execNode", async (req, res) => {
  const data = req.body.code;
  const input = req.body.input;
  // console.log(data);
  const output = await execNode(data, input || "");
  res.send(output);
});
app.post("/execPython", async (req, res) => {
  const data = req.body.code;
  const input = req.body.input;
  // console.log(data);
  const output = await execPython(data, input || "");
  console.log(output);

  res.send(output);
});

app.post("/execCpp", async (req, res) => {
  const data = req.body.code;
  const input = req.body.input;
  console.log(req.body);
  const output = await execCpp(data, input || "");
  console.log(output);
  res.send(output);
});
app.listen(PORT, () => {
  console.log("Server started!!");
});
