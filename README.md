# file-ext-switcher 

*file-ext-switcher* allows you to quickly switch to a file with the same name but with a different extension, e.g. `file.html` and `file.js`.
This is very useful for angular2 component development where you need to quickly switch between code, template and style files.  

## Features

* Switch: to .css or .scss
* Switch: to .html
* Switch: to .js or .ts

Commands that switch to one of two file types (.css or .scss) first attempt to switch to the first-listed file 

> Tip: Bind your custom keybindings to the `fileextswitch.*` commands for super-fast switching. To stay on your home-row, you can use these bindings: 
```
{
    "key": "ctrl+shift+j",
    "command": "fileextswitch.html",
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+k",
    "command": "fileextswitch.js",
    "when": "editorTextFocus"
},
{
    "key": "ctrl+shift+l",
    "command": "fileextswitch.css",
    "when": "editorTextFocus"
}
```


## Contributing
Please report issues and submit pull-requests to https://github.com/JohannesRudolph/vscode-file-ext-switcher

## Release Notes

### 1.0.0

Initial release