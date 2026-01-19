ERPNext Code Intelligence — VS Code Extension

AI-powered code intelligence extension for ERPNext that brings static analysis, code exploration, and AI-assisted understanding directly into VS Code.

This extension provides a UI on top of the mini_erp_analyzer backend engine.

✨ Features

Analyze ERPNext codebase directly from VS Code

Extract functions and classes using Python AST

Display results in an interactive UI panel

TreeView explorer for browsing entities

Designed to integrate with AI (RAG, embeddings, LLM)

🏗 Architecture
VS Code Extension (UI)
        ↓
Python Analyzer Engine
        ↓
AST Parsing + RAG Pipeline
        ↓
Code Intelligence Output


The extension acts as a frontend client for the backend analyzer.

⚙ Requirements

Node.js (LTS)

VS Code

Python 3.x (Conda or system)

Backend repo: mini_erp_analyzer

🚀 Setup Instructions
1. Clone Extension Repo
git clone https://github.com/your-username/erpnext-code-intelligence.git
cd erpnext-code-intelligence
npm install

2. Open in VS Code
code .

3. Run Extension

Press:

F5


A new VS Code window will open (Extension Development Host).

4. Run Analyzer

Press:

Ctrl + Shift + P → Analyze ERPNext Code


The analyzer UI panel will open and display results.

🔗 Backend Dependency

This extension requires the backend engine:

mini_erp_analyzer


Make sure it exists at:

D:/ERPNEXT/mini_erp_analyzer


and contains:

Analyzer/analyzer.py

🧠 Tech Stack

VS Code Extension API

TypeScript

Node.js

Python AST

FAISS (backend)

Ollama (backend)

📌 Future Roadmap

AI Chat panel

Semantic code search

Call graph visualization

Inline code insights

Bug discovery assistant

👨‍💻 Author

Karri Ravi Shankar
AI Intern — Code Intelligence Platform
