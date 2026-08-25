import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import profileAsset from "@/assets/adeel-profile.png.asset.json";
import { getProjects, type Project } from "@/lib/projects.functions";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adeel Ala — Full-Stack Developer & CS Student" },
      {
        name: "description",
        content:
          "Adeel Ala is a Computer Science student and full-stack developer building modern web applications, with a strong foundation in data structures and algorithms.",
      },
      { property: "og:title", content: "Adeel Ala — Full-Stack Developer & CS Student" },
      {
        property: "og:description",
        content:
          "Computer Science student and full-stack developer building modern web applications with a strong DSA foundation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

const GITHUB_URL = "https://github.com/adeelfab";
const EMAIL = "adeelfab@gmail.com";

function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return active;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header({
  active,
  menuOpen,
  setMenuOpen,
}: {
  active: string;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="font-display text-lg font-bold tracking-tight text-foreground">
          AA<span className="text-primary">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${EMAIL}`}
          className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
        >
          Let's talk
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="space-y-1.5">
            <span
              className={cn(
                "block h-0.5 w-5 bg-current transition-transform",
                menuOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn("block h-0.5 w-5 bg-current transition-opacity", menuOpen && "opacity-0")}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-current transition-transform",
                menuOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-3 text-sm font-medium transition-colors",
                    active === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => setMenuOpen(false)}
                className="mt-1 block rounded-md bg-primary px-3 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Let's talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent opacity-50 blur-3xl"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-[1.3fr_1fr] md:py-28">
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              Available for internships & freelance
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Adeel Ala
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-3 font-display text-xl font-semibold text-primary sm:text-2xl">
              Full-Stack Developer & CS Student
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I'm a Computer Science student building modern web applications, with a
              strong foundation in data structures and algorithms.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Get in Touch
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent to-transparent" />
            <img
              src={profileAsset.url}
              alt="Portrait of Adeel Ala"
              width={420}
              height={560}
              loading="eager"
              className="relative h-[22rem] w-[18rem] rounded-[1.75rem] border border-border object-cover shadow-xl shadow-foreground/10 sm:h-[26rem] sm:w-[21rem]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={60}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {blurb && (
        <Reveal delay={120}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{blurb}</p>
        </Reveal>
      )}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About"
          title="A bit about me"
          blurb="I'm a Computer Science student focused on building practical, well-engineered web applications — while continually sharpening my data structures and algorithms fundamentals."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal as="div" className="md:col-span-2">
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <h3 className="font-display text-lg font-semibold text-foreground">Education</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                B.Tech in Computer Science
              </p>
              <p className="text-sm text-muted-foreground">
                Government Engineering College, Siwan
              </p>
              <p className="mt-2 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                Expected graduation: 2027
              </p>

              <h3 className="mt-7 font-display text-lg font-semibold text-foreground">
                What I do
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {[
                  "Full-stack web development, end to end",
                  "Data structures & algorithms problem-solving",
                  "Clean, maintainable, well-tested code",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal as="div" delay={80} className="grid grid-cols-2 gap-6 md:grid-cols-1">
            <Stat value="2027" label="Graduation year" />
            <Stat value="Full-stack" label="Development focus" />
            <Stat value="DSA" label="Core strength" />
            <Stat value="Open source" label="On GitHub" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center md:text-left">
      <p className="font-display text-2xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

const SKILLS = {
  web: [
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "REST APIs",
    "PostgreSQL",
    "Git & GitHub",
  ],
  cs: [
    "Data Structures",
    "Algorithms",
    "Problem Solving",
    "Complexity Analysis",
    "Competitive Programming",
  ],
} as const;

function Skills() {
  return (
    <section id="skills" className="border-t border-border/60 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          blurb="A balance of applied full-stack web development and core computer science fundamentals."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal as="div">
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <h3 className="font-display text-lg font-semibold text-foreground">
                Web Development / Full-Stack
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Frontend, backend, databases & APIs.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SKILLS.web.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal as="div" delay={80}>
            <div className="h-full rounded-2xl border border-border bg-card p-7">
              <h3 className="font-display text-lg font-semibold text-foreground">
                CS Foundations
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Strong fundamentals behind the code.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {SKILLS.cs.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  return (
    <section id="projects" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          blurb="A selection of my work from GitHub. Visit my profile to explore everything."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading || !projects
            ? Array.from({ length: 3 }).map((_, i) => <ProjectCardSkeleton key={i} />)
            : projects.map((p, i) => (
                <Reveal as="article" key={p.url} delay={(i % 3) * 70}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            View all on GitHub
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-foreground/5">
      <div className="flex items-center justify-between">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
          className="font-display text-base font-semibold text-foreground group-hover:text-primary"
        >
          {project.name}
        </a>
        {project.stars > 0 && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            ★ {project.stars}
          </span>
        )}
      </div>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.description ?? "A project from my GitHub — click through for details."}
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        {project.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
            {project.language}
          </span>
        )}
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-auto font-medium text-primary hover:underline"
          >
            Live demo ↗
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="h-44 animate-pulse rounded-2xl border border-border bg-card p-6">
      <div className="h-4 w-1/2 rounded bg-muted" />
      <div className="mt-4 h-3 w-full rounded bg-muted" />
      <div className="mt-2 h-3 w-2/3 rounded bg-muted" />
    </div>
  );
}

const EXPERIENCE = [
  {
    date: "September 2026 · Upcoming",
    role: "Internship — Role & company to be confirmed",
    company: "TBD",
    bullets: [
      "Upcoming opportunity — details to be added.",
    ],
    upcoming: true,
  },
  {
    date: "April – June 2026",
    role: "Internship — Role & company to be confirmed",
    company: "TBD",
    bullets: [
      "Hands-on development experience during this period.",
      "Company and responsibilities to be filled in.",
    ],
    upcoming: false,
  },
  {
    date: "June 2025",
    role: "Internship — Role & company to be confirmed",
    company: "TBD",
    bullets: [
      "First industry exposure building practical software.",
      "Company and responsibilities to be filled in.",
    ],
    upcoming: false,
  },
] as const;

function Experience() {
  return (
    <section id="experience" className="border-t border-border/60 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="My journey so far"
          blurb="Internships and work experience — a few details are still being filled in."
        />

        <ol className="mt-12 space-y-8">
          {EXPERIENCE.map((item, i) => (
            <Reveal as="li" key={item.date} delay={i * 70}>
              <div className="relative grid gap-4 sm:grid-cols-[180px_1fr] sm:gap-8">
                <p className="font-display text-sm font-semibold text-primary">{item.date}</p>
                <div className="relative rounded-2xl border border-border bg-card p-6">
                  <span
                    aria-hidden
                    className="absolute -left-[1.55rem] top-7 hidden h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background sm:block"
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {item.role}
                    </h3>
                    {item.upcoming && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{item.company}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="border-t border-border/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect"
          blurb="Have a project, role, or idea in mind? I'd love to hear from you."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal as="div">
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-7">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  ✉
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Email
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-primary">
                    {EMAIL}
                  </span>
                </span>
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  ⌥
                </span>
                <span>
                  <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    GitHub
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-primary">
                    github.com/adeelfab
                  </span>
                </span>
              </a>

              <p className="mt-auto text-sm text-muted-foreground">
                Based in India · Open to remote opportunities
              </p>
            </div>
          </Reveal>

          <Reveal as="div" delay={80}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const name = String(data.get("name") ?? "");
                const email = String(data.get("email") ?? "");
                const message = String(data.get("message") ?? "");
                window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
                  `Portfolio message from ${name || "a visitor"}`
                )}&body=${encodeURIComponent(`${email ? `From: ${email}\n\n` : ""}${message}`)}`;
                setSent(true);
              }}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@example.com" />
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project or opportunity…"
                  className="w-full resize-none rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <button
                type="submit"
                className="mt-auto inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {sent ? "Opening your email app…" : "Send message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row sm:px-8">
        <p className="font-display text-sm font-semibold text-foreground">
          Adeel Ala<span className="text-primary">.</span>
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Adeel Ala. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm">
          <a href={`mailto:${EMAIL}`} className="font-medium text-muted-foreground hover:text-primary">
            Email
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-muted-foreground hover:text-primary"
          >
            GitHub
          </a>
          <a href="#home" className="font-medium text-muted-foreground hover:text-primary">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
