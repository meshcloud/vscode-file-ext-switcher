# file-ext-switcher 

Once **[set up](#setup)** *file-ext-switcher* allows you to quickly switch via keyboard shortcuts between files which share same name but differ by extension (AKA companion files, e.g. from `file.html` to `file.js`).
This is very useful for Angular (and even AngularJs) component development where you need to quickly switch between code, template, style and test files.

> This extension provides key-bindable VS code commands for every supported file type that you specify. 
**Please note that you must set up bindings first, see [Setup](#setup)**.

## Features
Switch to/between **any companion file(s)** in the same directory that shares at least one file-name component. Examples of usage:

* Switch to styles `.css` or `.scss`
* Open `.html` template in another editor column in split mode
* Switch between `.ts` and generated `.js` files
* Switch from `.ts` to `.spec.ts` and back 

## Setup

Bind your custom keybindings to the `fileextswitch` commands for super-fast switching. 

1. In VSCode open Command Palette
2. Type in and select `Preferences: Open Keyboard Shortcuts File`
3. Add one or more custom *file-ext-switcher* keybinding into the file

A sample keybinding looks like this: 
```javascript
{
    "key": "ctrl+shift+j",
    "command": "fileextswitch",
    "args": { 
        "extensions": [".html", ".ts",], // extensions to switch to (in the exact order)
        "useOtherColumn": true // open companion file in other editor column (default false)
    }, 
    "when": "editorTextFocus"
},
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
