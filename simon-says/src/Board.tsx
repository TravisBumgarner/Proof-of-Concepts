import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import Tile, { TileRefParams } from "./Tile";

const colors = ["red", "blue", "green", "yellow"];

const Board = () => {
  const [sequence, setSequence] = useState<string[]>(["red"]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [message, setMessage] = useState("Watch the sequence");
  const childRefs = useRef<{ [key: string]: React.RefObject<TileRefParams> }>(
    {}
  );

  // Ensure refs exist for each color
  colors.forEach((color) => {
    if (!childRefs.current[color]) {
      childRefs.current[color] = React.createRef<TileRefParams>();
    }
  });

  const triggerAnimation = (id: string) => {
    console.log(childRefs.current);
    childRefs.current[id]?.current?.startAnimation();
  };

  const playSequence = useCallback(async () => {
    setTimeout(() => {
      setMessage("Watch the sequence");
      sequence.forEach((color, index) => {
        setTimeout(() => {
          triggerAnimation(color);
        }, index * 1000);
      });
    }, 1000);
  }, [sequence]);

  const pickColor = useCallback(() => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence((prev) => [...prev, newColor]);
  }, []);

  const nextTurn = useCallback(() => {
    pickColor();
    playSequence();
  }, [pickColor, playSequence]);

  useEffect(() => {
    nextTurn();
  }, []);

  const handleTilePress = useCallback((color: string) => {}, []);

  const resetGame = useCallback(() => {
    setSequence([]);
    setUserSequence([]);
    setIsUserTurn(false);
  }, []);

  return (
    <div>
      <BoardWrapper>
        {colors.map((color) => (
          <Tile
            ref={childRefs.current[color]}
            key={color}
            color={color}
            onPress={() => handleTilePress(color)}
          />
        ))}
      </BoardWrapper>
      <p>{message}</p>
    </div>
  );
};

const BoardWrapper = styled.div``;

export default Board;
