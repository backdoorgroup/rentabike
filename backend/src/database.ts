import { DataSource } from "typeorm"

import { settings } from "@/settings"

export const dataSource = new DataSource({
  type: "postgres",

  host: settings.DB_HOST,
  port: settings.DB_PORT,
  database: settings.DB_NAME,
  username: settings.DB_USER,
  password: settings.DB_PASSWORD,

  entities: ["./**/models.ts"],
  synchronize: settings.EXPRESS_MODE === "dev"
})
