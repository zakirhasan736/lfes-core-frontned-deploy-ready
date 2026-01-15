LFES Core – Frontend (Demo)
Overview

This repository contains the frontend application for the LFES demo trading platform.

Built with Next.js (App Router)

Written in TypeScript

Styled using Tailwind CSS and daisyUI

Uses mock/demo data only

Designed for local development and collaboration

Tech Stack

Next.js 16.1.0

React 19

TypeScript

Tailwind CSS

daisyUI

Lucide Icons

Recharts (charts & analytics)

Google Gemini API (AI assistant – demo)

Project Structure
lfes-core/
├── app/                     # Next.js App Router
│   ├── favicon.ico
│   ├── globals.css          # Global styles (Tailwind + DaisyUI)
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Entry page
│
├── components/
│   ├── Exchange/            # Trading UI components
│   │   ├── OrderBook.tsx
│   │   ├── TradePanel.tsx
│   │   └── TradingChart.tsx
│   │
│   ├── home/
│   │   └── HomeClient.tsx   # Client-side main app logic
│   │
│   ├── AIAssistant.tsx
│   ├── Dashboard.tsx
│   ├── Exchange.tsx
│   ├── LiveStream.tsx
│   ├── Login.tsx
│   └── Sidebar.tsx
│
├── services/
│   └── geminiService.ts     # AI demo service
│
├── types/
│   └── types.ts             # Shared TypeScript types
│
├── public/                  # Static assets (logos, icons)
│
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
├── package.json
└── README.md

Prerequisites

Node.js 18+

npm

Install Dependencies
npm install

Run Locally

Development server (custom port 4001):

npm run dev


App will be available at:

http://localhost:4001

Production Build
npm run build
npm run start

Environment Variables

If needed, create:

.env.local


Example:

NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_GEMINI_API_KEY=demo-key

Collaboration Guidelines

Use feature branches

Keep components modular

Do not add real-money or real-exchange integrations

Demo logic only

Follow existing folder structure

Submit changes via pull requests

Notes

This frontend is demo-only

No real trading

No real authentication

Safe to run locally