import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * @apiDefine UserEntity
 * @apiBody {String} name 姓名
 * @apiBody {Number} age 年龄
 */
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
