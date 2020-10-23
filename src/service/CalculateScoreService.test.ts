import {calculateScore} from './CalculateScoreService'
import { expect } from 'chai'
import axios from "axios"
import MockAdapter from 'axios-mock-adapter'
import { Frame } from '../model/Frame';
var mock = new MockAdapter(axios);

describe('CalculateScoreService', () => {
    describe('calculateScore', () => {
        beforeEach(() => {
            mock.reset()
        })
        it('should call the calculateScore api', async () => {
            mock.onPost('http://localhost:8080/bowling/calculateScore').reply(200, "0");
            const frames: ReadonlyArray<Frame> = [
                {
                    rollOne: "0",
                    rollTwo: "2"
                }
            ]
            const actual = await calculateScore(frames, "-", "-");
            expect(actual).to.equal(0)
        })

        it('should convert frames to a list of rolls', async () => {
            mock.onPost('http://localhost:8080/bowling/calculateScore', [0,2,5,0]).reply(200, "0");
            const frames: ReadonlyArray<Frame> = [
                {
                    rollOne: "0",
                    rollTwo: "2"
                },
                {
                    rollOne: "5",
                    rollTwo: "0"
                }
            ]
            const actual = await calculateScore(frames, "-", "-");
            expect(actual).to.equal(0)
        })

        it('should only add one roll when its a strike', async () => {
            mock.onPost('http://localhost:8080/bowling/calculateScore', [10, 10]).reply(200, "0");
            const frames: ReadonlyArray<Frame> = [
                {
                    rollOne: "10",
                    rollTwo: "0"
                },
                {
                    rollOne: "X",
                    rollTwo: "0"
                }, 
            ]
            const actual = await calculateScore(frames, "-", "-")
            expect(actual).to.equal(0)
        })

        it('should handle / for spare', async () => {
            mock.onPost('http://localhost:8080/bowling/calculateScore', [9, 1]).reply(200, "0");
            const frames: ReadonlyArray<Frame> = [
                {
                    rollOne: "9",
                    rollTwo: "/"
                }
            ]
            const actual = await calculateScore(frames, "-", "-")
            expect(actual).to.equal(0)
        })

        it('should add bonus rolls if they are there', async () => {
            mock.onPost('http://localhost:8080/bowling/calculateScore', [9, 1, 2, 1]).reply(200, "0");
            const frames: ReadonlyArray<Frame> = [
                {
                    rollOne: "9",
                    rollTwo: "/"
                }
            ]
            const actual = await calculateScore(frames, "2", "1")
            expect(actual).to.equal(0)
        })
    })
})