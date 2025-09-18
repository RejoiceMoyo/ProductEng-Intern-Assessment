import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return new Response(JSON.stringify({ error: 'Query is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const torreResponse = await fetch('https://torre.ai/api/entities/_searchStream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        identityType: 'person',
        meta: false,
        limit: 20,
      }),
    });

    if (!torreResponse.ok) {
      throw new Error(`Torre API responded with status ${torreResponse.status}`);
    }

    const text = await torreResponse.text();
    const rawPeople = text
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));

    // Transform the data to match our Person interface
    const people = rawPeople.map(person => ({
      id: person.ggId || person.id,
      name: person.name,
      picture: person.imageUrl,
      professionalHeadline: person.professionalHeadline,
      username: person.username,
      verified: person.verified || false,
      weight: person.weight || 0
    }));

    return new Response(JSON.stringify(people), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const runtime = 'edge';