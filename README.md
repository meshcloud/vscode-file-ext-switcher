# file-ext-switcher 

*file-ext-switcher* allows you to quickly switch to a file with the same name but with a different extension (companion file), e.g. `file.html` and `file.js`.
This is very useful for angular2 component development where you need to quickly switch between code, template and style files.   

This extension provides key-bindable VS code commands for every supported file type. 
Note: if you prefer a graphical and more flexible companion file switcher and can live without keybindings, check out the excellent [companion-file-switcher](https://marketplace.visualstudio.com/items?itemName=ClementVidal.companion-file-switcher) extension. 

## Features

* Switch to any 
* Switch: to .css or .scss
* Switch: to .html
* Switch: to .js or .ts

Commands that switch to one of two file types (.css or .scss) first attempt to switch to the first-listed file extension. 

> Tip: Bind your custom keybindings to the `fileextswitch` commands for super-fast switching. To stay on your home-row, you can use these bindings: 
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
    "args": { "extensions": [".css", ".scsss"] }, 
    "when": "editorTextFocus"
}
```


## Contributing
Please report issues and submit pull-requests to https://github.com/JohannesRudolph/vscode-file-ext-switcher