import React, { useState } from "react"
import {range} from 'lodash'
import { ScoreSheet } from "../model/ScoreSheet"
import { Frame } from "../model/Frame"
import { calculateScore } from "../service/CalculateScoreService"

interface ScoreCardProps {
    readonly initialState: ScoreSheet
}

enum Roll {
    One,
    Two
}

export const ScoreCard: React.FC<ScoreCardProps> = ({initialState}) => {
    const [scoreSheet, setScoreSheet] = useState<ScoreSheet>(initialState)

    const handleRollUpdate = (index: number, rollType: Roll, roll: string) => {
        const frames: Array<Frame> = [...scoreSheet.frames]
        frames[index] = {
            rollOne: rollType === Roll.One ? roll : frames[index].rollOne,
            rollTwo: rollType === Roll.Two ? roll : frames[index].rollTwo,
        }
        setScoreSheet(
            {
                ...scoreSheet,
                 frames
            }
        )
    }

    const getScore = async () => {
        const score = await calculateScore(scoreSheet.frames, scoreSheet.bonusRollOne, scoreSheet.bonusRollTwo)
        setScoreSheet({
            ...scoreSheet,
            score
        })
    }

    return <div>
        {range(1, 11).map((index: number) =>
            <div key={index} data-testid="frame">
                <div>Frame {index}:</div>
                <label>
                    Roll 1:
                    <input
                        data-testid="roll-one-input"
                        type="text"
                        value={scoreSheet.frames[index - 1].rollOne}
                        onChange={event => handleRollUpdate(index - 1, Roll.One, event.currentTarget.value)}
                    />
                </label>
                <label>
                    Roll 2:
                    <input
                        data-testid="roll-two-input"
                        type="text"
                        value={scoreSheet.frames[index - 1].rollTwo}
                        onChange={event => handleRollUpdate(index - 1, Roll.Two, event.currentTarget.value)}
                    />
                </label>
            </div>
        )}
        <div>
        <div>Bonus Rolls:</div>
            <label>
                Roll 1:
                <input
                    data-testid="bonus-roll-one-input"
                    type="text"
                    value={scoreSheet.bonusRollOne}
                    onChange={event => 
                        setScoreSheet(
                            {
                                ...scoreSheet,
                                bonusRollOne: event.currentTarget.value
                            }
                        )
                    }
                />
            </label>
            <label>
                Roll 2:
                <input
                    data-testid="bonus-roll-two-input"
                    type="text"
                    value={scoreSheet.bonusRollTwo}
                    onChange={event => 
                        setScoreSheet(
                            {
                                ...scoreSheet,
                                bonusRollTwo: event.currentTarget.value
                            }
                        )
                    }
                />
            </label>
        </div>
        <button onClick={getScore}>Calculate Scores</button>
        <div>
        <div>Score: {scoreSheet.score}</div>
        </div>
    </div>
}