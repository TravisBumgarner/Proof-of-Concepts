import { v4 as uuidv4 } from 'uuid'
// import { START, FORWARDS } from '@eventstore/db-client';
// import { client as eventstoreClient } from '../../services/eventstore'
import createConnection from '../../services/postgres';


// import { STREAM_NAME } from './consts'

setInterval(async () => {
    const connection = await createConnection()

    const data = {
        id: uuidv4(),
        color: 'red',
        timestamp: new Date()
    }
    await connection.query(`insert into color (id, color, timestamp) values ('${data.id}', '${data.color}', '${JSON.stringify(data.timestamp)}')`)
    await connection.close()
    // const events = await client.readStream(STREAM_NAME, {
    //     direction: FORWARDS,
    //     fromRevision: START
    // });

    // for await (const resolvedEvent of events) {
    //     console.log(resolvedEvent.event?.data);
    // }

}, 1000)