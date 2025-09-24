import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Gamepad2, ExternalLink, Sun, Moon, Play,FileText,Smartphone  } from "lucide-react";

/** -------------------------------------------------------
 *  DATA: pulled from your resume + site controls
 *  ---------------------------------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "positions", label: "Positions" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

// Only show Code/Live/Video/etc. buttons if you set links explicitly.
const PROJECTS = [
  {
    title: "GTA IITR (GTA alike campus open-world game)",
    year: "2025",
    summary:
      "Started development of an open-world campus game using Unity, featuring realistic environments, NPCs, and interactive gameplay mechanics. The project aims to create an immersive experience that captures the essence of campus life.",
    tags: ["Unity", "Open-World", "NPCs", "Gameplay"],
    links: {
      github: "",
      live: "",
      // Optional video link (YouTube, Drive preview, or direct .mp4)
      video: "https://drive.google.com/file/d/1ndOyCwEXE5y2W8Scf3x7_-7uWruYQTpY/view?usp=sharing",
      
    }
  },
  {
    title: "XR Creator Hackathon — paintARs (ARtistry)",
    year: "2024",
    summary:
      "Built an innovative AR app called 'paintARs (ARtistry)' during the XR Creator Hackathon. Our team secured a Top-40 ranking across India. The project demonstrated creativity in blending art with AR technology, enabling interactive painting experiences in mixed reality.",
    tags: ["XR", "Hackathon", "AR", "Prototype"],
    links: {
      letter: "/files/Letter of Appreciation - Abhay Kumar Bhorayat - XR Creator Hackathon.pdf",
      presentation: "https://docs.google.com/presentation/d/1YN5YKnqkqaBbyaY6Y9nIFWjF3i_KBKYLPL8XDoiAQEo/edit?slide=id.p4#slide=id.p4",
      github: "",
      live: "",
      // Optional video link (YouTube, Drive preview, or direct .mp4)
      video: "" // e.g., "https://www.youtube.com/watch?v=VIDEO_ID"
    }
  },
  {
    title: "Multiplayer F1 Racing Simulator",
    year: "2024",
    summary:
      "Unity3D multiplayer racer with WebSocket mobile controls, Photon networking, lobby & matchmaking.",
    tags: ["Unity3D", "Photon", "WebSockets", "Multiplayer"],
    links: {
      github: null,
      live: null,
      video: ""
    },
  },
  {
    title: "AR Dragon Simulator",
    year: "2023",
    summary:
      "Created a AR Dragon Simulator using Unity3D and ARCore, featuring realistic dragon animations and interactions in augmented reality.",
    tags: ["Unity3D", "AR"],
    links: { video: "https://drive.google.com/file/d/1ynRMT_0HvYwQ_j3POAv7zMsg0KZc-hwK/view?usp=sharing",apk: "https://drive.google.com/file/d/1fEwzA0Aw-dD31duFy9pOYHFOkAOwUb4I/view?usp=sharing" },
    
  },
  {
    title: "Sequential Assembly & Disassembly Simulator",
    year: "2024",
    summary:
      "Simulator for training on electrical equipment with step-by-step guidance, learning levels, and testing.",
    tags: ["Unity3D", "Simulation", "Training"],
    links: { github: null, live: null, video: "" },
  },
  {
    title: "The Leaf Life — Learning Photosynthesis in VR",
    year: "2024",
    summary:
      "VR experience explaining photosynthesis using sequenced animations, text, and audio for kids.",
    tags: ["Unity3D", "VR", "Education"],
    links: { github: null, live: null, video: "" },
  },
  {
    title: "Laboratory Machines Simulation in AR",
    year: "2023",
    summary:
      "AR app with interactive 3D lab equipment using Unity + ARCore for hands-on exploration.",
    tags: ["Unity", "ARCore", "AR"],
    links: { github: null, live: null, video: "" },
  },
  {
    title: "Metaverse-based 3D VR Lab Tour",
    year: "2023",
    summary:
      "Immersive lab tour built in Unity3D + Oculus SDK with optimized 3D models for smooth navigation.",
    tags: ["Unity3D", "VR", "Oculus"],
    links: { github: null, live: null, video: "https://drive.google.com/file/d/1OLfP_T1vvslNzXEZ2MT79cdpbjbi6gWS/view?usp=sharing" },
  },
  {
    title: "Know IITR (AR Campus App)",
    year: "2023",
    summary:
      "Marker-based AR app using Ready Player Me, Google TTS, OVR LipSync, and Whisper STT.",
    tags: ["Unity", "ARCore", "AR", "TTS/LipSync/STT"],
    links: { github: null, live: null, video: "https://drive.google.com/file/d/1n4St3LQmFaLRbqaoCQnzQ2iFOPpKvhv6/view?usp=sharing", readme:"https://github.com/ariesiitr/Know-IITR/blob/main/README.md" },
  },
];

// Full-time + Internship experience
const EXPERIENCE = [
  {
    role: "Unreal Engine Developer",
    org: "Proqio",
    date: "Apr 2024 – Present",
    bullets: [
      "Built a digital twin in Unreal for real-time client sensor visualization across geo coordinates.",
      "Optimized with profiling, async tasks, soft references, material efficiency, and GPU offload.",
      "Reduced Blueprint size, enabled pixel streaming, and spawned thousands of dynamic sensors at steady FPS.",
      "Integrated JSON-based queries for real-time data ingestion; created runtime tools (sectioning, measure, 3D heatmaps, runtime gizmos).",
    ],
  },
  {
    role: "Unity Developer (Intern)",
    org: "Skillium Labs",
    date: "June 2023 – Sep 2023",
    bullets: [
      "Developed Interactive Learning Platform for Finance Education using Unity3D.",
      "Implemented interactive quizzes, and gamified learning modules.",
    ],
  },
  {
    role: "XR Developer (Intern)",
    org: "CogXr Labs",
    date: "Jan 2023 – Apr 2023",
    bullets: [
      "Developed AR/VR projects in Unity3D and Unreal; collaborated with design/engineering teams.",
      "Used cutting-edge AR/VR stacks for diverse client deliverables.",
    ],
  },
  {
    role: "Unreal Engine Developer (Intern)",
    org: "Machau Games",
    date: "Dec 2022 – Mar 2023",
    bullets: [
      "Worked on an RPG with portals, horse riding, and character interactions.",
      "Implemented/optimized animations and gameplay systems with the team.",
    ],
  },
];

const EDUCATION = [
  { degree: "B.Tech. (Chemical Engineering)", place: "IIT Roorkee", year: "2025", details: ["Latest CGPA: 7.44"] },
  { degree: "Class XII (CBSE)", place: "S R International Academy", year: "2021", details: ["90.80%"] },
  { degree: "Class X (CBSE)", place: "Holy Heights Convent School", year: "2019", details: ["92.20%"] },
];

const SKILLS = {
  languages: ["C++", "C#", "JavaScript", "Python"],
  software: ["Unity", "Unreal Engine", "Godot", "Git"],
  courses: ["Introduction to Augmented Reality (Coursera)",
    "Unreal Engine 5 C++: Advanced Frontend UI Programming"
  ],
  languagesKnown: ["Hindi (SRW)", "English (SRW)"],
};

const POSITIONS = [
  {
    title: "Project Lead - XR Development",
    org: "Tinkering Labs",
    date: "Apr 2024 – Present",
    bullets: [
      "Led XR projects (VR/AR) with Unity/Unreal/ARCore/Vuforia/Oculus SDK.",
      "Mentored juniors in game development.",
    ],
  },
  {
    title: "Member",
    org: "ARIES, IIT Roorkee",
    date: "May 2023 – Present",
    bullets: [
      "Mentored projects like Drone Shooter, AR Basketball, VR Plane Simulator.",
      "Co-built Know-IITR; ran workshops, competitions, GBMs, hackathons.",
    ],
  },
  {
    title: "Organiser",
    org: "TinkerQuest 24",
    date: "Feb 2024 – Mar 2024",
    bullets: [
      "Pan-India 3-week hackathon (PM/Software/Metaverse), 1,170+ registrations.",
      "Raised ~0.2M sponsorships (RedCliff Labs, GMetriXR).",
    ],
  },
  {
    title: "Project Mentor",
    org: "TMI-101",
    date: "Aug 2023 – Nov 2023",
    bullets: [
      "Mentored 24 first-year students building real-life tech projects (Smart Bin, Obstacle Robot, Traffic Controller).",
    ],
  },
  {
    title: "Events Team Member",
    org: "ARP, IIT Roorkee",
    date: "Apr 2022 – Present",
    bullets: [
      "Conducted events, interviews (50+), and operations.",
    ],
  },
  {
    title: "Judge",
    org: "Mystic Pixel (Cognizance ‘24)",
    date: "Mar 2024",
    bullets: ["Organised metaverse game-making competition (150+ registrations)."],
  },
  {
    title: "Judge",
    org: "NanoNavigator (Cognizance ‘24)",
    date: "Mar 2024",
    bullets: ["Judged Micro-mouse competition (50k+ registrations), maintained transparency for 96 teams."],
  },
];

const AWARDS = [{ title: "2nd Position, TinkerQuest, IIT Roorkee", year: "2024" },
  { title: "Finalist - XR Creator Hackathon", year: "2025" }
];

const CONTACT = {
  email: "bhorayatabhay2004@gmail.com",
  phone: "7976347789",
  github: "https://github.com/AbhayK200417", // add your link or leave blank
  linkedin: "https://www.linkedin.com/in/abhay200417/", // add your link or leave blank
};

/** -------------------------------------------------------
 *  THEME + LAYOUT HELPERS
 *  ---------------------------------------------------- */

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

