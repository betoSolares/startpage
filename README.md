# Startpage

Simple browser start page inspired by
[Vivaldi Browser](https://vivaldi.com/blog/powering-up-the-start-page/).

# Installation

Get the code and execute `npm run build` and copie the contents of the **dist**
directory in the desired location. Or you can grab a copy of the
[latest release](https://github.com/betoSolares/startpage/releases/latest).

# Usage

Set your browser homepage to the location of the **index.html** file.

## Config

This is done via a **config.json** file located in the **config** directory.

## Marks

This is done via a **store.json** file located in the **config** directory. It
has the following structure:

```json
{
  "store": [
    {
      "type": "mark",
      "name": "normal page",
      "link": "link to my page",
      "picture": "image_name.png"
    },
    {
      "type": "directory",
      "name": "a object containg more marks",
      "picture": "image_name.png",
      "items": [
        {
          "type": "mark",
          "name": "mark inside my directory",
          "link": "link to my page",
          "picture": "image_name.png"
        },
        {
          "type": "mark",
          "name": "another mark",
          "link": "link to my page",
          "picture": "image_name.png"
        }
      ]
    }
  ]
}
```

All images must be in the **images** directory.
