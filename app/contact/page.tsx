import { FaEnvelope, FaGithub, FaTwitter } from "react-icons/fa";
import { Navigation } from "../components/nav";
import { Socials } from "../components/socials";

export const socials = [
  {
    icon: <FaTwitter size={20} />,
    href: "https://twitter.com/danditomaso",
    label: "Twitter",
    handle: "@danditomaso",
  },
  {
    icon: <FaEnvelope size={20} />,
    href: "mailto:hi@danditomaso.com?subject=Inquiry From Website",
    label: "Email",
    handle: "hi@danditomaso.com",
  },
  {
    icon: <FaGithub size={20} />,
    href: "https://github.com/danditomaso",
    label: "Github",
    handle: "danditomaso",
  },
];

export default async function ContactPage() {
  return (
    <div className="bg-gradient-to-tl from-slate-900/0 via-slate-900 to-slate-900/0">
      <Navigation />
      <div className="max-w-7xl flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
        <Socials />
      </div>
    </div>
  );
}
