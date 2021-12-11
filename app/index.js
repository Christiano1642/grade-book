import express from "express";
import config from "./config.js";
import isAuth from "./middleware/isAuth.js";
import router from "./routes/index.js";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(isAuth);
app.use("/api", router);

app.listen(config.port, () => {
  console.log(`Server running: ${config.baseUrl}:${config.port}`);
});
