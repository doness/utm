import { useEffect, useState } from "react";
import { UTMForm } from "@/components/UTMForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface UTM {
  id: string;
  url: string;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  utm: string;
  created_at: string;
}

export default function Home() {
  const [utms, setUtms] = useState<UTM[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/utms")
      .then((res) => res.json())
      .then(setUtms)
      .catch(console.error);
  }, []);

  const filteredUtms = utms.filter(
    (utm) =>
      utm.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (utm.source && utm.source.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (utm.medium && utm.medium.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (utm.campaign && utm.campaign.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">UTM Creator</h1>

      <UTMForm />

      <div className="mt-6">
        <Input
          placeholder="Search by URL, source, medium, or campaign"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent UTMs</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {filteredUtms.length > 0 ? (
              filteredUtms.map((utm) => (
                <li key={utm.id} className="border p-4 rounded-md">
                  <p><strong>URL:</strong> <Link href={utm.utm} target="_blank" className="text-blue-500">{utm.utm}</Link></p>
                  <p><strong>Created:</strong> {new Date(utm.created_at).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p>No matching UTMs found.</p>
            )}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}