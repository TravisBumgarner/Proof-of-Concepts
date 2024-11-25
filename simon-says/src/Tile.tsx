import styled from "styled-components";

type Props = {
    color: string;
    onPress: () => void;
}

const Tile = ({color, onPress}: Props) => {
    return (
        <StyledTile $backgroundColor={color} onClick={onPress} />
    );
}

const StyledTile = styled.button<{$backgroundColor: string}>`
    background-color: ${props => props.$backgroundColor};
    width: 100px;
    aspect-ratio: 1 / 1;
    border: 0;
    border-radius: 10px;
`

export default Tile