# file-ext-switcher 

*file-ext-switcher* allows you to quickly switch to a file with the same name but with a different extension (companion file), e.g. `file.html` and `file.js`.
This is very useful for angular2 component development where you need to quickly switch between code, template and style files.   

This extension provides key-bindable VS code commands for every supported file type. 
Note: if you prefer a graphical and more flexible companion file switcher and can live without keybindings, check out the excellent [companion-file-switcher](https://marketplace.visualstudio.com/items?itemName=ClementVidal.companion-file-switcher) extension. 

## Features
Switch to any companion file in the same directory that shares at least one file-name component, e.g.:

* Switch: to .css or .scss
* Switch: to .html
* Switch: to .js or .ts
* Switch: to .spec.ts

Commands that switch to one of two file types (.css or .scss) first attempt to switch to the first-listed file extension. 

## Usage

> Tip: Bind your custom keybindings to the `fileextswitch` commands for super-fast switching. For example, use these commands for angular2 development while staying on your keyboard's home-row: 
```
{
    "key": "ctrl+shift+j",
    "command": "fileextswitch",
    "args": { "extensions": [".html"] }, 
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+k",
    "command": "fileextswitch",
    "args": { "extensions": [".js", ".ts"] }, 
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+l",
    "command": "fileextswitch",
    "args": { "extensions": [".css", ".scss"] }, 
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+;",
    "command": "fileextswitch",
    "args": { "extensions": [".spec.ts"] }, 
    "when": "editorTextFocus"
}
```

When invoked, the command will look for files in the same directory of the current file, which share at least one base component (e.g. "app" for a file named "app.module.ts"). 
Matching is _greedy_ e.g. it will try to match as many base components ass posible.

## Contributing
Please report issues and submit pull-requests to https://github.com/JohannesRudolph/vscode-file-ext-switcher