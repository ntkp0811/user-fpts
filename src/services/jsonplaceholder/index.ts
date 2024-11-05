import { pipe } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as A from "fp-ts/Array";
import axios from "axios";
import { IUser, IUserResp } from "./types";

export const getUsers = pipe(
  TE.tryCatch(
    () => axios.get<IUserResp[]>("https://jsonplaceholder.typicode.com/users"),
    (e) => e
  ),
  TE.map((response) =>
    pipe(
      response.data,
      A.map(
        (user: IUserResp) =>
          ({
            id: user.id,
            name: user.name,
            email: user.email,
          } as IUser)
      )
    )
  ),
  TE.fold(
    () =>
      T.of({
        error: true,
        data: [],
        message: "error",
      }),
    (users) =>
      T.of({
        error: false,
        data: users,
        message: undefined,
      })
  )
);
