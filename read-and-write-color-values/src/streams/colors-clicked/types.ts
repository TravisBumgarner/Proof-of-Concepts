import { JSONEventType } from '@eventstore/db-client';

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
    ColorsProjectionDBRow
}