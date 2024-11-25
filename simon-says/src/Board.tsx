import React, {
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import Tile, { TileRefParams } from "./Tile";
import { shuffleArray } from "./utilities";

const COLORS = ["red", "blue", "green", "yellow"];

const Board = () => {
  const [colors, setColors] = useState(COLORS);
  const sequence = useRef<string[]>([]);
  const userSequence = useRef<string[]>([]);
  const [isLandscape, setIsLandscape] = useState(false);

  const childRefs = useMemo(() => {
    const refs: { [key: string]: React.RefObject<TileRefParams> } = {};
    // Use
    COLORS.forEach((color) => {
      refs[color] = React.createRef<TileRefParams>();
    });
    return refs;
  }, []);

  const triggerAnimation = useCallback(
    (id: string) => {
      childRefs[id]?.current?.startAnimation();
    },
    [childRefs]
  );

  const playSequence = useCallback(async () => {
    setTimeout(() => {
      sequence.current.forEach((color, index) => {
        setTimeout(() => {
          triggerAnimation(color);
        }, index * 1000);
      });
    }, 1000);
  }, [triggerAnimation]);

  const pickColor = useCallback(() => {
    const newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    sequence.current.push(newColor);
  }, []);

  const nextTurn = useCallback(() => {
    pickColor();
    playSequence();
  }, [pickColor, playSequence]);

  // useEffect(() => {
  //   nextTurn();
  // }, [nextTurn]);

  const compareSequences = useCallback(() => {
    for (let i = 0; i < userSequence.current.length; i++) {
      if (userSequence.current[i] !== sequence.current[i]) {
        return false;
      }
    }
    return true;
  }, [userSequence, sequence]);

  const resetGame = useCallback(() => {
    sequence.current = [];
    userSequence.current = [];
  }, []);

  const handleTilePress = useCallback(
    (color: string) => {
      userSequence.current.push(color);
      if (userSequence.current.length !== sequence.current.length) return;

      const sequencesMatch = compareSequences();
      if (!sequencesMatch) {
        alert("Game over!");
        resetGame();
        nextTurn();
      } else {
        userSequence.current = [];
        nextTurn();
      }
    },
    [compareSequences, nextTurn, resetGame]
  );

  const shuffle = useCallback(() => {
    let colorsCopy = [...COLORS];
    shuffleArray(colorsCopy);
    setColors(colorsCopy);
  }, []);

  const handleResize = useCallback(() => {
    const isLandscape = window.innerWidth > window.innerHeight;
    setIsLandscape(isLandscape);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <button
        style={{ position: "fixed", right: 16, bottom: 16 }}
        onClick={shuffle}
      >
        Shuffle
      </button>
      <BoardPositioner>
        <TileWrapper $isLandscape={isLandscape}>
          {colors.map((color) => (
            <Tile
              ref={childRefs[color]}
              key={color}
              color={color}
              onPress={() => handleTilePress(color)}
            />
          ))}
        </TileWrapper>
      </BoardPositioner>
    </>
  );
};

const BoardPositioner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
`;

const TileWrapper = styled.div<{ $isLandscape: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  aspect-ratio: 1 / 1;

  ${({ $isLandscape }) => ($isLandscape ? "height" : "width")}: 100%;
`;

export default Board;
