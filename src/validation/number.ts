import * as E from "fp-ts/Either";
export const validateNumber = E.fromPredicate(
  (str: string) => !isNaN(Number(str)),
  () => "InvalidNumber"
);
