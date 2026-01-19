import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand(
        'erpnext.analyzeCode',
        () => {

            // Create WebView panel
            const panel = vscode.window.createWebviewPanel(
                'erpnextAnalyzer',
                'ERPNext Code Analyzer',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );

            panel.webview.html = getLoadingHtml();

            // Run Python analyzer
            const projectPath = "D:/ERPNEXT/mini_erp_analyzer";
			const pythonPath = "D:/conda/python.exe";
			const scriptPath = "Analyzer/analyzer.py";

			cp.exec(
   			 `"${pythonPath}" ${scriptPath}`,
   				 { cwd: projectPath },
    			 (error, stdout, stderr) => {
       			 if (error) {
            	panel.webview.html = getErrorHtml(stderr || error.message);
            return;
        }

        const outputPath = path.join(projectPath, "output/functions.json");

        if (!fs.existsSync(outputPath)) {
            panel.webview.html = getErrorHtml("Analyzer output not found.");
            return;
        }

        const functions = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
        panel.webview.html = getResultHtml(functions.length);
    }
);

        }
    );

    context.subscriptions.push(disposable);
}

function getLoadingHtml() {
    return `
    <html>
        <body>
            <h2>🔍 ERPNext Code Analyzer</h2>
            <p>Analyzing codebase... Please wait.</p>
        </body>
    </html>
    `;
}

function getResultHtml(functionCount: number) {
    return `
    <html>
        <body>
            <h2>✅ ERPNext Code Analysis Complete</h2>
            <p><b>Functions Found:</b> ${functionCount}</p>
            <p>Output saved in output/ folder</p>
        </body>
    </html>
    `;
}

function getErrorHtml(error: string) {
    return `
    <html>
        <body>
            <h2>❌ Analyzer Error</h2>
            <pre>${error}</pre>
        </body>
    </html>
    `;
}
