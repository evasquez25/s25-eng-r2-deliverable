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
import Image from "next/image";
import { useState } from "react";

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function LearnMoreDialog({ species }: { species: Species }) {
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

          {/* Details Section */}
          <div className="grid gap-4">
            <div>
              <h4 className="text-sm font-medium">Kingdom</h4>
              <p className="text-sm text-muted-foreground">{species.kingdom}</p>
            </div>
            {species.total_population !== null && (
              <div>
                <h4 className="text-sm font-medium">Total Population</h4>
                <p className="text-sm text-muted-foreground">{species.total_population.toLocaleString()}</p>
              </div>
            )}
            {species.description && (
              <div>
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{species.description}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
