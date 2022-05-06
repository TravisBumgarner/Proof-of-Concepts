import { createConnection } from 'typeorm';
import { apolloServer, httpServer } from './express'

import ormconfig from "./postgres/ormconfig";

const badExit = (e: unknown) => {
    console.error(e);
    process.exit(1);
};

const bootstrap = async () => {
    try {
        await createConnection(ormconfig).catch(badExit);
        apolloServer.listen().then(({ url }) => {
            console.log(`🚀  Server ready at ${url}`);
        });
        httpServer.listen(5001, () => console.log("http server listening 5001"))
    } catch (e) {
        badExit(e);
    }
};

bootstrap()