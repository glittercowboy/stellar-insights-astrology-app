"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlanetPositions } from "@/components/PlanetPositions";
import { AspectChart } from "@/components/AspectChart";

interface Planet {
  name: string;
  sign: string;
  degrees: number;
  house?: number;
  retrograde: boolean;
}

interface Aspect {
  planet1: string;
  planet2: string;
  aspect: string;
  orb: number;
}

interface ChartDetailsProps {
  planets: Planet[];
  aspects?: Aspect[];
  houses?: any[];
}

export function ChartDetails({ planets, aspects = [], houses = [] }: ChartDetailsProps) {
  return (
    <Tabs defaultValue="planets">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="planets">Planets</TabsTrigger>
        <TabsTrigger value="aspects">Aspects</TabsTrigger>
      </TabsList>
      <TabsContent value="planets" className="pt-4">
        <PlanetPositions planets={planets} />
      </TabsContent>
      <TabsContent value="aspects" className="pt-4">
        <AspectChart aspects={aspects} />
      </TabsContent>
    </Tabs>
  );
}
