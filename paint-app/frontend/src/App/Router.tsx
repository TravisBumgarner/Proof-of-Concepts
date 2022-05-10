import React from 'react'
import { Routes, Route } from 'react-router'

import Paint from './Paint'
import History from './History'


const Router = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Paint />}
            />
            <Route
                path="/history"
                element={<History />}
            />
        </Routes>
    )
}

export default Router