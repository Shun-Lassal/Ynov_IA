# TimeTravel Agency — Webapp Interactive
Projet Réalisé par Shun Lassal, Dylan Chatelain, Victor Laborde, Tom Frégonèse
Landing page premium pour une agence de voyage temporel fictive, avec hero vidéo, destinations immersives et concierge IA.


### Liens

Web app :
> https://timetravelynov.netlify.app/  

Repository :  
> https://github.com/Shun-Lassal/Ynov_IA/

## 🛠️ Stack technique
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Mistral AI API (chatbot)

## ✨ Features
- Hero vidéo avec enchaînement de rushs
- Galerie de 3 destinations (cartes vidéo + détails)
- Chatbot IA conversationnel (widget flottant)
- Formulaire de réservation (validation HTML)
- Design “minimal luxe” + animations Tailwind

## 🤖 IA utilisées (transparence)
- Assistant de code : OpenAI Codex / GPT-5 (génération de code et copy)
- Chatbot : Mistral AI API (modèle `mistral-small-latest`)

## 🚀 Installation
1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Configurer la clé Mistral :
   ```bash
   cp .env.example .env.local
   ```
   Puis renseigner `MISTRAL_API_KEY`.
3. Lancer le projet :
   ```bash
   npm run dev
   ```

## 🧩 Configuration Mistral
Le chatbot utilise `app/api/chat/route.ts` pour appeler Mistral :
- Endpoint : `https://api.mistral.ai/v1/chat/completions`
- Modèle : `mistral-small-latest`

## 🏷️ Crédits
- API IA : Mistral AI
- Framework : Next.js, React, Tailwind CSS
- Assets vidéo : fournis par le projet (dossier `public/video`)
- Visuels SVG : générés pour placeholders

## 📄 Licence
Projet pédagogique — IA & Digital (usage éducatif).
