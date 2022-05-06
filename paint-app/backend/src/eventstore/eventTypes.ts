import { jsonEvent, JSONEventType } from '@eventstore/db-client';

import { ColorMessage } from '../../../shared/types'

enum EventName {
    PaintEvent = "PaintEvent",
    DummyEventForTesting = "DummyEventForTesting"
}

type PaintEvent = JSONEventType<
    EventName.PaintEvent,
    {
        payload: ColorMessage
    }
>;

type DummyEventForTesting = JSONEventType<
    EventName.DummyEventForTesting,
    {
        payload: 'hello'
    }
>;

type Event =
    | PaintEvent
    | DummyEventForTesting




export default Event
export {
    PaintEvent,
    EventName
}