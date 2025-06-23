import { Navigation } from "../components/nav";
import { Socials } from "../components/socials";

export default async function ContactPage() {
  return (
    <div className="bg-linear-to-tl from-slate-900/0 via-slate-900 to-slate-900/0">
      <Navigation />
      <div className="max-w-7xl flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
        <Socials />
      </div>
    </div>
  );
}
