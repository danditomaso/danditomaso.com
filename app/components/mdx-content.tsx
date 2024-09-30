// @ts-nocheck
import type * as React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from 'clsx';
import { useMDXComponent } from "@content-collections/mdx/react";
import type { ImageProps } from "next/image";

const MdxComponents = {
	h1: ({ className, ...props }) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-slate-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }) => (
		<h4
			className={clsx(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }) => (
		<h5
			className={clsx(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }) => (
		<h6
			className={clsx(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }) => (
		<Link
			className={clsx(
				"font-medium text-slate-900 underline underline-offset-4",
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }) => (
		<p
			className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	ul: ({ className, ...props }) => (
		<ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }) => (
		<ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
	),
	li: ({ className, ...props }) => (
		<li className={clsx("mt-2", className)} {...props} />
	),
	blockquote: ({ className, ...props }) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 [&>*]:text-slate-600",
				className,
			)}
			{...props}
		/>
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
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// biome-ignore lint/a11y/useAltText: alt text prop is present, biome is being a pain.
		<img
			className={clsx("rounded-md border border-slate-200", className)}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }) => (
		<hr className="my-4 border-slate-200 md:my-8" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto">
			<table className={clsx("w-full", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"m-0 border-t border-slate-300 p-0 even:bg-slate-100",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }) => (
		<th
			className={clsx(
				"border border-slate-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }) => (
		<td
			className={clsx(
				"border border-slate-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-lg bg-slate-800 py-4",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }) => (
		<code
			className={clsx(
				"relative rounded bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-slate-200",
				className,
			)}
			{...props}
		/>
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