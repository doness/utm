import { supabase } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data } = await supabase
    .from('utms')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return NextResponse.json({ links: data });
}