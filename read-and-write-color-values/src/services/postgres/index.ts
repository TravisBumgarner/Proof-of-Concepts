import { createConnection, Connection } from "typeorm";

// import { ColorEntity } from '../../streams/colors-clicked/entities'


const createClient = async () => {
    const connection: Connection = await createConnection({
        type: "postgres",
        host: process.env.POSTGRES_HOSTNAME || 'localhost',
        port: parseInt(process.env.POSTGRES_PORTNAME || '5438'),
        username: process.env.POSTGRES_USERNAME || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DATABASE || 'postgres',
        // entities: [ColorEntity] // Can also link to an entity directory
    });

    return connection
}

export default createClient