import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globalErrorHandler from './middleware/globalErrorHandler'
import httpError from './util/httpError'
import responseMessage from './constant/responseMessage'

const app: Application = express()

// middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

// router
app.use('/api/v1', router)

// 404 handler
app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessage.NOT_FOUND('route'))
  } catch (error) {
    httpError(next, error, req, 404)
  }
})

// Glonal error handler
app.use(globalErrorHandler)

export default app

