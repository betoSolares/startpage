import React, { useEffect, useState } from "react";

import { getConfig, getStore } from "../utils";
import {
  Button,
  Container,
  Content,
  Grid,
  Image,
  Item,
  Text,
} from "./components";

const App = () => {
  const [config, setConfig] = useState({});
  const [store, setStore] = useState([]);
  const [items, setItems] = useState([]);
  const [directory, setDirectory] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const conf = await getConfig();
      const data = await getStore();
      setConfig(conf);
      setStore(data);
      setItems(data);
    };

    getData();
  }, []);

  const renderItems = (item, idx) => {
    let element;

    if (item.type === "mark") {
      element = (
        <a href={item.link}>
          <Image src={`images/${item.picture}`} radius={config.radius} />
        </a>
      );
    }

    if (item.type === "directory") {
      element = (
        <Image
          src={`images/${item.picture}`}
          radius={config.radius}
          onClick={() => enterDirectory(idx)}
        />
      );
    }

    return (
      <Item key={`${item.name}-${idx}`} color={config.foreground}>
        {element}
        <Text>
          <Content>{item.name}</Content>
        </Text>
      </Item>
    );
  };

  const enterDirectory = (idx) => {
    const directory = store[idx];
    setItems(directory.items);
    setDirectory(true);
  };

  const exitDirectory = () => {
    setItems(store);
    setDirectory(false);
  };

  return (
    <Container color={config.background}>
      {directory && (
        <Button
          foreground={config.foreground}
          background={config.background}
          radius={config.radius}
          onClick={exitDirectory}
        >
          GO BACK
        </Button>
      )}
      <Grid width={config.width} height={config.height}>
        {items.map(renderItems)}
      </Grid>
    </Container>
  );
};

export default App;
