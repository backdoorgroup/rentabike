import "reflect-metadata"
import "tsconfig-paths/register"
import "dotenv/config"

import path from "path"

import cors from "cors"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"

import { identity, authenticated } from "@/profile/middlewares"
import { dataSource } from "@/database"
import { logger } from "@/logger"
import { router } from "@/router"
import { settings } from "@/settings"

export const bootstrap = () => {
  const app = express()

  // Database
  dataSource.initialize()

  // Middlewares
  app.use("/static", express.static(path.join(__dirname, "/static")))
  app.use(
    morgan("tiny", {
      stream: {
        write: (message) => logger.http(message.trim())
      }
    })
  )
  app.use(express.json())
  app.use(cors())
  app.use(helmet())

  app.use(identity)
  app.use(authenticated)

  // Routing
  app.use("/api/v1/", router)

  // Server
  app.listen(settings.EXPRESS_PORT, settings.EXPRESS_HOST, () => {
    logger.info(`Server is running on http://${settings.EXPRESS_HOST}:${settings.EXPRESS_PORT}`)
  })
}

bootstrap()
