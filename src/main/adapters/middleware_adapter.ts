import { NextFunction, Request, Response } from "express"
import { HttpRequest, Middleware } from "../../presentation/interfaces/http"


export const adaptMiddleware = (middleware : Middleware) => {
    return async (req: Request, res : Response, next : NextFunction) => {
        const httpRequest : HttpRequest = {
            headers: req.headers
        }

        const httpResponse = await middleware.handle(httpRequest)
        if(httpResponse.statusCode === 200){
            Object.assign(req.body, httpResponse.body)
            next()
        } else {
            res.status(httpResponse.statusCode).json(httpResponse.body)
        }
    }
}