import { supabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const { url, source, medium, campaign, shortener } = data;

  const utm = `${url}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;

  let shortUrl = utm;

  try {
    if (shortener === 'publicapi') {
      const res = await fetch('https://publicapi.dev/api/v1/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: utm }),
      });
      const json = await res.json();
      shortUrl = json.short_url || utm;
    } else if (shortener === 'spoo') {
      const res = await fetch('https://publicapi.dev/api/spoo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: utm }),
      });
      const json = await res.json();
      shortUrl = json.short_url || utm;
    }
  } catch (err) {
    console.error('Shorten error:', err);
  }

  await supabase.from('utms').insert([{ url, source, medium, campaign, utm: shortUrl }]);

  return NextResponse.json({ utm: shortUrl });
}