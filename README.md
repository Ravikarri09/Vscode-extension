ERPNext Code Intelligence — VS Code Extension
Overview

This VS Code extension provides an AI-powered developer assistant for ERPNext.
It integrates with the ERPNext Code Intelligence backend and allows developers to analyze and chat with the ERPNext codebase directly inside VS Code.

Features

Code Analyzer Panel (AST-based analysis)

AI Chat Panel

Continuous conversation

Streaming responses

File references in answers

Code highlighting

RAG-powered semantic search

**System Architecture
VS Code Extension
        ↓ HTTP
Python AI Backend
        ↓
RAG Pipeline
        ↓
ERPNext Semantic Index**

Commands
Command	Description
Analyze ERPNext Code	Runs the AST analyzer
Open ERPNext AI Assistant	Opens the AI chat panel
Project Structure
erpnext-code-intelligence/
 ├── src/
 │   ├── extension.ts
 │   ├── chatPanel.ts
 ├── out/
 ├── package.json
 └── README.md

Usage

Start backend server:

python api.py


Launch extension:

F5


Open command palette:

Ctrl + Shift + P


Run:

Open ERPNext AI Assistant

Example Queries

How is Sales Invoice validated?

Where is tax calculated?

Which files use flt()?

Explain checkout workflow

Tech Stack

TypeScript

VS Code WebView

Node.js

Python AI Backend

RAG + LLM

Purpose

This extension helps ERPNext developers:

Understand complex workflows

Navigate large codebases

Debug faster

Learn system architecture

Use AI directly inside their editor

Summary

This extension brings AI-powered code intelligence into VS Code, turning ERPNext into a searchable and conversational knowledge base for developers.
