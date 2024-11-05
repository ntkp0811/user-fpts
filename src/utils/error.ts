import { Response } from "express";

export function BadRequest(res: Response, message?: string) {
  return res.status(400).send({ message });
}
