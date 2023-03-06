import { Historic } from "../../../domain/entities";
import { HistoricRepositoryInterface } from "../../../domain/repositories";
import { GetHistoric, GetHistoricInterface } from "../../../domain/usecases";

export class GetHistoricService implements GetHistoric{
    constructor(private readonly historicRepository: HistoricRepositoryInterface){}

    async get(infos: GetHistoricInterface): Promise<Historic[]> {
        return await this.historicRepository.get({
            userId: infos.userId,
            page: infos.page,
            rows: infos.rows
        })
    }
}