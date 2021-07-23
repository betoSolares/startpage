import React, { useEffect, useState } from "react";

import { getConfig, getStore } from "./utils";

const App = () => {
  const [config, setConfig] = useState({});
  const [store, setStore] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const conf = await getConfig();
      const data = await getStore();
      setConfig(conf);
      setStore(data);
    };

    getData();
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <center>
        <h1>Hello World!!!</h1>
        <p>${config.toString()}</p>
        <p>${store.toString()}</p>
      </center>
    </div>
  );
};

export default App;
