import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsCreateDto } from './dto/cats.create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './cats.entity';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';
import { CatsLoginDto } from './dto/cats.login.dto';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepository: CatsRepository) {}

  async signUp(body: CatsCreateDto) {
    const { email, name, password } = body;
    const [isCatExist] = await Promise.all([
      this.catRepository.exist({ where: { email } }),
    ]);

    if (isCatExist) {
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다.');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);
    return await this.catRepository.save({
      email,
      name,
      password: hashedPassword,
    });
  }

  async login(body: CatsLoginDto) {
    const { email, password } = body;
    const cat: Cat = await this.catRepository.findOne({ where: { email } });
    return await cat.comparePassword(password);
  }
}
