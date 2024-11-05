import * as E from "fp-ts/Either";
export const validateEmail = E.fromPredicate(
  (str: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str),
  (invalidEmail) =>
    invalidEmail.includes("@") ? "MalformedEmail" : "InvalidEmail"
);

export const emptyString = E.fromPredicate(
  (str: string) => str.trim().length > 0,
  () => "EmptyString"
);
