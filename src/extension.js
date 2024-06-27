const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('copy-tab.copyFile', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const filePath = document.uri.fsPath;

            const destination = await vscode.window.showInputBox({
                prompt: "Enter the destination path"
            });

            if (destination) {
                try {
                    fs.copyFileSync(filePath, path.join(destination, path.basename(filePath)));
                    vscode.window.showInformationMessage(`File copied to ${destination}`);
                } catch (err) {
                    vscode.window.showErrorMessage(`Failed to copy file: ${err.message}`);
                }
            }
        } else {
            vscode.window.showInformationMessage('No active editor found!');
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};
