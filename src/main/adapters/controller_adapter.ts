import { Request, Response } from 'express'
import { HttpRequest } from '../../presentation/interfaces/http'
import { ControllerFactory } from '../factories/controller_factory'

export const adaptRoute = (factory : ControllerFactory) => {
    return async (req: Request, res : Response) => {
        const httpRequest : HttpRequest = {
            body: req.body,
            files: req.files,
            query: req.query,
            params: req.params
        }

        const controller = factory.make()
        const httpResponse = await controller.handle(httpRequest)
        return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}