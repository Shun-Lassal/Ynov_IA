"use client";

import { useMemo, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const destinations = [
  {
    era: "Florence, 1504",
    name: "Renaissance Majestueuse",
    summary:
      "Ateliers privés, banquets d’artisans et rencontres exclusives au coeur de la Toscane.",
    videoSrc: "/video/Renaissance_Florence_2.mp4",
    poster: "/images/destination-florence.svg",
    details: [
      "Accès réservé aux cercles Médicis",
      "Séjour dans un palazzo privé",
      "Chrono-guide artistique dédié"
    ]
  },
  {
    era: "Paris, 1889",
    name: "Belle Époque Électrique",
    summary:
      "Dîners de gala, cabarets privés et nuit inaugurale de l’Exposition universelle.",
    videoSrc: "/video/Paris_1889_2.mp4",
    poster: "/images/destination-paris.svg",
    details: [
      "Accès à la tour Eiffel en avant-première",
      "Salon privé avec artistes et ingénieurs",
      "Concierge historique francophone"
    ]
  },
  {
    era: "Crétacé, -65M",
    name: "Aube des Titans",
    summary:
      "Observation sécurisée des géants préhistoriques depuis un dôme bioprotecteur.",
    videoSrc: "/video/Cretaces_2.mp4",
    poster: "/images/destination-cretace.svg",
    details: [
      "Transferts aériens anti-impact",
      "Guides paléo-certifiés",
      "Simulation acoustique immersive"
    ]
  }
];

const faq = [
  {
    q: "Le voyage modifie-t-il ma ligne temporelle ?",
    a: "Nos protocoles neutralisent les paradoxes via des boucles d’observation isolées."
  },
  {
    q: "Puis-je voyager avec des proches ?",
    a: "Oui, jusqu’à 4 invités par mission, validés par notre cellule d’intégrité temporelle."
  },
  {
    q: "Quelles garanties de confort ?",
    a: "Suites hermétiques, médecins chrono-spécialistes et conciergerie 24/7."
  }
];

export default function Home() {
  const [chatOpen, setChatOpen] = useState(true);
  const [selectedEra, setSelectedEra] = useState(destinations[0].era);
  const [heroIndex, setHeroIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Bienvenue chez TimeTravel Agency. Dites-moi ce qui vous attire : art, innovation ou nature préhistorique ?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  const selectedDestination = useMemo(
    () => destinations.find((item) => item.era === selectedEra) ?? destinations[0],
    [selectedEra]
  );

  const heroVideos = useMemo(
    () => [
      "/video/Renaissance_Florence_2.mp4",
      "/video/Paris_1889_2.mp4",
      "/video/Cretaces_2.mp4",
      "/video/Video_Avion.mp4"
    ],
    []
  );

  const sendChatMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || chatLoading) {
      return;
    }

    setChatError(null);
    const nextMessages: ChatMessage[] = [
      ...chatMessages,
      { role: "user", content: trimmed }
    ];
    setChatMessages(nextMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.slice(-12)
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Erreur serveur.");
      }

      const data = (await response.json()) as { reply?: string };
      if (!data.reply) {
        throw new Error("Réponse vide.");
      }

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "" }
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Impossible de joindre le concierge IA.";
      setChatError(message);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-noir text-ivory">
      <header className="relative min-h-[92vh] overflow-hidden sm:min-h-[100vh]">
        <video
          key={heroIndex}
          className="absolute inset-0 h-full w-full object-cover opacity-65 hero-mask animate-fadeIn"
          autoPlay
          muted
          playsInline
          poster="/images/hero-poster.svg"
          onEnded={() => setHeroIndex((value) => (value + 1) % heroVideos.length)}
        >
          <source src={heroVideos[heroIndex]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hero-weave opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-noir" />
        <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent animate-sweep" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-16 pt-8 sm:gap-16 sm:px-6 sm:pb-24 sm:pt-10">
          <nav className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-ivory/70 animate-fadeUp sm:text-[11px] sm:tracking-[0.35em]">
            <span className="font-[var(--font-display)] text-xs tracking-[0.4em] text-ivory sm:text-sm sm:tracking-[0.45em]">
              TimeTravel Agency
            </span>
            <div className="hidden gap-8 md:flex">
              <a className="hover:text-champagne transition" href="#destinations">Destinations</a>
              <a className="hover:text-champagne transition" href="#agency">Agence</a>
              <a className="hover:text-champagne transition" href="#concierge">Concierge</a>
              <a className="hover:text-champagne transition" href="#reservation">Réservation</a>
            </div>
            <button className="rounded-full border border-white/20 px-4 py-2 text-[9px] tracking-[0.25em] transition hover:border-champagne hover:text-champagne sm:px-5 sm:text-[10px] sm:tracking-[0.3em]">
              Accès privé
            </button>
          </nav>

          <section className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8 animate-fadeUp">
              <p className="text-[10px] uppercase tracking-[0.45em] text-champagne sm:text-[11px] sm:tracking-[0.5em]">
                Chrono concierge
              </p>
              <h1 className="font-[var(--font-display)] text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Des voyages temporels épurés, calibrés pour l’extraordinaire.
              </h1>
              <p className="max-w-xl text-sm text-ivory/70 sm:text-base md:text-lg">
                TimeTravel Agency orchestre des escapades privées avec une précision horlogère :
                protocole discret, sécurité totale et élégance intemporelle.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#destinations"
                  className="w-full rounded-full bg-champagne px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-noir shadow-halo transition hover:scale-[1.02] sm:w-auto"
                >
                  Explorer les époques
                </a>
                <a
                  href="#reservation"
                  className="w-full rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-[0.25em] text-ivory/80 transition hover:border-champagne hover:text-champagne sm:w-auto"
                >
                  Demander une invitation
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-surface rounded-[24px] p-5 shadow-glass animate-fadeUp sm:rounded-[28px] sm:p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne sm:text-[11px] sm:tracking-[0.35em]">Brief privé</p>
                <p className="mt-4 text-base font-semibold sm:text-lg">Trois destinations. Une signature sur-mesure.</p>
                <p className="mt-3 text-sm text-ivory/70">
                  Nos itinéraires sont conçus comme des pièces uniques, validées par nos chronistes.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Stabilité", value: "99.98%" },
                  { label: "Accès", value: "Invitation" },
                  { label: "Suites", value: "7 étoiles" },
                  { label: "Assistance", value: "24/7" }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[20px] border border-white/10 bg-midnight/70 p-4 animate-fadeUp sm:rounded-[22px]"
                  >
                    <p className="text-[9px] uppercase tracking-[0.28em] text-ivory/50 sm:text-[10px] sm:tracking-[0.3em]">{item.label}</p>
                    <p className="mt-3 text-base font-semibold text-champagne sm:text-lg">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </header>

      <section id="agency" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="glass-surface rounded-[32px] p-8 animate-fadeUp sm:rounded-[36px] sm:p-10 md:p-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-[10px] uppercase tracking-[0.45em] text-champagne sm:text-[11px] sm:tracking-[0.5em]">Présentation</p>
              <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl">
                Une maison de voyages temporels confidentielle et radicalement élégante.
              </h2>
              <p className="text-ivory/70">
                Intelligence artificielle, éthique historique et hospitalité ultra-premium se combinent pour
                offrir des expériences immersives et sécurisées, sans ostentation.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-full border border-white/20 px-4 py-2 text-[9px] uppercase tracking-[0.25em] text-ivory/70 sm:px-5 sm:text-[10px] sm:tracking-[0.3em]">
                  Charte éthique
                </button>
                <button className="rounded-full border border-white/20 px-4 py-2 text-[9px] uppercase tracking-[0.25em] text-ivory/70 sm:px-5 sm:text-[10px] sm:tracking-[0.3em]">
                  Conseil scientifique
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Ligne temporelle", value: "99.98%" },
                { label: "Incidents évités", value: "0.0003%" },
                { label: "Clients privés", value: "312 explorateurs" }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/10 bg-midnight/70 p-5 animate-fadeUp sm:rounded-[26px] sm:p-6"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/50 sm:text-[11px] sm:tracking-[0.35em]">{item.label}</p>
                  <p className="mt-3 text-xl font-semibold text-champagne sm:text-2xl">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="destinations" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] text-champagne sm:text-[11px] sm:tracking-[0.5em]">Galerie</p>
            <h2 className="mt-4 font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl">
              Trois époques, trois signatures d’exception.
            </h2>
          </div>
          <a
            href="#reservation"
            className="w-full rounded-full border border-champagne/60 px-6 py-3 text-xs uppercase tracking-[0.3em] text-champagne transition hover:bg-champagne hover:text-noir sm:w-auto"
          >
            Découvrir les destinations
          </a>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((card) => (
            <article
              key={card.era}
              className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-midnight/80 p-5 shadow-deep transition duration-500 hover:-translate-y-2 animate-fadeUp sm:rounded-[28px] sm:p-6"
            >
              <div className="pointer-events-none absolute inset-0 card-sheen opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-ivory/60 sm:text-[11px] sm:tracking-[0.3em]">
                  <span>{card.era}</span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[9px]">
                    Prestige
                  </span>
                </div>
                <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <video
                    className="h-36 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-40"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={card.poster}
                  >
                    <source src={card.videoSrc} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-noir/80 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-champagne">
                    Projection immersive
                  </div>
                </div>
                <h3 className="mt-6 font-[var(--font-display)] text-xl sm:text-2xl">{card.name}</h3>
                <p className="mt-4 text-sm text-ivory/70 sm:mt-5">{card.summary}</p>
                <ul className="mt-4 flex-1 space-y-3 text-sm text-ivory/70 sm:mt-5">
                  {card.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-champagne" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#reservation"
                  className="mt-8 mt-auto inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-ivory/70 transition group-hover:border-champagne group-hover:text-champagne sm:mt-10"
                >
                  Consulter l’itinéraire
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="concierge" className="relative mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 rounded-[36px] border border-white/10 bg-midnight/80 p-8 md:grid-cols-[1.05fr_0.95fr] md:p-16 animate-fadeUp sm:gap-12 sm:rounded-[44px] sm:p-10">
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.45em] text-champagne sm:text-[11px] sm:tracking-[0.5em]">Concierge IA</p>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl">
              Un agent discret pour affiner chaque décision.
            </h2>
            <p className="text-ivory/70">
              Notre IA analyse vos intentions, votre style de voyage et les contraintes chrono-éthiques
              pour vous proposer des recommandations personnalisées et une FAQ instantanée.
            </p>
            <div className="space-y-4">
              {faq.map((item) => (
                <div key={item.q} className="rounded-2xl border border-white/10 bg-noir/40 p-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">{item.q}</p>
                  <p className="mt-2 text-sm text-ivory/70">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm rounded-[28px] border border-white/10 bg-noir/80 p-5 shadow-deep animate-floatSoft sm:rounded-[32px] sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">TimeTravel IA</p>
                  <p className="mt-1 font-semibold">Session concierge</p>
                </div>
                <span className="rounded-full bg-champagne/20 px-3 py-1 text-[9px] uppercase tracking-[0.3em] text-champagne">
                  En ligne
                </span>
              </div>
              <div className="mt-6 space-y-4 text-sm text-ivory/70">
                <div className="rounded-2xl bg-white/5 p-4">
                  Bonjour, souhaitez-vous une expérience art, nature ou futurisme ?
                </div>
                <div className="ml-auto rounded-2xl bg-champagne/20 p-4 text-right text-ivory">
                  Art + gastronomie privée.
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  Parfait. Florence 1504 propose des ateliers privés et des banquets Renaissance.
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <input
                  className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-ivory placeholder:text-ivory/40"
                  placeholder="Votre demande..."
                />
                <button className="rounded-full bg-champagne px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-noir">
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reservation" className="mx-auto max-w-6xl px-5 pb-24 pt-8 sm:px-6 sm:pb-32 sm:pt-10">
        <div className="grid gap-10 rounded-[36px] border border-white/10 bg-midnight/80 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-16 animate-fadeUp sm:gap-12 sm:rounded-[40px] sm:p-10">
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.45em] text-champagne sm:text-[11px] sm:tracking-[0.5em]">Réservation</p>
            <h2 className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl">
              Réservez votre trajectoire privée, en toute discrétion.
            </h2>
            <p className="text-ivory/70">
              Chaque demande est validée par nos analystes temporels. Vous recevrez une proposition ultra
              personnalisée sous 24 heures.
            </p>
            <div className="rounded-2xl border border-white/10 bg-noir/40 p-4 text-sm text-ivory/70">
              Validation automatisée : dates contrôlées, cohérence historique et conformité éthique.
            </div>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.28em] text-ivory/60 sm:text-[10px] sm:tracking-[0.3em]">
                Destination
              </label>
              <select
                className="w-full rounded-2xl border border-white/10 bg-noir/80 px-4 py-3 text-sm text-ivory"
                value={selectedEra}
                onChange={(event) => setSelectedEra(event.target.value)}
                required
              >
                {destinations.map((item) => (
                  <option key={item.era} value={item.era}>
                    {item.era}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.28em] text-ivory/60 sm:text-[10px] sm:tracking-[0.3em]">
                  Date de départ
                </label>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-white/10 bg-noir/80 px-4 py-3 text-sm text-ivory"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[0.28em] text-ivory/60 sm:text-[10px] sm:tracking-[0.3em]">
                  Date de retour
                </label>
                <input
                  type="date"
                  className="w-full rounded-2xl border border-white/10 bg-noir/80 px-4 py-3 text-sm text-ivory"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.28em] text-ivory/60 sm:text-[10px] sm:tracking-[0.3em]">Profil voyageur</label>
              <textarea
                className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-noir/80 px-4 py-3 text-sm text-ivory"
                placeholder="Décrivez vos attentes, préférences, allergies..."
                required
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-noir/40 p-4 text-xs text-ivory/60">
              Destination sélectionnée : {selectedDestination.name}
            </div>
            <button className="w-full rounded-full bg-champagne px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-noir shadow-halo">
              Envoyer la demande
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-[9px] uppercase tracking-[0.3em] text-ivory/50 sm:px-6 sm:py-10 sm:text-[10px] sm:tracking-[0.35em]">
        TimeTravel Agency · Confidentialité absolue · 2026
      </footer>

      <div className="fixed bottom-4 right-4 z-50 w-[92vw] max-w-[320px] text-sm sm:bottom-6 sm:right-6 sm:w-[320px]">
        <button
          className="flex w-full items-center justify-between rounded-full border border-white/10 bg-midnight/80 px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-ivory/70 animate-glowPulse"
          onClick={() => setChatOpen((value) => !value)}
        >
          Concierge IA
          <span className="rounded-full bg-champagne/20 px-3 py-1 text-[9px] text-champagne">
            {chatOpen ? "Masquer" : "Ouvrir"}
          </span>
        </button>
        {chatOpen && (
          <div className="mt-3 rounded-[28px] border border-white/10 bg-noir/95 p-4 shadow-deep chat-glow">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Assistant privé</p>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>
            <div className="mt-4 max-h-[240px] space-y-3 overflow-y-auto text-xs text-ivory/70">
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "assistant"
                      ? "rounded-2xl bg-white/5 p-3"
                      : "ml-auto rounded-2xl bg-champagne/20 p-3 text-right text-ivory"
                  }
                >
                  {message.content}
                </div>
              ))}
              {chatLoading && (
                <div className="rounded-2xl bg-white/5 p-3 text-ivory/50">
                  Le concierge IA réfléchit...
                </div>
              )}
              {chatError && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-ivory/70">
                  {chatError}
                </div>
              )}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-ivory placeholder:text-ivory/40"
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    sendChatMessage(chatInput);
                  }
                }}
              />
              <button
                className="rounded-full bg-champagne px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-noir disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => sendChatMessage(chatInput)}
                disabled={chatLoading}
              >
                Envoyer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
