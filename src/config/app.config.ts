interface ServiceOptions {
  port: number;
  host: string;
  filesize: number;
  adminUser: string;
  adminPassword: string;
  jwtSecretKey?: string;
}

export const appConfig: ServiceOptions = {
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  host: process.env.APP_HOST ? process.env.APP_HOST : '127.0.0.1',
  adminUser: process.env.ADMIN_USER,
  adminPassword: process.env.ADMIN_PASSWORD,
  filesize: +process.env.FILE_SIZE,
  jwtSecretKey: process.env.JWT_ACCESS_SECRET_KEY,
};
