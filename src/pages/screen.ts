import { Landing } from "./Landing";
import { Homepage } from "./Homepage/Homepage";
import * as React from 'react'
import { Waiting } from "./Waiting";
import { CreateEntryScreen } from "./CreateEntry/CreateEntry";
const SCREENS = ["LANDING", "HOME", "WAIT", "CREATE_ENTRY"] as const
type EScreen = typeof SCREENS[number]

const SCREEN_NAME_TO_SCREEN_COMPONENT_MAP:Map<EScreen, React.FC<{}>> = new Map([
    ["LANDING", Landing],
    ["HOME", Homepage],
    ["WAIT", Waiting],
    ["CREATE_ENTRY", CreateEntryScreen]
])

export {SCREEN_NAME_TO_SCREEN_COMPONENT_MAP}
export type {EScreen}