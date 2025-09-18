import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> } // Changed to Promise
) {
  try {
    const { username } = await params; // Added await

    // Validate username
    if (!username || username.trim() === '') {
      return new Response(JSON.stringify({ error: 'Username is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cleanUsername = username.trim();
    
    const response = await fetch(`https://torre.ai/api/genome/bios/${cleanUsername}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Torre Talent Explorer/1.0',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return new Response(JSON.stringify({ 
          error: 'Profile not found',
          username: cleanUsername,
          status: response.status 
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`Torre API responded with status ${response.status}`);
    }

    const data = await response.json();
    
    // Check if the response contains meaningful data
    if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
      return new Response(JSON.stringify({ error: 'No data found for this user' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Genome fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch profile data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const runtime = 'edge';