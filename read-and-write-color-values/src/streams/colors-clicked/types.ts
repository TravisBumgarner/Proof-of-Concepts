import { JSONEventType } from '@eventstore/db-client';
import * as t from 'io-ts'

const colorCodec = t.type({
    id: t.string,
    timestamp: t.string, // You can get more exact with io-ts types than this.
    color: t.keyof({ // https://github.com/gcanti/io-ts/blob/master/index.md#union-of-string-literals
        RED: null,
        GREEN: null,
        BLUE: null
    })
})
type ColorCodec = t.TypeOf<typeof colorCodec>

enum ValidColors {
    RED = "RED",
    GREEN = "GREEN",
    BLUE = "BLUE"
}

type ColorClickedEvent = JSONEventType<
    "ColorClickedEvent",
    {
        timestamp: Date,
        color: ValidColors,
        id: string

    }
>;


type ColorsProjectionDBRow = {
    color: ValidColors,
    timestamp: Date,
    id: string
}

export {
    ValidColors,
    ColorClickedEvent,
    ColorsProjectionDBRow,
    colorCodec,
    ColorCodec
}