import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dadtwfzcfnpmqfgcixry.supabase.co";

/**
 *  POST /api/newsletter
 */
export async function onRequestPost({ env, request }) {
  const supabaseKey = env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const data = await request.json();
  const { email, interested_roadmap } = data;

  const { error, _ } = await supabase
    .from("emails")
    .insert({ email, interested_roadmap });

  if (error) {
    return new Response("Error", { status: 500 });
  }

  return new Response();
}
