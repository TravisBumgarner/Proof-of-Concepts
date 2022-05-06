import { jsonEvent, JSONEventType } from '@eventstore/db-client';

import { ColorMessage } from '../../../shared/types'

enum EEventName {
    TPaintEvent = "TPaintEvent",
    DummyEventForTesting = "DummyEventForTesting"
}

enum EStreamPrefix {
    Paint = "paint",
    NonExistantStream = "fake"
}

type TPaintEvent = JSONEventType<
    EEventName.TPaintEvent,
    {
        payload: ColorMessage
    }
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
    EStreamPrefix
}