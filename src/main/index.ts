import * as dotenv from "dotenv";
dotenv.config({});
import app from './app'
import {AppDataSource} from '../infrastructure/data/typeorm/db'

async function main() {
    await AppDataSource.initialize()
    await app.listen(app.get("port"))
    console.log("Server open in port " + app.get("port"))
}

main()