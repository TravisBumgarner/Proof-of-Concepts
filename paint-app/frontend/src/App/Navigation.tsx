import React from 'react'
import styled from 'styled-components'
import { useLocation, NavLink } from 'react-router-dom'

const StyledNav = styled.ul`
    list-style: none;
    margin: 2rem 0;
    padding: 0rem;
    display: flex;
    flex-direction: row;
    li {
        margin-right: 1rem;
    }
`

const ALWAYS_VISIBLE_LINKS = [
    { text: 'Paint', to: '/' },
    { text: 'History', to: '/history' },
]

const NavLi = styled.li`
    font-weight: ${(props: {isActive: boolean}) => {
        return props.isActive ? 700 : 100
    } };
`

const Navigation = () => {
    const location = useLocation()
    return (
        <StyledNav >
            {ALWAYS_VISIBLE_LINKS.map(({ text, to }) => (
                <NavLi key={to} isActive={location.pathname === to}>
                    <NavLink to={to}>{text}</NavLink>
                </NavLi>
            ))}
        </StyledNav>
    )
}
export default Navigation