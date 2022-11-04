import { Request, Response } from 'express'
import { Controller, HttpRequest } from '../../presentation/interfaces/http'

export const adaptRoute = (controller : Controller) => {
    return async (req: Request, res : Response) => {
        const httpRequest : HttpRequest = {
            body: req.body,
            files: req.files,
            query: req.query,
            params: req.params
        }

        const httpResponse = await controller.handle(httpRequest)
        return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}