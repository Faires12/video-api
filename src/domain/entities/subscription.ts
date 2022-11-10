import { AbstractEntity } from "./abstract_entity"

export interface Subscription extends AbstractEntity{
    subscriber: number
    subscriptedTo: number
    notify?: boolean
}