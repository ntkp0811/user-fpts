import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { validateNumber } from "../../validation/number";
import { flow, pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import { BadRequest } from "../../utils/error";
import { emptyString, validateEmail } from "../../validation/string";

const userRepository = AppDataSource.getRepository(User);

export default async function createUser(req: Request, res: Response) {
  pipe(
    pipe(req.body.email, emptyString, E.chain(validateEmail)),
    // pipe(req.body.name, emptyString), -> TODO: Implement later
    E.fold(
      (e) => {
        BadRequest(res, "Invalid input");
      },
      () => {
        const user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        userRepository.save(user);
        res.json({ message: "success", data: user });
      }
    )

    // Check empty
    // req.body.email,
    // E.fromPredicate(
    //   (str) => str.trim().length > 0,
    //   () => "EmptyEmail"
    // ),
    // flow(validateEmail)(req.body.email),

    // Email
    // req.body.email
    // req.body,

    // validateNumber,
    // E.fold(
    //   () => {
    //     BadRequest(res, "Not a valid number");
    //   },
    //   async (id) => {
    //     const user = await userRepository.findOneBy({ id: parseInt(id) });
    //     if (user) {
    //       res.json(user);
    //     } else {
    //       BadRequest(res, "Invalid id user");
    //     }
    //   }
    // )
  );
}
