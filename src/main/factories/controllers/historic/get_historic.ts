import { GetHistoricService } from "../../../../application/services"
import { HistoricRepository } from "../../../../infrastructure/data/typeorm/repositories"
import { GetHistoricController } from "../../../../presentation/controllers"
import { Controller } from "../../../../presentation/interfaces/http"
import { ControllerFactory } from "../../controller_factory"

export class GetHistoricFactory extends ControllerFactory{  
    validations(): (Error | null)[] {
        return [
            this.validation.builder.setField("page").number().min(1).getError(),
            this.validation.builder.setField("rows").number().min(1).getError(),
        ]
    }
    controller(): Controller {
        const historicRepository = new HistoricRepository()
        const getHistoricService = new GetHistoricService(historicRepository)
        return new GetHistoricController(getHistoricService)
    }
}