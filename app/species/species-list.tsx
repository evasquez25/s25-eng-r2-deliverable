"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { useState } from "react";
import type { SpeciesWithProfile } from "./page";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";
import { Search } from "lucide-react";

export default function SpeciesList({
  initialSpecies,
  userId,
}: {
  initialSpecies: SpeciesWithProfile[];
  userId: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter species based on search query
  const filteredSpecies = initialSpecies.filter((species) => {
    const query = searchQuery.toLowerCase();
    return (
      species.scientific_name.toLowerCase().includes(query) ||
      (species.common_name?.toLowerCase() ?? "").includes(query) ||
      (species.description?.toLowerCase() ?? "").includes(query)
    );
  });

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search species..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <AddSpeciesDialog userId={userId} />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {filteredSpecies.map((species) => (
          <SpeciesCard key={species.id} species={species} sessionId={userId} />
        ))}
      </div>
      {filteredSpecies.length === 0 && (
        <p className="text-center text-muted-foreground">No species found matching your search.</p>
      )}
    </>
  );
}
