"use client";
/*
Note: "use client" is a Next.js App Router directive that tells React to render the component as
a client component rather than a server component. This establishes the server-client boundary,
providing access to client-side functionality such as hooks and event handlers to this component and
any of its imported children. Although the SpeciesCard component itself does not use any client-side
functionality, it is beneficial to move it to the client because it is rendered in a list with a unique
key prop in species/page.tsx. When multiple component instances are rendered from a list, React uses the unique key prop
on the client-side to correctly match component state and props should the order of the list ever change.
React server components don't track state between rerenders, so leaving the uniquely identified components (e.g. SpeciesCard)
can cause errors with matching props and state in child components if the list order changes.
*/
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import EditSpeciesDialog from "./edit-species-dialog";
import LearnMoreDialog from "./learn-more-dialog";

type SpeciesWithProfile = Database["public"]["Tables"]["species"]["Row"] & {
  profiles: {
    display_name: string;
    email: string;
  } | null;
};

export default function SpeciesCard({ species, sessionId }: { species: SpeciesWithProfile; sessionId: string }) {
  return (
    <div className="m-4 flex w-72 flex-col rounded-lg border p-5">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="mt-3 text-2xl font-semibold">{species.scientific_name}</h3>
        {species.endangered && (
          <Badge variant="destructive" className="ml-2">
            Endangered
          </Badge>
        )}
      </div>
      <h4 className="text-lg font-light italic">{species.common_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>
      <LearnMoreDialog species={species} />
      <EditSpeciesDialog userId={sessionId} species={species} />
    </div>
  );
}
