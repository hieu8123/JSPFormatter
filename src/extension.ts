import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('JSP Language Support Extension is now active!');

  const jspFormattingProvider: vscode.DocumentFormattingEditProvider = {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
      const edits: vscode.TextEdit[] = [];
      const fullText = document.getText();
      const formattedText = fullText.replace(/\s+/g, ' ').trim(); // Logic format đơn giản

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(fullText.length)
      );

      edits.push(vscode.TextEdit.replace(fullRange, formattedText));
      return edits;
    }
  };

  // Đăng ký formatter cho các file JSP
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider('jsp', jspFormattingProvider)
  );

  vscode.commands.registerCommand('extension.formatJsp', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      vscode.commands.executeCommand('editor.action.formatDocument');
    }
  });
}

export function deactivate() {}
