import { FileInterface } from "../../../utils/file_interface";

export interface SaveFileObject{
    save(object: FileInterface, newFileName: string) : Promise<string>
    saveBase64(base64: string, newFileName: string) : Promise<string>
}