import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { exportToCSV } from '@/lib/utils';

export default async function RecentLinks() {
  const { data } = await supabase
    .from('utms')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Links</h2>
        <Button variant="outline" onClick={exportToCSV(data)}>
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        {data?.map((item) => (
          <div key={item.id} className="p-3 border rounded-lg">
            <p className="text-sm break-all">{item.utm}</p>
            <Button 
              variant="link" 
              size="sm" 
              className="mt-1 p-0 h-auto"
              onClick={() => navigator.clipboard.writeText(item.utm)}
            >
              Copy
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}