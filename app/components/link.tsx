import { cn } from "@/util/style";
// import NextLink from "next/link";
import { Link } from 'next-view-transitions'
import NextLink from "next/link";
import { ComponentPropsWithoutRef } from "react";

type LinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"a">;

export default function _Link({ href, children, className }: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      className={cn("duration-200 text-slate-400 hover:text-slate-100", className)}
    >
      {children}
    </Link>
  );
}
