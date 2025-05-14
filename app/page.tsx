'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Papa from 'papaparse';

export default function Home() {
  const [form, setForm] = useState({ url: '', source: '', medium: '', campaign: '' });
  const [result, setResult] = useState('');
  const [recent, setRecent] = useState<any[]>([]);
  const [useSpoo, setUseSpoo] = useState(false);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await fetch('/api/create-utm', {
      method: 'POST',
      body: JSON.stringify({ ...form, shortener: useSpoo ? 'spoo' : 'publicapi' }),
    });
    const data = await res.json();
    setResult(data.utm);
    fetchRecent();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
  };

  const handleEdit = (item: any) => {
    setForm({ url: item.url, source: item.source, medium: item.medium, campaign: item.campaign });
    setResult(item.utm);
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(recent);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'utm_links.csv';
    link.click();
  };

  const fetchRecent = async () => {
    const res = await fetch('/api/recent');
    const data = await res.json();
    setRecent(data.links);
  };

  useEffect(() => {
    fetchRecent();
  }, []);

  return (
    <main className="max-w-xl mx-auto py-10 space-y-6">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <Label>URL</Label>
            <Input name="url" value={form.url} onChange={handleChange} placeholder="https://example.com" />
          </div>
          <div>
            <Label>Source</Label>
            <Input name="source" value={form.source} onChange={handleChange} placeholder="google" />
          </div>
          <div>
            <Label>Medium</Label>
            <Input name="medium" value={form.medium} onChange={handleChange} placeholder="cpc" />
          </div>
          <div>
            <Label>Campaign</Label>
            <Input name="campaign" value={form.campaign} onChange={handleChange} placeholder="summer_sale" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch checked={useSpoo} onCheckedChange={setUseSpoo} />
            <Label>{useSpoo ? 'Using spoo.me' : 'Using publicapi.dev'}</Label>
          </div>

          <Button onClick={handleSubmit}>Generate UTM</Button>
          {result && (
            <div className="mt-4 break-all text-sm text-green-600 space-y-2">
              <div>Result: {result}</div>
              <Button variant="outline" size="sm" onClick={handleCopy}>Copy</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Recent UTM Links</h3>
            <Button variant="outline" size="sm" onClick={handleExportCSV}>Export CSV</Button>
          </div>
          {recent.map((item, i) => (
            <div key={i} className="text-sm break-all text-gray-700 space-y-1">
              <div>{item.utm}</div>
              <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>Edit</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}