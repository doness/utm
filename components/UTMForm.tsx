"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { getOrCreateUserId } from "@/lib/userTracking";

const formSchema = z.object({
  url: z.string().url(),
  source: z.string().optional(),
  medium: z.string().optional(),
  campaign: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function UTMForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      source: "",
      medium: "",
      campaign: "",
    },
  });

  async function onSubmit(values: FormData) {
    setLoading(true);

    const utmParams = new URLSearchParams();
    if (values.source) utmParams.append("utm_source", values.source);
    if (values.medium) utmParams.append("utm_medium", values.medium);
    if (values.campaign) utmParams.append("utm_campaign", values.campaign);

    const utmLink = `${values.url}?${utmParams.toString()}`;

    const { error } = await supabase
      .from("utms")
      .insert([
        {
          ...values,
          utm: utmLink,
          user_id: userId,
        },
      ]);

    if (error) {
      toast({ title: "Error", description: "Failed to save UTM link.", variant: "destructive" });
    } else {
      toast({ title: "Success!", description: "UTM link created." });
      form.reset();
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source (utm_source)</FormLabel>
                <FormControl>
                  <Input placeholder="google" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medium"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medium (utm_medium)</FormLabel>
                <FormControl>
                  <Input placeholder="cpc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="campaign"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign (utm_campaign)</FormLabel>
                <FormControl>
                  <Input placeholder="summer_sale" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate UTM Link"}
          </Button>
        </form>
      </Form>
    </div>
  );
}