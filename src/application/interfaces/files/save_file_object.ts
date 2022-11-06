import { FileInterface } from "../../../utils/file_interface";

export interface SaveFileObject{
    save(object: FileInterface, newFileName: string) : Promise<string>
}