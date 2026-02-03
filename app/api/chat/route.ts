import { NextResponse } from "next/server";

type ChatMessage = { role: "user" | "assistant"; content: string };

const systemPrompt = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel, chaleureux, passionné d'histoire, enthousiaste sans être trop familier.
Tu connais parfaitement : Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle), Crétacé -65M (dinosaures, nature préhistorique), Florence 1504 (Renaissance, art, Michel-Ange).
Tu peux suggérer des destinations selon les intérêts du client.
Tu peux donner des prix cohérents (ex : 28 000€ à 95 000€ selon durée et exclusivité).
Réponds en français, avec concision et élégance.`;

export async function POST(request: Request) {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Clé MISTRAL_API_KEY manquante." },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] } = {};
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];

  try {
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        temperature: 0.7,
        max_tokens: 350,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content
          }))
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "Erreur Mistral API." },
        { status: response.status }
      );
    }

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: "Réponse vide." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossible de joindre l'API Mistral." },
      { status: 502 }
    );
  }
}
