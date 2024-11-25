import styled from 'styled-components'
import Tile from './Tile'

const Board = () => {
    return (
        <BoardWrapper>
            <Tile color="red" onPress={() => console.log('red')} />
            <Tile color="blue" onPress={() => console.log('blue')} />
            <Tile color="green" onPress={() => console.log('green')} />
            <Tile color="yellow" onPress={() => console.log('yellow')} />
        </BoardWrapper>

    )
}

const BoardWrapper = styled.div`

`

export default Board