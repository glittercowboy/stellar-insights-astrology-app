"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { BirthData, astrologyApi } from "@/lib/api";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  birthDate: z.string({
    required_error: "A birth date is required.",
  }),
  birthTime: z.string().optional(),
  birthCity: z.string().min(2, {
    message: "Birth city must be at least 2 characters.",
  }),
  birthCountry: z.string().min(2, {
    message: "Birth country must be at least 2 characters.",
  }),
});

export function BirthChartForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      birthDate: format(new Date(), "yyyy-MM-dd"),
      birthTime: "",
      birthCity: "",
      birthCountry: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      // Format the data for the API
      const birthData: BirthData = {
        name: values.name,
        birth_date: values.birthDate,
        birth_time: values.birthTime || undefined,
        birth_city: values.birthCity,
        birth_country: values.birthCountry,
      };

      // Store form data in session storage for the results page
      sessionStorage.setItem('birthData', JSON.stringify(birthData));
      
      // In development mode, we'll just redirect to the results page
      // In production, we would call the API directly here
      if (process.env.NODE_ENV === 'production') {
        // Generate chart and reading before navigating
        await astrologyApi.generateFullAnalysis(birthData);
      }
      
      // Navigate to results page
      router.push(`/chart/results?name=${encodeURIComponent(values.name)}`);
    } catch (err: any) {
      console.error("Error submitting form:", err);
      setError(err.response?.data?.detail || "An error occurred while generating your chart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                This is how you'll be addressed in your reading.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Time (if known)</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormDescription>
                Birth time allows for more accurate house placements.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthCity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth City</FormLabel>
              <FormControl>
                <Input placeholder="City of birth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthCountry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Country</FormLabel>
              <FormControl>
                <Input placeholder="Country of birth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Calculating..." : "Generate Chart"}
        </Button>
      </form>
    </Form>
  );
}
