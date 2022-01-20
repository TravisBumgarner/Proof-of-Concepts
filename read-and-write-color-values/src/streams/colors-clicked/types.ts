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

export {
    ValidColors,
    ColorClickedEvent
}