import { Request, Response } from "express";
import { getUsers } from "../../services/jsonplaceholder";
import { In } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const userRepository = AppDataSource.getRepository(User);

export default async function getListUser(req: Request, res: Response) {
  const users = await getUsers();
  const usersInDb = await userRepository.find({
    where: { id: In(users.data.map((user) => user.id)) },
  });
  const usersNotInDb = users.data.filter(
    (user) => !usersInDb.map((v) => v.id).includes(user.id)
  );
  await userRepository.save(
    usersNotInDb.map((user) => {
      const _user = new User();
      _user.name = user.name;
      _user.email = user.email;
      return _user;
    })
  );
  res.json(users);
}
