import { useMDXComponent } from "@content-collections/mdx/react";
import clsx from "clsx";
import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "../components/link";
import React from "react";
import type { ComponentPropsWithoutRef, DetailedHTMLProps, HTMLAttributeAnchorTarget } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

const MdxComponents = {
  h1: (props: HeadingProps) => <h1 className="font-medium pt-12 mb-0 fade-in" {...props} />,
  h2: (props: HeadingProps) => <h2 className="text-gray-800 font-medium mt-8 mb-3" {...props} />,
  h3: (props: HeadingProps) => <h3 className="text-gray-800 font-medium mt-8 mb-3" {...props} />,
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => <p className="text-gray-800 leading-snug" {...props} />,
  ol: (props: ListProps) => <ol className="text-gray-800 list-decimal pl-5 space-y-2" {...props} />,
  ul: (props: ListProps) => <ul className="text-gray-800 list-disc pl-5 space-y-1" {...props} />,
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => <em className="font-medium" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "text-blue-500 hover:text-blue-700";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} rel="noopener noreferrer" className={className} {...props}>
        {children}
      </a>
    );
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700" {...props} />
  ),
  Image: (props: ImageProps) =>
    props.width || props.fill ? (
      <Image
        {...props}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+e1bKQAJMQNc5W2CQwAAAABJRU5ErkJggg=="
      />
    ) : (
      <Image
        {...props}
        placeholder="blur"
        width={1920}
        height={1080}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+e1bKQAJMQNc5W2CQwAAAABJRU5ErkJggg=="
      />
    ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // biome-ignore lint/a11y/useAltText: alt text prop is present, biome is being a pain.
    <img className={clsx("rounded-md border border-slate-200", className)} alt={alt} {...props} />
  ),
};

interface MDXProps {
  code: string;
}

export function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code);
  return (
    <Component
      components={{
        ...MdxComponents,
      }}
    />
  );
}
