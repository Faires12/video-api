import {v4} from 'uuid'
import { UuidGenerator } from '../../application/interfaces'

export class UuidAdapter implements UuidGenerator{
    generate(): string {
        return v4()
    }
    
}