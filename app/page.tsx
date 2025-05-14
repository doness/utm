// app/page.tsx (Modern client-server separation)
'use client';
import { useFormState } from 'react-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createUTM } from './actions';
import RecentLinks from './recent-links';

export default function Page() {
  const [state, formAction] = useFormState(createUTM, null);

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">UTM Generator</h1>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="url">Destination URL*</Label>
                <Input 
                  id="url" 
                  name="url" 
                  placeholder="https://example.com" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Source*</Label>
                <Input 
                  id="source" 
                  name="source" 
                  placeholder="google" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medium">Medium*</Label>
                <Input 
                  id="medium" 
                  name="medium" 
                  placeholder="cpc" 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign">Campaign*</Label>
                <Input 
                  id="campaign" 
                  name="campaign" 
                  placeholder="summer_sale" 
                  required 
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="shortener" name="shortener" />
              <Label htmlFor="shortener">Use spoo.me (instead of publicapi.dev)</Label>
            </div>

            <Button type="submit">Generate UTM</Button>
          </form>

          {state?.utm && (
            <div className="mt-4 p-4 bg-muted rounded-lg break-all">
              <p className="font-medium">Generated URL:</p>
              <p className="my-2">{state.utm}</p>
              <Button 
                variant="outline" 
                onClick={() => navigator.clipboard.writeText(state.utm)}
              >
                Copy
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <RecentLinks />
    </main>
  );
}