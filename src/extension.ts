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
    /**
     * Open the file in a different editor column. Default false
     */
    useOtherColumn: boolean;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('fileextswitch', (args: any) => switchToFile(args))
    );
}

function switchToFile(args: any) {
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
};

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
        useOtherColumn: args.useOtherColumn || false,
        extensions: args.extensions
    };
}

function tryOpenCompanionFile(currentPath: string, args: CommandArguments, files: string[]) {
    const currentFile = path.basename(currentPath); // this gives us the file with all extensions
    const components = currentFile.split('.');

    const filesMap = {};
    files.forEach(x => filesMap[x] = x);

    // try the biggest match first (ie. match with .spec.ts before .ts)
    for (let i = 1; i < components.length; i++) {
        const lastComponents = components.slice(i);
        const extension = '.' + lastComponents.join('.');

        const index = args.extensions.indexOf(extension);
        if (index !== -1) {
            const base = components.slice(0, i).join('.');

            // try all the other extensions, starting with the one after the match
            for (let j = 1; j < args.extensions.length; j++) {
                const nextExtension = args.extensions[(index + j) % args.extensions.length];
                const nextFile = base + nextExtension;
                
                const exists = filesMap[nextFile];
                if (exists) {
                    const dir = path.dirname(currentPath);
                    const filePath = path.join(dir, nextFile);
                    openFile(filePath, determineColumn(args.useOtherColumn));
                    return;
                }
            }
        }
    }
}

function determineColumn(useOtherColumn: boolean): number {
    const active = vscode.window.activeTextEditor.viewColumn;
    if (!useOtherColumn) {
        return active;
    }

    return active === 1 ? 2 : 1;
}

function openFile(path: string, column: number): boolean {
    vscode.workspace
        .openTextDocument(path)
        .then(x => vscode.window.showTextDocument(x, column));

    return true;
}

// this method is called when your extension is deactivated
export function deactivate() {
}
