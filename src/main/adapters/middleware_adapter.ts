import { NextFunction, Request, Response } from "express"
import { HttpRequest, Middleware } from "../../presentation/interfaces/http"
import { MiddlewareFactory } from "../factories/middleware_factory"


export const adaptMiddleware = (factory: MiddlewareFactory) => {
    return async (req: Request, res : Response, next : NextFunction) => {
        const httpRequest : HttpRequest = {
            headers: req.headers
        }

        const middleware = factory.make()
        const httpResponse = await middleware.handle(httpRequest)
        if(httpResponse.statusCode === 200){
            Object.assign(req.body, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json(httpResponse.body)
        }
    }
}