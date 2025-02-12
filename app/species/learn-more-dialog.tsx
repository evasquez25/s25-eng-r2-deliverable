"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type SpeciesWithProfile = Database["public"]["Tables"]["species"]["Row"] & {
  profiles: {
    display_name: string;
    email: string;
  } | null;
};

export default function LearnMoreDialog({ species }: { species: SpeciesWithProfile }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{species.scientific_name}</DialogTitle>
            {species.endangered && (
              <Badge variant="destructive" className="ml-2">
                Endangered
              </Badge>
            )}
          </div>
          {species.common_name && (
            <DialogDescription className="text-lg font-light italic">{species.common_name}</DialogDescription>
          )}
        </DialogHeader>
        <div className="grid gap-6">
          {/* Image Section */}
          {species.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={species.image}
                alt={species.scientific_name}
                fill
                className="object-cover"
                sizes="(max-width: 600px) 100vw, 600px"
              />
            </div>
          )}

          {/* Author Section */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Added by {species.profiles?.display_name ?? "Unknown"}</span>
          </div>

          {/* Description Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground">{species.description}</p>
          </div>

          {/* Kingdom Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kingdom</h3>
            <p className="text-sm capitalize text-muted-foreground">{species.kingdom}</p>
          </div>

          {/* Population Section */}
          {species.total_population !== null && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Total Population</h3>
              <p className="text-sm text-muted-foreground">{species.total_population.toLocaleString()}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
