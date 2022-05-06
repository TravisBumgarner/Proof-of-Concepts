import { allStreamsHandler } from "./eventstore"
import { createConnection } from 'typeorm';

import ormconfig from "./postgres/ormconfig";

const badExit = (e: unknown) => {
    console.error(e);
    process.exit(1);
};

const bootstrap = async () => {
    try {
        await createConnection(ormconfig).catch(badExit);
        allStreamsHandler()
    } catch (e) {
        badExit(e);
    }
};

bootstrap()