import mongoose from "mongoose";
import environmentConfig from "./environment.config";

export class MongodbConnection {
    private db: any = null

    /**
     * connectDb
     */
    private async connectDb() {
        try {
            this.db = await mongoose.createConnection(environmentConfig.mongodbURL)
            console.log('>> DB Connected Successfully');
        } catch (error) {
            console.log('>> DB not connected');
            throw Error(error.message)
        }
    }

    public isConnected() {
        return this.db != null
    }
    public async getConnection() {
        if (!this.db) {
            await this.connectDb()
        }
        return this.db
    }
}