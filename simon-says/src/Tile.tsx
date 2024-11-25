import {
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";

type Props = {
  color: string;
  onPress: () => void;
  ref: React.RefObject<HTMLButtonElement>;
};

export type TileRefParams = {
  startAnimation: () => void;
};

const Tile = forwardRef<TileRefParams, Props>(({ color, onPress }, ref) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500); // Duration of the animation
  }, []);

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  return (
    <StyledTile
      $backgroundColor={color}
      onClick={onPress}
      className={isAnimating ? "animate" : ""}
    />

  );
});

const flash = keyframes`
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
`;

const StyledTile = styled.button<{ $backgroundColor: string }>`
  transition: opacity 0.5s;
  opacity: 0.5;
  background-color: ${(props) => props.$backgroundColor};

  width: 100%;
  aspect-ratio: 1 / 1;
  border: 0;
  border-radius: 10px;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  &.animate {
    animation: ${flash} 0.5s ease-in-out;
  }
`;

export default Tile;
