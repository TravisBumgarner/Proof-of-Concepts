import styled from "styled-components";

const Hover = ({
  sidebar,
}: {
  sidebar: React.ReactNode;
}) => {
  return (
    <Wrapper>
      <ContentArea>{sidebar}</ContentArea>
      <HoverElementWrapper>
        <HoverElement>Config</HoverElement>
      </HoverElementWrapper>
    </Wrapper>
  );
};

const CONTENT_WIDTH = "400px";
const HOVER_AREA_WIDTH = "30px";

const ContentArea = styled.div`
  pointer-events: auto;
  width: ${CONTENT_WIDTH};
  background-color: red;
`;

const HoverElementWrapper = styled.div`
  width: ${HOVER_AREA_WIDTH};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HoverElement = styled.div`
  pointer-events: auto;
  transform: rotate(-90deg);
`;

const Wrapper = styled.div`
  transition: transform 0.3s ease-in-out;

  display: flex;
  transform: translateX(-${CONTENT_WIDTH});
  width: calc(${CONTENT_WIDTH} + ${HOVER_AREA_WIDTH});
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: #fff;
  pointer-events: none;

  &:hover {
    transform: translateX(0);
  }
`;

export default Hover;
