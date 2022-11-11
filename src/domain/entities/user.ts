import { AbstractEntity } from "./abstract_entity"

export interface User extends AbstractEntity{
    email?: string
    name?: string
    password?: string
    avatar?: string
    isAdmin?: boolean
    subsCount?: number
}