import cron from 'node-cron';
import { exec } from 'child_process';
import dotenv from 'dotenv';
import logger from './utils/logger';
dotenv.config();

/**
 * @summary Ruta al script del crawler definido en .env
 * @type {string | undefined}
 */
const CRAWLER_SCRIPT: string | undefined = process.env.CRAWLER_SCRIPT;

/**
 * @summary Ruta al script de carga de datos definido en .env
 * @type {string | undefined}
 */
const LOAD_SCRIPT: string | undefined = process.env.LOAD_SCRIPT;

/**
 * @summary Ejecuta los scripts cada 10 minutos usando node-cron
 */
cron.schedule('*/10 * * * *', () =>
{
    /**
     * @summary Ejecuta el crawler si está configurado
     */
    if (CRAWLER_SCRIPT)
    {
        exec(CRAWLER_SCRIPT, (err: Error | null, stdout: string, stderr: string) =>
        {
            err
                ? logger.error(`Crawler error: ${stderr}`)
                : logger.info(`Crawler output: ${stdout}`);
        });
    }

    /**
     * @summary Ejecuta la carga de datos si está definida
     */
    if (LOAD_SCRIPT)
    {
        exec(LOAD_SCRIPT, (err: Error | null, stdout: string, stderr: string) =>
        {
            err
                ? logger.error(`Load error: ${stderr}`)
                : logger.info(`Load output: ${stdout}`);
        });
    }
});