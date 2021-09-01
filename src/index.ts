import express, { Request, Response, Application, NextFunction } from "express";
const app: Application = express();
const PORT = process.env.PORT || 80;
import morgan from "morgan";

import UserRoutes from "./routes/user";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello Typescript with Node.js!");
});

app.use("/user", UserRoutes);

app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(400).send(err.message);
});

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});

export default app;
