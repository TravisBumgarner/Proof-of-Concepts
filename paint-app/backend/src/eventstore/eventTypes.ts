import { jsonEvent, JSONEventType } from '@eventstore/db-client';

import { PaintEvent } from '../../../shared/types'

enum EEventName {
    TPaintEvent = "TPaintEvent",
    DummyEventForTesting = "DummyEventForTesting"
}

type TPaintEvent = JSONEventType<
    EEventName.TPaintEvent,
    PaintEvent
>;

type DummyEventForTesting = JSONEventType<
    EEventName.DummyEventForTesting,
    {
        payload: 'hello'
    }
>;

type TEvent =
    | TPaintEvent
    | DummyEventForTesting

export default TEvent
export {
    TPaintEvent,
    EEventName,
}