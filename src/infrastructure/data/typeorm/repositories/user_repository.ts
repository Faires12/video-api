import { Like, Not } from "typeorm";
import { User } from "../../../../domain/entities";
import {
  ChangeSubsCountInterface,
  CreateUserInterface,
  EditUserRepositoryInterface,
  SearchUsersRepositoryInterface,
  UserRepositoryInterface,
} from "../../../../domain/repositories";
import { UserEntity } from "../entities";

export class UserRepository implements UserRepositoryInterface {
  async search(infos: SearchUsersRepositoryInterface): Promise<User[]> {
    const users = await UserEntity.find({
      where: [
        {
          id: Not(infos.userId),
          active: true,
          email: Like(`%${infos.search}%`) 
        },
        {
          id: Not(infos.userId),
          active: true,
          name: Like(`%${infos.search}%`)
        },
      ],
      skip: (infos.page - 1) * infos.rows,
      take: infos.rows
    })

    return users.map(user => {
      return {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        subsCount: user.subsCount
      }
    })
  }
  async delete(id: number): Promise<void> {
    const user = await UserEntity.findOneBy({id})
    if(user){
      user.active = false
      await user.save()
    }
  }
  async edit(infos: EditUserRepositoryInterface): Promise<User> {
    const user = await UserEntity.findOneBy({id: infos.id})
    if(!user)
      throw new Error('User not found')
    if(infos.name)
      user.name = infos.name
    if(infos.avatar)
      user.avatar = infos.avatar
    await user.save()
    return {
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
      avatar: user.avatar,
      subsCount: user.subsCount,
    };
  }
  async changeSubsCount(infos: ChangeSubsCountInterface): Promise<void> {
    const user = await UserEntity.findOneBy({ id: infos.id, active: true });
    if (user) {
      if (infos.isPositive) user.subsCount++;
      else user.subsCount--;
      await user.save();
    }
  }
  async create(user: CreateUserInterface): Promise<User> {
    const userEntity = new UserEntity();
    if (user.email && user.name && user.password) {
      userEntity.email = user.email;
      userEntity.name = user.name;
      userEntity.password = user.password;
    }
    if (user.avatar) userEntity.avatar = user.avatar;
    await userEntity.save();
    return {
      id: userEntity.id,
      name: userEntity.name,
      isAdmin: userEntity.isAdmin,
      email: userEntity.email,
      avatar: userEntity.avatar,
      password: userEntity.password,
    };
  }
  async getById(id: number): Promise<User | null> {
    const user = await UserEntity.findOneBy({ id, active: true });
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
      avatar: user.avatar,
      password: user.password,
      subsCount: user.subsCount,
    };
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await UserEntity.findOneBy({ email, active: true });
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
      avatar: user.avatar,
      password: user.password,
      subsCount: user.subsCount,
    };
  }
}
