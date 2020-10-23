import { Frame } from "./Frame"

export interface ScoreSheet {
    readonly frames: ReadonlyArray<Frame>
    readonly bonusRollOne: string
    readonly bonusRollTwo: string
    readonly score: string
}