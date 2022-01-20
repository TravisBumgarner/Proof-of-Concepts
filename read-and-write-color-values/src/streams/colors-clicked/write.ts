import { jsonEvent } from '@eventstore/db-client';
import { v4 as uuidv4 } from 'uuid'

import { client } from '../../eventstore'
import { ColorClickedEvent, ValidColors } from './types'
import { STREAM_NAME } from './consts'

function randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = (Object.values(anEnum) as unknown) as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

setInterval(async () => {
    const event = jsonEvent<ColorClickedEvent>({
        type: "ColorClickedEvent",
        data: {
            id: uuidv4(),
            timestamp: new Date(),
            color: randomEnum(ValidColors)
        },
    });
    console.log('New Event:', JSON.stringify(event.data))
    await client.appendToStream(STREAM_NAME, event);
}, 1000)