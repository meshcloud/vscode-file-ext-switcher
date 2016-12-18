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
        for (let ext of validArgs.extensions) {
            const next = path.join(path.dirname(current), path.basename(current, path.extname(current))) + ext;

            if (fs.existsSync(next)) {
                openFile(next);
                return;
            }
        }
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

function openFile(path: string) {
    const activeColumn = vscode.window.activeTextEditor.viewColumn;
    vscode.workspace
        .openTextDocument(path)
        .then(x => vscode.window.showTextDocument(x, activeColumn));
}

// this method is called when your extension is deactivated
export function deactivate() {
}