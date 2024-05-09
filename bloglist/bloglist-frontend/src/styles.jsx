import styled from 'styled-components'

export const StyledDiv = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f4edea;
    padding: 0.25em 1em;
`
export const Button = styled.button`
    background: #06bcc1;
    font-size: 1em;
    padding: 0.25em 1em;
    margin: 0.25em;
    border: #06bcc1;
    border-radius: 3px;
    &:hover {
        background: #c5d8d1;
        cursor: pointer;
    }
`

export const Navigation = styled.div`
    background: #dde3de;
    padding: 1em;
    margin-top: 1em;
`

export const List = styled.ul`
    list-style-type: circle;
`

export const ListItem = styled.li`
    margin: 0.5em;
`

export const StyledLink = styled.a`
    &:link {
        color: #12263a;
    }
    &:visited {
        color: #12263a;
    }
`
