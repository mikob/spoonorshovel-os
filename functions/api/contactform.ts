import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dadtwfzcfnpmqfgcixry.supabase.co";

/**
 *  POST /api/newsletter
 */
export async function onRequestPost({ env, request }) {
  const supabaseKey = env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const data = await request.json();
  const { firstname, lastname, email, phone, subject, message } = data;

  const { error, _ } = await supabase
    .from("contactform")
    .insert({ firstname, lastname, email, phone, subject, message });

  if (error) {
    console.log("error", error.message);
    return new Response("Error", { status: 500 });
  }

  return new Response();
}
