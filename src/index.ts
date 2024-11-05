import { AppDataSource } from "./data-source";

import express, { Express } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRouter);

// const userRepository = AppDataSource.getRepository(User);

// app.get("/users", async (req: Request, res: Response) => {
// });

// app.post("/users", async (req: Request, res: Response) => {
//   const body = req.body;
//   const user = new User();
//   if (!body.name || !body.email) {
//     res.status(400).json({
//       code: EError.E01,
//       message: getErrorMessage(EError.E01),
//     });
//     return;
//   }
//   user.name = body.name;
//   user.email = body.email;
//   await userRepository.save(user);
//   res.json({
//     message: "User has been created",
//     data: user,
//   });
// });

// app.get("/users/:id", async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const user = await userRepository.findOne({ where: { id: parseInt(id) } });
//   if (!user) {
//     res.status(404).json({
//       code: EError.E02,
//       message: getErrorMessage(EError.E02),
//     });
//     return;
//   }
//   res.json(user);
// });

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
