import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { SuccessInterceptor } from '../common/interceptors/success-interceptor.service';
import { CatsCreateDto } from './dto/cats.create.dto';
import { CatsLoginDto } from './dto/cats.login.dto';
import { Cat } from './cats.entity';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @Post()
  signUp(@Body() body: CatsCreateDto): Promise<Cat> {
    return this.catsService.signUp(body);
  }

  @Post('login')
  logIn(@Body() body: CatsLoginDto) {
    return this.catsService.login(body);
  }

  @Post('logout')
  logOut() {
    return 'logout';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
