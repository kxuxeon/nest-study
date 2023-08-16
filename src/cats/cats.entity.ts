import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseTimeEntity } from '../common/entity/base.time.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class Cat extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({
    nullable: false,
    select: false,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    nullable: true,
    select: false,
  })
  imgUrl: string;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
