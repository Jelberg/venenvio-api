import { ConfigModule, registerAs } from '@nestjs/config';

export interface AppConfig {
  venenvio: {
    url: string;
  }
  mongo:{
    uri: string
  },
  mailer:{
    host: string
    user: string
    password: string
    secure: string
  },
  aws:{
    s3: {
      key: string
      secret: string,
      bucket: string,
      secretName: string,
      region: string
    }
  },
  jwt:{
    secret: string
  }
}

const AppConfig = registerAs<AppConfig>('appConfig', () => {
  return {
    venenvio: {
      url: process.env.VENENVIO_WEB || 'http://localhost:8081/',
    },
    mongo:{
      uri: process.env.MONGODB_URI
    },
    mailer:{
      host: process.env.MAILER_HOST,
      user: process.env.MAILER_USER,
      password: process.env.MAILER_PASSWORD,
      secure: process.env.MAILER_SECURE 
    },
    aws:{
      s3: {
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
        secretName: process.env.S3_SECRET_NAME,
        region: process.env.S3_REGION
      }
    },
    jwt:{
      secret: process.env.JWT_SECRET
    }
  }
});

export const AppConfigModule = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
  load: [AppConfig]
});
