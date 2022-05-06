import { createConnection, getRepository } from 'typeorm'
import { SubscribeToAllOptions } from "@eventstore/db-client"

import {
    connectHandlerToAllStreamEvents
} from './eventstore/eventstore'
import ormconfig from './postgres/ormconfig'
import entity from './postgres'

BigInt.prototype["toJSON"] = function () {
    return this.toString();
};

const getOffsetForStream = async (stream: string): Promise<bigint | null> => {
    const postgresConnection = await createConnection(ormconfig)

    const result = await postgresConnection
        .getRepository(entity.ProjectionOffset)
        .createQueryBuilder('projection_offset')
        .select("MAX(projection_offset.offset)", 'offset')
        .groupBy('stream')
        .andWhere('projection_offset.stream = :stream', { stream })
        .getRawOne<{ offset: bigint }>()

    return result && result.offset
        ? result.offset
        : null
}

const allStreamsHandler = async () => {
    const offset = await getOffsetForStream('all')
    const options: SubscribeToAllOptions = offset
        ? {
            fromPosition: {
                commit: offset,
                prepare: offset
            }
        }
        : {
            fromPosition: 'start'
        }

    console.log(`Starting stream all at with options ${JSON.stringify(options)}`)

    connectHandlerToAllStreamEvents(options, event => {
        if (event.commitPosition) {
            console.log(`Stream: all ---  Offset: ${event.commitPosition} --- importantData: ${JSON.stringify(event.event?.data)}`)
            const projectionRepository = getRepository(entity.ProjectionOffset)

            const projectionOffset = new entity.ProjectionOffset
            projectionOffset.offset = event.commitPosition
            projectionOffset.stream = "all"
            projectionRepository.save(projectionOffset)
        } else {
            console.log(`Event does not have offset for stream all`)
        }
    })
}
allStreamsHandler()