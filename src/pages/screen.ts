import { Landing } from "./Landing";
import { Homepage } from "./Homepage/Homepage";
import * as React from 'react'
import { Waiting } from "./Waiting";
import { CreateEntryScreen } from "./CreateEntry/CreateEntry";
import { ViewEntryScreen } from "./CreateEntry/ViewEntry";
const SCREENS = ["LANDING", "HOME", "WAIT", "CREATE_ENTRY", "VIEW_ENTRY"] as const
type EScreen = typeof SCREENS[number]

const SCREEN_NAME_TO_SCREEN_COMPONENT_MAP:Map<EScreen, React.FC<{}>> = new Map([
    ["LANDING", Landing],
    ["HOME", Homepage],
    ["WAIT", Waiting],
    ["CREATE_ENTRY", CreateEntryScreen],
    ["VIEW_ENTRY", ViewEntryScreen]
])

export {SCREEN_NAME_TO_SCREEN_COMPONENT_MAP}
export type {EScreen}