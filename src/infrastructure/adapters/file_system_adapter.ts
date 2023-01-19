import fs from 'fs/promises'
import { SaveFileObject } from '../../application/interfaces'
import { FileInterface } from '../../utils/file_interface'

export class FileSystemAdapter implements SaveFileObject{

    private base64Extension : { [k: string]: string } = {
        "data:image/jpeg;base64": "jpg",
        "data:image/png;base64": "png",
        "data:image/gif;base64": "gif",
        "data:application/pdf;base64": "pdf",
        "data:video/mp4;base64": "mp4"
    }

    constructor(private readonly publicPath: string) {}

    async save(object: FileInterface, newFileName: string): Promise<string> {
        const ext = object.name.split('.').pop()
        const name = newFileName + '.' + ext
        await fs.writeFile(this.publicPath + name, object.data)
        return name
    }

    async saveBase64(base64: string, newFileName: string): Promise<string> {
        const ext = this.base64Extension[base64.split(',')[0]]
        const name = `${newFileName}.${ext}`
        await fs.writeFile(this.publicPath + name, base64.split(',')[1], 'base64')
        return name
    }
}