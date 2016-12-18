'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from "path";
import * as fs from "fs";

interface CommandArguments {
    /**
     * The extensions to switch to, need to have a leading period
     */
    extensions: string[];
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('fileextswitch', (args: any) => {
        const current = vscode.window.activeTextEditor.document.fileName;
        const validArgs = parseArgs(args);

        const dir = path.dirname(current);
        fs.readdir(dir, (err, files) => {
            if (err) {
                vscode.window.showErrorMessage("fileextswitch encountered error: " + err);
                return;
            }
            tryOpenCompanionFile(current, validArgs, files);
        });
    }));

}
function showKeybindingWarning() {
    const warn = `Your keybinding for fileextswitch is incorrectly configured. See https://goo.gl/gsCYrW for how to set up correct configuration.`;
    vscode.window.showWarningMessage(warn);
}

function parseArgs(args: any): CommandArguments {
    if (!args.extensions
        || !args.extensions.length
        || args.extensions.find(x => x.indexOf(".") !== 0) // all extensions need to start with leading .
    ) {
        showKeybindingWarning();
        args.extensions = [];
    }

    return {
        extensions: args.extensions
    };
}

function tryOpenCompanionFile(currentPath: string, args: CommandArguments, files: string[]) {
    const currentFile = path.basename(currentPath); // this gives us the file with all extensions
    const components = currentFile.split('.');

    const filesMap = {};
    files.forEach(x => filesMap[x] = x);

    // now lets try changing the last component, then the last 2 etc.
    const minimumComponentMatches = 1;
    for (let i = components.length; i >= minimumComponentMatches; i--) {
        const nextComponents = components.slice(0, i);
        const nextBase = nextComponents.join('.');

        // try all extensions
        for (let e of args.extensions) {
            const nextFile = nextBase + e;
            const exists = filesMap[nextFile];
            if (exists) {
                const dir = path.dirname(currentPath);
                openFile(path.join(dir, nextFile));
                return;
            }
        }
    }
}

function openFile(path: string): boolean {
    const activeColumn = vscode.window.activeTextEditor.viewColumn;
    vscode.workspace
        .openTextDocument(path)
        .then(x => vscode.window.showTextDocument(x, activeColumn));

    return true;
}

// this method is called when your extension is deactivated
export function deactivate() {
}