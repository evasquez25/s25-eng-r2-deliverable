import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function UsersList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // only users who are signed in can view this route
    redirect("/");
  }

  const { data: profiles } = await supabase.from("profiles").select("*");

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Users</TypographyH2>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles?.map((profile) => (
          <Card key={profile.id}>
            <CardHeader className="flex flex-row items-center gap-2">
              <User className="h-8 w-8" />
              <div>
                <CardTitle>{profile.display_name}</CardTitle>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
            </CardHeader>
            {profile.biography && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{profile.biography}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}
