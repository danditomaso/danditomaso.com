import type { MDXComponents } from "mdx/types";
import { Link } from "next-view-transitions";
import React, { type ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;

export const components = {
  h1: (props: HeadingProps) => (
    <h1 className="mt-10 fluid-3xl font-bold tracking-tighter font-display" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="mt-8 fluid-2xl font-semibold tracking-tight font-display first:mt-0"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight font-display" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="mt-8 text-xl font-semibold tracking-tight font-display" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="fluid-base mt-4 text-slate-900 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ol: (props: ListProps) => <ol className="my-6 ml-6 list-decimal" {...props} />,
  ul: (props: ListProps) => <ul className="text-gray-800 list-disc pl-5 space-y-1" {...props} />,
  li: (props: ListItemProps) => <li className="mt-2" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => <em className="font-medium" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = "text-blue-500 hover:text-blue-700 font-medium underline underline-offset-4";
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
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
        {children}
      </a>
    );
  },
  // Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
  //   <table>
  //     <thead>
  //       <tr>
  //         {data.headers.map((header, index) => (
  //           <th key={index}>{header}</th>
  //         ))}
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {data.rows.map((row, index) => (
  //         <tr key={index}>
  //           {row.map((cell, cellIndex) => (
  //             <td key={cellIndex}>{cell}</td>
  //           ))}
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="mt-6 border-l-2 border-300 pl-6 italic text-800 [&>*]:text-600"
      {...props}
    />
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
