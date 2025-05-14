'use server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';

const schema = z.object({
  url: z.string().url(),
  source: z.string().min(1),
  medium: z.string().min(1),
  campaign: z.string().min(1),
  shortener: z.boolean().default(false),
});

export async function createUTM(prevState: any, formData: FormData) {
  const rawData = {
    url: formData.get('url'),
    source: formData.get('source'),
    medium: formData.get('medium'),
    campaign: formData.get('campaign'),
    shortener: formData.get('shortener') === 'on',
  };

  // Validate input
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  // Build UTM
  const { url, source, medium, campaign, shortener } = result.data;
  const utm = new URL(url);
  utm.searchParams.set('utm_source', source);
  utm.searchParams.set('utm_medium', medium);
  utm.searchParams.set('utm_campaign', campaign);

  // Shorten (if enabled)
  let finalUrl = utm.toString();
  if (shortener) {
    try {
      const service = shortener ? 'spoo' : 'publicapi';
      const res = await fetch(`https://publicapi.dev/api/${service}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      });
      const data = await res.json();
      finalUrl = data.short_url || finalUrl;
    } catch (error) {
      console.error('Shortening failed:', error);
    }
  }

  // Save to DB
  await supabase.from('utms').insert({
    url,
    source,
    medium,
    campaign,
    utm: finalUrl,
  });

  return { utm: finalUrl };
}