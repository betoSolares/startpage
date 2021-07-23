import httpRequest from "./http";

const getClickableLink = (link) => {
  if (link && link.match(/^ *$/) === null) {
    return link.startsWith("http://") || link.startsWith("https://")
      ? link
      : `http://${link}`;
  }

  return "";
};

const getDirectoryItems = (items) => {
  const newItems = [];

  for (const item of items) {
    if (item.type === "mark") {
      const clear = clearMark(item);
      newItems.push(clear);
    }
  }

  return newItems;
};

const clearMark = (mark) => {
  return {
    type: "mark",
    name: mark.name || "UNNAMED MARK",
    link: getClickableLink(mark.link),
    picture: mark.picture || "unknow_mark.png",
  };
};

const clearDir = (directory) => {
  return {
    type: "directory",
    name: directory.name || "UNNAMED DIRECTORY",
    items: getDirectoryItems(directory.items),
    picture: directory.picture || "default_directory.png",
  };
};

const clearStore = (store) => {
  const items = [];

  for (const item of store.store) {
    if (item.type === "mark") {
      const clear = clearMark(item);
      items.push(clear);
    }

    if (item.type === "directory") {
      const clear = clearDir(item);
      items.push(clear);
    }
  }

  return items;
};

const getStore = async () => {
  const res = await httpRequest("config/store.json");

  if (res.status !== 200) {
    return [];
  }

  const data = res.json();
  const clear = clearStore(data);
  return clear;
};

export default getStore;
