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
import { makeCreateVideoCommentController } from './factories/controllers/create_video_comment'
import { makeCreateResponseCommentController } from './factories/controllers/create_response_comment'
import { makeAddVideoEvaluationController } from './factories/controllers/add_video_evaluation'
import { makeAddCommentEvaluationController } from './factories/controllers/add_comment_evaluation'
import { makeGetVideoCommentsController } from './factories/controllers/get_video_comments'
import { makeGetVideoController } from './factories/controllers/get_video'

const app = express()

app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use(express.static(path.resolve(__dirname + '/public')))

app.set("port", process.env.PORT || 3000)

app.post('/api/register', adaptRoute(makeRegisterController()))
app.post('/api/login', adaptRoute(makeLoginController()))
app.get('/api/video/:id', adaptRoute(makeGetVideoController()))
app.post('/api/video', adaptMiddleware(makeAuthMiddleware(false)), adaptRoute(makeUploadVideoController()))
app.get('/api/comment/video/:videoId', adaptRoute(makeGetVideoCommentsController()))
app.post('/api/comment/video', adaptMiddleware(makeAuthMiddleware(false)), adaptRoute(makeCreateVideoCommentController()))
app.post('/api/comment/response', adaptMiddleware(makeAuthMiddleware(false)), adaptRoute(makeCreateResponseCommentController()))
app.post('/api/evaluation/video', adaptMiddleware(makeAuthMiddleware(false)), adaptRoute(makeAddVideoEvaluationController()))
app.post('/api/evaluation/comment', adaptMiddleware(makeAuthMiddleware(false)), adaptRoute(makeAddCommentEvaluationController()))

export default app