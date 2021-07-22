import httpRequest from "./http";

const validate = (pattern, toValidate, fallback) => {
  const regex = new RegExp(pattern);
  if (regex.test(toValidate)) {
    return toValidate;
  }

  return fallback;
};

const clearConfig = (config) => {
  const hexColor = "^#(?:[0-9a-fA-F]{3}){1,2}$";
  const regularNumber = `^[0-9]+$`;

  return {
    background: validate(hexColor, config.background, "#FEFEFE"),
    foreground: validate(hexColor, config.foreground, "#232323"),
    radius: validate(regularNumber, config.radius, 0),
    items: validate(regularNumber, config.items, 6),
  };
};

const getConfig = async () => {
  const res = await httpRequest("config/config.json");

  if (res.status !== 200) {
    return clearConfig({});
  }

  const data = res.json();
  const clear = clearConfig(data);
  return clear;
};

export default getConfig;
