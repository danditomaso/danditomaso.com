import { cn } from '@/util/style'
import NextLink from 'next/link'

type LinkProps = {
  href: string
  children: React.ReactNode
  className?: string
  target?: "_blank"
}

export default function Link({ href, children, target, className }: LinkProps) {
  return (
    <NextLink

      href={href}
      rel="noopener noreferrer"
      target={target ? "_blank" : undefined}
      className={cn(
        "p-6 -m-6 duration-200 text-slate-400 hover:text-slate-100", className,

      )}
    >
      {children}
    </NextLink>
  )
}