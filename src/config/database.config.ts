interface DatabaseConfigOption {
  url: string;
}

export const databaseConfig: DatabaseConfigOption = {
  url: process.env.DATABASE_URL,
};
