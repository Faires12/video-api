import { UuidGenerator } from "../../application/interfaces/UuidGenerator";
import {v4} from 'uuid'

export class UuidAdapter implements UuidGenerator{
    generate(): string {
        return v4()
    }
    
}