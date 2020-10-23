import React from 'react'
import { ScoreCard } from './ScoreCard'
import {expect} from 'chai'
import { render, screen, fireEvent} from '@testing-library/react'
import { ScoreSheet } from '../model/ScoreSheet'

describe('ScoreCard', () => {
    const sampleScoreCard: ScoreSheet = {
        frames: [
            {
                rollOne: "5",
                rollTwo: "3"
            },
            {
                rollOne: "6",
                rollTwo: "1"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
            {
                rollOne: "0",
                rollTwo: "0"
            },
        ],
        bonusRollOne: "0",
        bonusRollTwo: "0",
        score: "-"
    }

    it('Should display 10 Frames', () => {
        render(<ScoreCard initialState={sampleScoreCard} />)
        expect(screen.getAllByTestId("frame").length).to.equal(10)
    })

    it('should tie frames to the right frame in state', () => {
        render(<ScoreCard initialState={sampleScoreCard} />)
        const frameOneRollOne = screen.getAllByTestId("roll-one-input")[0] as HTMLInputElement
        const frameOneRollTwo = screen.getAllByTestId("roll-two-input")[0] as HTMLInputElement
        const frameTwoRollOne = screen.getAllByTestId("roll-one-input")[1] as HTMLInputElement
        const frameTwoRollTwo = screen.getAllByTestId("roll-two-input")[1] as HTMLInputElement
        expect(frameOneRollOne.value).to.equal("5")
        expect(frameOneRollTwo.value).to.equal("3")
        expect(frameTwoRollOne.value).to.equal("6")
        expect(frameTwoRollTwo.value).to.equal("1")
    })

    it('should allow you to update a first roll', () => {
        render(<ScoreCard initialState={sampleScoreCard} />)
        const frameOneRollOne = screen.getAllByTestId("roll-one-input")[0] as HTMLInputElement
        fireEvent.change(frameOneRollOne, {target: { value: "2" }})
        expect(frameOneRollOne.value).to.equal("2")
    })

    it('should allow you to update a second roll', () => {
        render(<ScoreCard initialState={sampleScoreCard} />)
        const frameOneRollOne = screen.getAllByTestId("roll-two-input")[0] as HTMLInputElement
        fireEvent.change(frameOneRollOne, {target: { value: "10" }})
        expect(frameOneRollOne.value).to.equal("10")
    })
    
    it('should allow you to update the bonus roll one', () => {
        render(<ScoreCard initialState={sampleScoreCard} />)
        const bonusRollOne = screen.getAllByTestId("bonus-roll-one-input")[0] as HTMLInputElement
        fireEvent.change(bonusRollOne, {target: { value: "10" }})
        expect(bonusRollOne.value).to.equal("10")
    })

    it('should allow you to update the bonus roll two', () => {
        render(<ScoreCard initialState={sampleScoreCard} />)
        const bonusRollTwo = screen.getAllByTestId("bonus-roll-two-input")[0] as HTMLInputElement
        fireEvent.change(bonusRollTwo, {target: { value: "10" }})
        expect(bonusRollTwo.value).to.equal("10")
    })


})