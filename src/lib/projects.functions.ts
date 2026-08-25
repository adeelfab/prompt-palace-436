import { createServerFn } from "@tanstack/react-start";

export type Project = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
};

// Curated fallback shown if the GitHub API is unreachable or rate-limited.
const FALLBACK: Project[] = [
  {
    name: "adeelfab",
    description: "My personal portfolio — full-stack developer & CS student.",
    url: "https://github.com/adeelfab",
    homepage: null,
    language: "TypeScript",
    stars: 0,
    updatedAt: "2026-08-25T00:00:00Z",
  },
];

export const getProjects = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const res = await fetch(
      "https://api.github.com/users/adeelfab/repos?sort=updated&per_page=30",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "adeel-portfolio",
        },
      }
    );
    if (!res.ok) return FALLBACK;
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return FALLBACK;
    return data
      .filter((r) => typeof r === "object" && r !== null && !(r as { fork?: boolean }).fork)
      .slice(0, 6)
      .map(
        (r): Project => {
          const repo = r as {
            name: string;
            description: string | null;
            html_url: string;
            homepage: string | null;
            language: string | null;
            stargazers_count: number;
            updated_at: string;
          };
          return {
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            homepage: repo.homepage && repo.homepage.length > 0 ? repo.homepage : null,
            language: repo.language,
            stars: repo.stargazers_count ?? 0,
            updatedAt: repo.updated_at,
          };
        }
      );
  } catch {
    return FALLBACK;
  }
});
