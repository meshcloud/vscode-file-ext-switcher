# file-ext-switcher 

*file-ext-switcher* allows you to quickly switch to a file with the same name but with a different extension (companion file), e.g. `file.html` and `file.js`.
This is very useful for angular component development where you need to quickly switch between code, template and style files.

> This extension provides key-bindable VS code commands for every supported file type. 
**You must set up bindings in** `keybindings.json`, **to use this extension, see [Usage](#usage)**.

## Features
Switch to **any companion file** in the same directory that shares at least one file-name component. Use file-ext-switcher for example to switch between:

* Switch: to .css or .scss
* Switch: to .html
* Switch: to .js or .ts
* Switch: to .spec.ts

Commands that switch to one of two file types (.css or .scss) first attempt to switch to the first-listed file extension. 

## Usage

Bind your custom keybindings to the `fileextswitch` commands for super-fast switching. 
Open `Preferences: Open Keyboard Shortcuts` in VSCode and then click edit `keybindings.json`. 

A sample keybinding for file-ext-switcher looks like this: 
```json
{
    "key": "ctrl+shift+j",
    "command": "fileextswitch",
    "args": { "extensions": [".html"], "useOtherColumn": true }, 
    "when": "editorTextFocus"
},
```
 
 The `args` parameter supports the following options and configures the behavior of file-ext-switcher:

```js
{
    "extensions": [
        ".js", // extensions to try (in order)
        ".ts"
    ],
    "useOtherColumn": true // open companion file in other editor column (default false)
}
```

## Example Keybindings

### Open companion file in other column
These shortcuts open a companion file in the other editor column (note the `useOtherColumn: true`), so you can quickly open your `component.ts` definition next to your `component.html`:

```json
{
    "key": "ctrl+shift+j",
    "command": "fileextswitch",
    "args": { "extensions": [".html"], "useOtherColumn": true }, 
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+k",
    "command": "fileextswitch",
    "args": { "extensions": [".js", ".ts"], "useOtherColumn": true }, 
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+l",
    "command": "fileextswitch",
    "args": { "extensions": [".css", ".scss"], "useOtherColumn": true }, 
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+;",
    "command": "fileextswitch",
    "args": { "extensions": [".spec.ts"], "useOtherColumn": true }, 
    "when": "editorTextFocus"
}
```

### Cycle through companion files

When invoked, the command will look for files in the same directory of the current file, which share at least one base component (e.g. "app" for a file named "app.module.ts"). Matching follows the order of specified extensions, locating the current file's extension in the list and then cycling through to the next file extension. This allows e.g. to generate a keyboard shortcut for cyclic switching between file extensions: 

```json
{
        "key": "ctrl+shift+i",
        "command": "fileextswitch",
        "args": {
            "extensions": [
                ".ts",
                ".html",
                ".scss"
            ]
        },
        "when": "editorTextFocus"
    }
```

## Contributing
Please report issues and submit pull-requests to https://github.com/JohannesRudolph/vscode-file-ext-switcher

## Acknowledgements
If you prefer a graphical companion file switcher and can live without keybindings, check out the excellent [companion-file-switcher](https://marketplace.visualstudio.com/items?itemName=ClementVidal.companion-file-switcher) extension. 
