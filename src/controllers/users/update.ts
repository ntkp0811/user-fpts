import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { validateNumber } from "../../validation/number";
import { flow, pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import { BadRequest } from "../../utils/error";
import { emptyString, validateEmail } from "../../validation/string";

const userRepository = AppDataSource.getRepository(User);

export default async function updateUser(req: Request, res: Response) {
  pipe(
    // TODO: Handle id is not a number
    // TODO: Name not empty
    pipe(req.body.email, emptyString, E.chain(validateEmail)),
    E.fold(
      (e) => {
        BadRequest(res, "Invalid input");
      },
      async (id) => {
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        if (user) {
          const newUser = await userRepository.update(
            { id: parseInt(id) },
            req.body
          );
          res.json(newUser);
        } else {
          BadRequest(res, "Invalid id user");
        }
      }
    )
  );
}
