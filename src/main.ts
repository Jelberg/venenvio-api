import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IDataUserAuth } from './interfaces/IDataUserAuth';
import { ValidationPipe } from '@nestjs/common';

declare global {
    namespace Express {
    interface Request {
      dataUser?: IDataUserAuth;
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    stopAtFirstError: true, 
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true // Evita que se agreguen datos que no se encuentran dentro del DTO
  }));
  app.enableCors();
  await app.listen(5555);
}
bootstrap();
