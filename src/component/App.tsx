import React from "react"
import { NavBar } from "./NavBar"
import { ScoreCard } from "./ScoreCard"
import { INITIAL_STATE } from "./INITIAL_STATE"

export const App = () =>
    <div>
        <NavBar/>
        <div>
            There is no input validation, and fields only accept 0-10, X, /
        </div>
        <ScoreCard initialState={INITIAL_STATE}/>
    </div>
