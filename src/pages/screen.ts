import { Landing } from "./Landing";
import { Homepage } from "./Homepage";
import * as React from 'react'
import { Waiting } from "./Waiting";
const SCREENS = ["LANDING", "HOME", "WAIT"] as const
type EScreen = typeof SCREENS[number]

const SCREEN_NAME_TO_SCREEN_COMPONENT_MAP:Map<EScreen, React.FC<{}>> = new Map([
    ["LANDING", Landing],
    ["HOME", Homepage],
    ["WAIT", Waiting]
])

export {SCREEN_NAME_TO_SCREEN_COMPONENT_MAP}
export type {EScreen}