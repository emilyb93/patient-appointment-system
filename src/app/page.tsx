import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the /patients page
  redirect("/patients");
}
