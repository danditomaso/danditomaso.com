import { cn } from "@/util/style";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type LinkProps = {
  href: string;
  children?: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"a">;

export default function _Link({
  href,
  children,
  className,
  ...props
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <NextLink
      href={href}
      rel="noopener noreferrer"
      className={cn("duration-200 text-slate-400 hover:text-slate-100", className)}
      {...props}
    >
      {children}
    </NextLink>
  );
}
