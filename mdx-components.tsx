import React, { ComponentPropsWithoutRef } from 'react';
import { Link } from 'next-view-transitions';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    // <h1 className="fluid-4xl font-bold tracking-tight" {...props} />
    <h1 className="mt-10 fluid-3xl font-bold tracking-tighter" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="mt-8 pb-1 fluid-2xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />
  ),
  h4: (props: HeadingProps) => <h4 className="mt-8 text-xl font-semibold tracking-tight" {...props} />,
  p: (props: ParagraphProps) => (
    <p className="fluid-base mt-4 text-slate-800 [&:not(:first-child)]:mt-6"{...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="my-6 ml-6 list-decimal"{...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-gray-800 list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="mt-2" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-blue-500 hover:text-blue-700 font-medium underline underline-offset-4';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="mt-6 border-l-2 border-300 pl-6 italic text-800 [&>*]:text-600" {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}