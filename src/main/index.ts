import * as dotenv from "dotenv";
dotenv.config({});
import app from './app'
import {AppDataSource} from '../infrastructure/data/typeorm/db'

async function main() {
    await AppDataSource.initialize()
    const port = process.env.PORT || 3000
    await app.listen(port)
    console.log("Server open in port " + port)
}

main()