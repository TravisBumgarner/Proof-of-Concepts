import React from 'react'
import { Routes, Route } from 'react-router'

const Paint = () => {
    return <p>Hi.</p>
}

const History = () => {
    return <p>Hisd.</p>
}


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