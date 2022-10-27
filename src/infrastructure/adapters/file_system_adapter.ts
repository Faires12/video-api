import { SaveFileObject } from "../../application/interfaces/SaveFileObject";
import fs from 'fs/promises'
import { FileInterface } from "../../application/interfaces/file_interface";

export class FileSystemAdapter implements SaveFileObject{
    constructor(private readonly publicPath: string) {}

    async save(object: FileInterface, newFileName: string): Promise<string> {
        const ext = object.name.split('.').pop()
        const name = newFileName + '.' + ext
        await fs.writeFile(this.publicPath + name, object.data)
        return name
    }
}