import { Landing } from "./Landing";
import * as React from 'react'
const SCREENS = ["LANDING"]
type EScreen = typeof SCREENS[number]

const SCREEN_NAME_TO_SCREEN_COMPONENT_MAP:Map<EScreen, React.FC<{}>> = new Map([
    ["LANDING", Landing]
])

export {SCREEN_NAME_TO_SCREEN_COMPONENT_MAP}
export type {EScreen}