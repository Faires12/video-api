import { FileInterface } from "../../../domain/entities";

export interface SaveFileObject{
    save(object: FileInterface, newFileName: string) : Promise<string>
}