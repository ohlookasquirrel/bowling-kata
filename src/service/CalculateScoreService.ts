import axios from 'axios'
import { Frame } from '../model/Frame'

export const calculateScore = async (frames: ReadonlyArray<Frame>, bonusRollOne: string, bonusRollTwo: string): Promise<string> => {
    const frameRolls: ReadonlyArray<number> = frames.reduce(framesToRolls, [])
    const bonusRolls: ReadonlyArray<number> = getBonusRolls(bonusRollOne, bonusRollTwo)
    const result = await axios.post(
        'http://localhost:8080/bowling/calculateScore',
        frameRolls.concat(bonusRolls)
      )
    return result.data
}

const getBonusRolls = (rollOne: string, rollTwo: string): ReadonlyArray<number> => {
    const arrOne = rollOne !== "-" ? [parseInt(rollOne, 10)] : []
    const arrTwo = rollTwo !== "-" ? [parseInt(rollTwo, 10)] : []
    return arrOne.concat(arrTwo)
}

const framesToRolls = (acc: ReadonlyArray<number>, frame: Frame): ReadonlyArray<number> => {
    const rollOneValue: number = frame.rollOne.toLowerCase() === "x" ? 10 : parseInt(frame.rollOne, 10)
    const rollTwoValue: number = frame.rollTwo === "/" ? 10 - rollOneValue : parseInt(frame.rollTwo, 10)
    return rollOneValue === 10 ? acc.concat([rollOneValue]) : acc.concat([rollOneValue, rollTwoValue])
}
