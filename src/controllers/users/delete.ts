import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { validateNumber } from "../../validation/number";
import { pipe } from "fp-ts/lib/function";
import * as E from "fp-ts/Either";
import { BadRequest } from "../../utils/error";

const userRepository = AppDataSource.getRepository(User);

export default async function deleteUser(req: Request, res: Response) {
  // TODO: Implement later
  pipe(
    req.params.id,
    validateNumber,
    E.fold(
      () => {
        BadRequest(res, "Not a valid number");
      },
      async (id) => {
        const result = await userRepository.delete({ id: parseInt(id) });
        if (result) {
          res.json(result);
        } else {
          BadRequest(res, "Something went wrong");
        }
      }
    )
  );
}
