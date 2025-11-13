import { NextResponse } from 'next/server';

const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_TTL = (60 * 60) & 1000;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'username is required' },
      { status: 400 }
    );
  }

  const cached = cache[username];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({ data: cached.data, cache: true });
  }

  try {
    const res = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${encodeURIComponent(
        username
      )}`
    );

    if (!res.ok) {
      throw new Error(`Duolingo API error: ${res.status}`);
    }

    const data = await res.json();

    cache[username] = { data, timestamp: Date.now() };

    return NextResponse.json({ data, cached: false });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
