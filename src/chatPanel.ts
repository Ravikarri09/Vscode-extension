import * as vscode from 'vscode';

export function openChatPanel() {
    const panel = vscode.window.createWebviewPanel(
        'erpnextAIChat',
        'ERPNext AI Assistant',
        vscode.ViewColumn.One,
        { enableScripts: true }
    );

    panel.webview.html = getHtml();

    panel.webview.onDidReceiveMessage(async message => {
        if (message.command === 'ask') {
            try {
                const res = await fetch("http://localhost:8000/ask", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: message.text })
                });

                const data: any = await res.json();

                panel.webview.postMessage({ answer: data.answer });

            } catch (err) {
                panel.webview.postMessage({
                    answer: "❌ Failed to connect to AI backend. Is api.py running?"
                });
            }
        }
    });
}
function getHtml() {
    return `
    <html>
    <body>
        <h2>🤖 ERPNext AI Assistant</h2>

        <div id="chat" style="height:400px; overflow-y:auto; border:1px solid #444; padding:10px;"></div>

        <input id="q" placeholder="Ask about ERPNext code..." style="width:80%" />
        <button onclick="ask()">Send</button>

        <script>
            const vscode = acquireVsCodeApi();
            const chat = document.getElementById("chat");

            function addMessage(sender, text) {
                const div = document.createElement("div");
                div.style.marginBottom = "10px";

                if (text.includes("")) {
                    div.innerHTML = "<b>" + sender + ":</b><pre style='background:#111;padding:10px;color:#0f0;overflow-x:auto;'>" + text + "</pre>";
                }
                else if (text.includes("📂 References:")) {
                    const parts = text.split("📂 References:");
                    div.innerHTML = "<b>" + sender + ":</b><br>" + parts[0] + "<hr><b>References</b><pre>" + parts[1] + "</pre>";
                }
                else {
                    div.innerHTML = "<b>" + sender + ":</b> " + text;
                }

                chat.appendChild(div);
                chat.scrollTop = chat.scrollHeight;
            }

            function ask() {
                const input = document.getElementById("q");
                const text = input.value.trim();
                if (!text) return;

                addMessage("You", text);
                vscode.postMessage({ command: "ask", text });
                input.value = "";
            }

            window.addEventListener('message', event => {
                addMessage("AI", event.data.answer);
            });
        </script>
    </body>
    </html>
    `;
}
