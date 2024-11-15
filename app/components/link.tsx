import { cn } from "@/util/style";
// import NextLink from "next/link";
import { Link } from 'next-view-transitions'
import NextLink from "next/link";

type LinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
  target?: "_blank";
};

export default function _Link({ href, children, target, className }: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target={target ? "_blank" : undefined}
      className={cn("duration-200 text-slate-400 hover:text-slate-100", className)}
    >
      {children}
    </Link>
  );
}
