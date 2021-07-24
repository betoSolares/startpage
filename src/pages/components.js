import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ color }) => color};
  min-height: 100vh;
  max-width: 100vw;
  padding: 10px;
  text-align: center;
`;

export const Grid = styled.section`
  display: grid;
  gap: 1rem;
  grid-auto-rows: ${({ height }) => height}px;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${({ width }) => `${width}px, ${width}px`})
  );
  justify-content: center;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 25%;
`;

export const Content = styled.p`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s linear 300ms, opacity 300ms;
`;

export const Item = styled.div`
  color: ${({ color }) => color};
  cursor: pointer;
  height: 100%;
  width: 100%;
  overflow: hidden;

  &:hover ${Content} {
    font: bold 1rem "Helvetica Neue", Helvetica, Arial, sans-serif;
    vertical-align: middle;
    visibility: visible;
    opacity: 1;
    transition: visibility 0s linear 0s, opacity 300ms;
  }
`;

export const Image = styled.div`
  background-image: url(${({ src }) => src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: ${({ radius }) => radius}px;
  height: 75%;
  width: 100%;
`;

export const Button = styled.button`
  background-color: ${({ background }) => background};
  border: none;
  border-radius: ${({ radius }) => radius}px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  color: ${({ foreground }) => foreground};
  cursor: pointer;
  height: 45px;
  filter: brightness(95%);
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 2.5px;
  margin: 10px;
  outline: none;
  text-transform: uppercase;
  transition: all 0.3s ease 0s;
  width: 140px;

  &:hover {
    background-color: ${({ background }) => background};
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.4);
    color: ${({ foreground }) => foreground};
    filter: brightness(90%);
    transform: translateY(-7px);
  }
`;
