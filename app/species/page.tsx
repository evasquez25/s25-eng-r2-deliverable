import { createServerSupabaseClient } from "@/lib/server-utils";
import type { Database } from "@/lib/schema";
import { redirect } from "next/navigation";
import SpeciesList from "./species-list";

export type SpeciesWithProfile = Database["public"]["Tables"]["species"]["Row"] & {
  profiles: {
    display_name: string;
    email: string;
  } | null;
};

export default async function SpeciesPage() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // Obtain the ID of the currently signed-in user
  const sessionId = session.user.id;

  const { data: species } = await supabase
    .from("species")
    .select(`
      *,
      profiles:author (
        display_name,
        email
      )
    `)
    .order("id", { ascending: false }) as { data: SpeciesWithProfile[] | null };

  // If no species found, pass empty array to avoid null checks in client component
  return <SpeciesList initialSpecies={species ?? []} userId={sessionId} />;
}
