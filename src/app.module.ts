import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { S3Module } from './s3/s3.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AppConfigModule } from './config';
import { AppConfigService } from './config.service';
import { InvitationModule } from './modules/invitation/invitation.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule, 
    S3Module, 
    UserModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('appConfig.mongo.uri'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('appConfig.mailer.host'),
          port: configService.get('appConfig.mailer.port', 587),
          secure: configService.get('appConfig.mailer.secure') === 'true',
          auth: {
            user: configService.get('appConfig.mailer.user'),
            pass: configService.get('appConfig.mailer.password'),
          },
        },
        defaults: {
          from: '"Venenvio" <noreply@example.com>',
        },
        //preview: true, // config to display preview email
        template:{
          dir: join(process.cwd() , 'src/templates/emails'),
          adapter: new HandlebarsAdapter(/* helpers */ undefined, {
            inlineCssEnabled: true
          }),
          options: {
            strict: true,
        },
        }
      }),
      inject: [ConfigService],
    }),
    InvitationModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
