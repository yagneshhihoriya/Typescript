import express from 'express';
import cors from 'cors';
import routes from '../src/api/routes/index.route';
import environmentConfig from './config/environment.config';
import { MongodbConnection } from '../src/config/db';
const app = express();

/**
 * start server
 */
const startServer = async () => {
    // configure CORS
    app.use(cors(environmentConfig.corsConfig));
    // Body parsing
    app.use(express.json({ limit: '50mb' }))
    app.use(express.urlencoded({ limit: '50mb', extended: true }))
    // api routes
    app.use('/', routes);
    // error handlers

    let con = new MongodbConnection()
    await con.getConnection()
    // run server
    app.listen(environmentConfig.port, () => {
        console.log(`
        =================================================================
    
         Server started on port ${environmentConfig.port} | ${environmentConfig.env}
    
        =================================================================
        `);
    }).on('error', (error: any) => {
        console.log('Unable start server : ', error);
    });
};

startServer();

