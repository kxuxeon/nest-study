import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatsRepository extends Repository<Cat> {
  constructor(
    @InjectRepository(CatsRepository)
    private readonly repository: Repository<Cat>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
