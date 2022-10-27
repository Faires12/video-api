import { FileInterface } from "./file_interface";

export interface SaveFileObject{
    save(object: FileInterface, newFileName: string) : Promise<string>
}