// Full-width container (no max-w clamp); keeps padding so content isn’t stuck to edges
function Container({ children, className = "" }) {
  return <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** -------------------------------------------------------
 *  UI: NAV + HERO
 *  ---------------------------------------------------- */

function NavBar() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 dark:bg-zinc-900/90 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-2 font-semibold">
          <Gamepad2 className="h-5 w-5" /> Abhay • Game Dev
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="hover:opacity-80"
            >
              {n.label}
            </a>
          ))}
          <a href="/resume.pdf" className="rounded-xl border px-3 py-1.5 text-xs font-medium hover:shadow-sm">
            Resume
          </a>
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-xl border p-2 hover:shadow-sm"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900"
    >
      <Container className="min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 items-center gap-10 w-full">
          {/* Left: text */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Game Dev • AR/VR • Tools
            </p>
            <h1 className="mt-3 text-4xl/tight sm:text-5xl/tight font-extrabold">
              Building experiences with{" "}
              <span className="underline decoration-wavy decoration-teal-400/70">UE5 & Unity</span>
            </h1>
            <p className="mt-4 text-zinc-700 dark:text-zinc-300">
              
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border hover:shadow-sm">
                <Play className="h-4 w-4" /> Projects
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border hover:shadow-sm"
              >
                <Mail className="h-4 w-4" /> Contact
              </a>
              {CONTACT.github ? (
                <a href={CONTACT.github} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border hover:shadow-sm">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              ) : null}
              {CONTACT.linkedin ? (
                <a href={CONTACT.linkedin} className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border hover:shadow-sm">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              ) : null}
            </div>
          </div>

          {/* Right: your static image */}
          <div className="w-full">
            <img
              src="/images/AbhayPhoto.jpg"                // place file at public/images/abhay.jpg
              alt="Abhay Kumar Bhorayat"
              className="w-full aspect-[16/10] rounded-3xl border object-cover shadow"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}


/** -------------------------------------------------------
 *  CONTENT SECTIONS
 *  ---------------------------------------------------- */

function Projects() {
  return (
    <section id="projects" className="py-14">
      <Container>
        <div className="mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => {
            const hasGithub = !!p.links?.github;
            const hasLive = !!p.links?.live;
            const hasLetter = !!p.links?.letter;
            const hasPresentation = !!p.links?.presentation;
            const hasVideo = !!p.links?.video;
            const hasReadme = !!p.links?.readme;
            const hasApk = !!p.links?.apk;

            return (
              <article key={p.title} className="rounded-2xl border p-5 hover:shadow-sm transition">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">{p.year}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] rounded-full border px-2 py-0.5">{t}</span>
                  ))}
                </div>

                {/* keep ALL link buttons inside this one centered container */}
                {(hasGithub || hasLive || hasLetter || hasPresentation || hasVideo || hasReadme || hasApk) && (
                  <div className="mt-4 flex flex-wrap items-center gap-3 justify-center">
                    {hasGithub && (
                      <a href={p.links.github} className="inline-flex items-center gap-1 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" /> Code
                      </a>
                    )}
                    {hasLive && (
                      <a href={p.links.live} className="inline-flex items-center gap-1 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" /> Live
                      </a>
                    )}
                    {hasLetter && (
                      <a href={p.links.letter} className="inline-flex items-center gap-1 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                        📄 Letter
                      </a>
                    )}
                    {hasPresentation && (
                      <a href={p.links.presentation} className="inline-flex items-center gap-1 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                        📊 Presentation
                      </a>
                    )}
                    {hasVideo && (
                      <a href={p.links.video} className="inline-flex items-center gap-1 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4" /> Video
                      </a>
                    )}
                    {hasReadme && (
                      <a href={p.links.readme} className="inline-flex items-center gap-1 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4" /> README
                      </a>
                    )}
                    {hasApk && (
                      <a
                        href={p.links.apk}
                        className="inline-flex items-center gap-1 text-sm hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        type="application/vnd.android.package-archive"
                      >
                        <Smartphone className="h-4 w-4" /> APK
                      </a>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-14">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Experience</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {EXPERIENCE.map((e, idx) => (
            <article key={idx} className="rounded-2xl border p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold">{e.role} — {e.org}</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{e.date}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-14">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Education</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {EDUCATION.map((ed, i) => (
            <article key={i} className="rounded-2xl border p-5">
              <h3 className="font-semibold">{ed.degree}</h3>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">{ed.place} • {ed.year}</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                {ed.details?.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-14">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Skills</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Programming</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {SKILLS.languages.map((s) => <span key={s} className="text-xs rounded-full border px-2 py-0.5">{s}</span>)}
            </div>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Software</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {SKILLS.software.map((s) => <span key={s} className="text-xs rounded-full border px-2 py-0.5">{s}</span>)}
            </div>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Courses</h3>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {SKILLS.courses.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold">Languages</h3>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {SKILLS.languagesKnown.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Positions() {
  return (
    <section id="positions" className="py-14">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Positions & Extracurriculars</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {POSITIONS.map((p, i) => (
            <article key={i} className="rounded-2xl border p-5">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold">{p.title} — {p.org}</h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">{p.date}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Awards() {
  return (
    <section id="awards" className="py-14">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Awards</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {AWARDS.map((a, i) => (
            <article key={i} className="rounded-2xl border p-5 text-center">
              <div className="font-semibold">{a.title}</div>
              {a.year && <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{a.year}</div>}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-14">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">About</h2>
        <div className="rounded-2xl border p-6 text-zinc-700 dark:text-zinc-300 space-y-3 text-center">
          <p>
            I’m <strong>Abhay Kumar Bhorayat</strong>. I build Unreal/Unity projects, XR
            simulations, and data-driven visualizations.
          </p>
          <p>
            Currently contributing as an Unreal Engine Developer at Proqio. Graduated from IIT Roorkee in 2025. With substantial experience as an XR Project Lead at Tinkering Lab and an AR/VR Developer at ArIES, I bring expertise in game development, PC games, and shader creation. My academic and professional journey highlights a strong foundation in immersive technologies and creative problem-solving within the gaming and XR domains.
          </p>
        </div>
      </Container>
    </section>
  );  
}

function Contact() {
  return (
    <section id="contact" className="py-14">
      <Container>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Contact</h2>
        <div className="flex flex-wrap justify-center gap-4">
  <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2">
    <Mail className="h-4 w-4" /> {CONTACT.email}
  </a>
  <a href={CONTACT.github} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2">
    <Github target="_blank" className="h-4 w-4" /> GitHub
  </a>
  <a href={CONTACT.linkedin} className="inline-flex items-center gap-2 rounded-xl border px-4 py-2">
    <Linkedin  target="_blank" className="h-4 w-4" /> LinkedIn
  </a>
  <div className="inline-flex items-center gap-2 rounded-xl border px-4 py-2">
    📞 {CONTACT.phone}
  </div>
</div>

      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <div>© {new Date().getFullYear()} Abhay. All rights reserved.</div>
        <div className="flex items-center gap-4">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="hover:underline">{n.label}</a>
          ))}
        </div>
      </Container>
    </footer>
  );
}

/** -------------------------------------------------------
 *  APP
 *  ---------------------------------------------------- */

export default function PortfolioApp() {
  return (
    <div className="min-h-dvh overflow-x-hidden text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900">
      <NavBar />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Positions />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
}
