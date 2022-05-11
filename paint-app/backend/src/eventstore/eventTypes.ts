import { jsonEvent, JSONEventType } from '@eventstore/db-client';

import { PaintEvent, Room } from '../../../shared/types'

enum EEventName {
    TPaintEvent = "TPaintEvent",
    NewRoomEvent = "NewRoomEvent"
}

type TPaintEvent = JSONEventType<
    EEventName.TPaintEvent,
    PaintEvent
>;

type NewRoomEvent = JSONEventType<
    EEventName.NewRoomEvent,
    Room
>;

type TEvent =
    | TPaintEvent
    | NewRoomEvent

export default TEvent
export {
    TPaintEvent,
    EEventName,
}