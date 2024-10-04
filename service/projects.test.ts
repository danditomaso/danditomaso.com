import { describe, it, expect } from 'vitest';
import { categorizeProjects } from './projects'; // adjust path to your function
import type { Project } from "@/.content-collections/generated";

// Mock data
const projects: Project[] = [
  {
    mdx: "content1", slug: "proj-1", contentType: "project", content: "content",
    title: "Project 1", description: "First project", tech: ["React", "TypeScript"],
    published: true, date: '2023-09-01', display: 'featured', url: "http://example.com",
    repository: "http://repo.com", _meta: { directory: '', extension: '', fileName: '', filePath: '', path: '' }
  },
  {
    mdx: "content2", slug: "proj-2", contentType: "project", content: "content",
    title: "Project 2", description: "Second project", tech: ["Vue", "JavaScript"],
    published: true, date: '2023-08-01', display: 'top2', url: "http://example2.com",
    repository: "http://repo2.com", _meta: { directory: '', extension: '', fileName: '', filePath: '', path: '' }

  },
  {
    mdx: "content3", slug: "proj-3", contentType: "project", content: "content",
    title: "Project 3", description: "Third project", tech: ["Svelte", "TypeScript"],
    published: false, date: '2023-07-01', url: "http://example3.com",
    repository: "http://repo3.com", _meta: { directory: '', extension: '', fileName: '', filePath: '', path: '' }
  },
  {
    mdx: "content4", slug: "proj-4", contentType: "project", content: "content",
    title: "Project 4", description: "Fourth project", tech: ["Angular", "TypeScript"],
    published: true, date: '2023-07-01', url: "http://example4.com",
    repository: "http://repo4.com", _meta: { directory: '', extension: '', fileName: '', filePath: '', path: '' }

  },
  {
    mdx: "content5", slug: "proj-5", contentType: "project", content: "content",
    title: "Project 5", description: "Fifth project", tech: ["React", "JavaScript"],
    published: true, date: '2023-09-02', display: 'top3', url: "http://example5.com",
    repository: "http://repo5.com", _meta: { directory: '', extension: '', fileName: '', filePath: '', path: '' }

  },
];

describe('categorizeProjects', () => {
  it('filters out unpublished projects', () => {
    const result = categorizeProjects(projects);
    expect(result.length).toBe(4); // Only 4 published projects
    expect(result.every(p => p.published)).toBe(true);
  });

  it('sorts projects by date in descending order', () => {
    const result = categorizeProjects(projects);
    expect(result[0].date).toBe('2023-09-01'); // Latest date
    expect(result[1].date).toBe('2023-08-01');
    expect(result[2].date).toBe('2023-09-02');
  });

  it('sorts projects with the same date by display priority', () => {
    const sameDateProjects: Project[] = [
      {
        mdx: "content1", slug: "proj-1", contentType: "project", content: "content",
        title: "Project 1", description: "Same date test 1", tech: ["React"],
        published: true, date: '2023-09-01', display: 'top2', _meta: { directory: '', extension: '', fileName: '', filePath: '', path: '' }
      },
      {
        mdx: "content2", slug: "proj-2", contentType: "project", content: "content",
        title: "Project 2", description: "Same date test 2", tech: ["Vue"],
        published: true, date: '2023-09-01', display: 'featured', _meta: { directory: '', extension: '', fileName: '', filePath: '', path: '' }
      },
      {
        mdx: "content3", slug: "proj-3", contentType: "project", content: "content",
        title: "Project 3", description: "Same date test 3", tech: ["Svelte"],
        published: true, date: '2023-09-01', display: 'top3', _meta: { directory: '', extension: '', fileName: '', filePath: '', path: '' }
      }
    ];

    const result = categorizeProjects(sameDateProjects);
    expect(result[0].display).toBe('featured'); // Highest priority
    expect(result[1].display).toBe('top2');
    expect(result[2].display).toBe('top3');
  });

  it('returns an empty array when input is null or undefined', () => {
    expect(categorizeProjects(null as any)).toEqual([]);
    expect(categorizeProjects(undefined as any)).toEqual([]);
  });
});
