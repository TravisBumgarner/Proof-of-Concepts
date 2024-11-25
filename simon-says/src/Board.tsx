import React, { useEffect, useCallback, useRef, useMemo } from "react";
import styled from "styled-components";
import Tile, { TileRefParams } from "./Tile";

const colors = ["red", "blue", "green", "yellow"] as const;

const Board = () => {
  const sequence = useRef<string[]>([]);
  const userSequence = useRef<string[]>([]);

  // Initialize refs for each color once using useMemo
  const childRefs = useMemo(() => {
    const refs: { [key: string]: React.RefObject<TileRefParams> } = {};
    colors.forEach((color) => {
      refs[color] = React.createRef<TileRefParams>();
    });
    return refs;
  }, []); // Empty dependency array ensures this is only created once.

  const triggerAnimation = useCallback((id: string) => {
    childRefs[id]?.current?.startAnimation();
  }, [childRefs]);

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
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.current.push(newColor);
  }, []);

  const nextTurn = useCallback(() => {
    pickColor();
    playSequence();
  }, [pickColor, playSequence]);

  useEffect(() => {
    nextTurn();
  }, [nextTurn]);

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

  return (
    <div>
      <BoardWrapper>
        {colors.map((color) => (
          <Tile
            ref={childRefs[color]}
            key={color}
            color={color}
            onPress={() => handleTilePress(color)}
          />
        ))}
      </BoardWrapper>
    </div>
  );
};

const BoardWrapper = styled.div``;

export default Board;
