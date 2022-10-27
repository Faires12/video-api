import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { adaptRoute } from './adapters/controller_adapter'
import makeRegisterController from './factories/controllers/register'
import makeLoginController from './factories/controllers/login'
import fileUpload from 'express-fileupload'
import path from 'path'
import { adaptMiddleware } from './adapters/middleware_adapter'
import makeAuthMiddleware from './factories/middlewares/auth'
import { makeUploadVideoController } from './factories/controllers/upload_video'

const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(express.static(path.resolve(__dirname + '/public')))

app.set("port", process.env.PORT || 3000)

app.post('/api/register', adaptRoute(makeRegisterController()))
app.post('/api/login', adaptRoute(makeLoginController()))
app.post('/api/video', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUploadVideoController()))

export default app