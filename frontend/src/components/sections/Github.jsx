import { useState, useEffect, useRef, useCallback } from "react";
import { GITHUB_USERNAME } from "../../constants/data";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import SectionHeader from "../ui/SectionHeader";
import Button from "../ui/Button";

// ─── Config ──────────────────────────────────────────────────
const GH_API = "https://api.github.com";
const GH_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

const GH_HEADERS = { Accept: "application/vnd.github.v3+json" };

// ─── Utilities ───────────────────────────────────────────────

function toDateStr(date) {
  return date.toISOString().slice(0, 10);
}

function weekStart(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  d.setDate(d.getDate() - day); // align to Sunday (GitHub's week start)
  d.setHours(0, 0, 0, 0);
  return d;
}

function buildHeatmap(events) {
  // Count commits per calendar day
  const commitsByDay = {}; // "YYYY-MM-DD" -> count

  events.forEach((ev) => {
    if (ev.type !== "PushEvent") return;
    const day = toDateStr(new Date(ev.created_at));
    const commits = ev.payload?.commits?.length ?? 1;
    commitsByDay[day] = (commitsByDay[day] || 0) + commits;
  });

  // Build grid: 52 weeks × 7 days, week 0 = oldest
  const today = new Date();
  const endDay = weekStart(today);
  endDay.setDate(endDay.getDate() + 6); // last Saturday

  const grid = [];

  for (let w = 51; w >= 0; w--) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const cell = new Date(endDay);
      cell.setDate(endDay.getDate() - w * 7 - (6 - d));
      const key = toDateStr(cell);
      const count = commitsByDay[key] ?? 0;

      // Map commit count → 0–4 level
      const level = count === 0 ? 0
        : count <= 2 ? 1
          : count <= 5 ? 2
            : count <= 9 ? 3
              : 4;

      week.push({ level, count, date: key });
    }
    grid.push(week);
  }

  return grid;
}

/** Calculate current streak (consecutive days with ≥1 commit, ending today or yesterday) */
function calcStreak(events) {
  const days = new Set();
  events.forEach((ev) => {
    if (ev.type === "PushEvent") {
      days.add(toDateStr(new Date(ev.created_at)));
    }
  });

  let streak = 0;
  const cursor = new Date();

  // Allow streak to continue if today has no commits yet (check from yesterday)
  if (!days.has(toDateStr(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (days.has(toDateStr(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

// ─── Fetch all pages of a paginated GitHub endpoint ───────────
async function fetchAllPages(baseUrl, maxPages = 10) {
  const results = [];
  let page = 1;

  while (page <= maxPages) {
    const sep = baseUrl.includes("?") ? "&" : "?";
    const res = await fetch(`${baseUrl}${sep}per_page=100&page=${page}`, {
      headers: GH_HEADERS,
    });

    if (!res.ok) break;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    results.push(...data);
    if (data.length < 100) break; // last page
    page++;
  }

  return results;
}

// ─── Contribution level → color ───────────────────────────────
const CONTRIB_COLORS = {
  0: "var(--bg-hover)",
  1: "rgba(232,255,71,0.20)",
  2: "rgba(232,255,71,0.45)",
  3: "rgba(232,255,71,0.70)",
  4: "rgba(232,255,71,1.00)",
};

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// ─── Heatmap Component ────────────────────────────────────────
function ContribHeatmap({ grid, animate }) {
  if (!grid || grid.length === 0) return null;

  const total = grid.flat().reduce((s, c) => s + c.count, 0);

  // Month label positions
  const months = [];
  let lastMonth = -1;
  grid.forEach((week, wi) => {
    const d = new Date(week[0].date);
    if (d.getMonth() !== lastMonth) {
      lastMonth = d.getMonth();
      months.push({ label: MONTH_LABELS[lastMonth], week: wi });
    }
  });

  return (
    <div className="w-full overflow-x-auto">
      <div style={{ minWidth: "680px" }}>

        {/* Month labels */}
        <div className="flex mb-2" style={{ gap: "3px" }} aria-hidden="true">
          {grid.map((_, wi) => {
            const m = months.find((x) => x.week === wi);
            return (
              <div
                key={wi}
                style={{ width: 12, flexShrink: 0 }}
                className="font-mono text-[8px] text-(--text-tertiary)"
              >
                {m ? m.label : ""}
              </div>
            );
          })}
        </div>

        {/* Grid */}
        <div
          className="flex"
          style={{ gap: "3px" }}
          role="img"
          aria-label={`GitHub contribution graph: ${total} commits in past year`}
        >
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col" style={{ gap: "3px" }}>
              {week.map((cell, di) => (
                <div
                  key={di}
                  title={
                    cell.count > 0
                      ? `${cell.date}: ${cell.count} commit${cell.count !== 1 ? "s" : ""}`
                      : `${cell.date}: No commits`
                  }
                  className="rounded-xs cursor-default hover:scale-125 hover:z-10 relative transition-transform duration-150"
                  style={{
                    width: 12,
                    height: 12,
                    flexShrink: 0,
                    background: CONTRIB_COLORS[cell.level],
                    opacity: animate ? 1 : 0,
                    transition: animate
                      ? `opacity 0.4s ease ${(wi * 7 + di) * 1.2}ms, transform 0.15s ease`
                      : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="font-mono text-[9px] text-(--text-tertiary)">Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="rounded-xs"
              style={{ width: 12, height: 12, background: CONTRIB_COLORS[level] }}
            />
          ))}
          <span className="font-mono text-[9px] text-(--text-tertiary)">More</span>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────
function StatCard({ icon, label, value, loading }) {
  return (
    <div
      className="card rounded-xl p-6 text-center group hover:border-(--accent-primary)/30 flex flex-col items-center justify-center gap-2"
      role="figure"
      aria-label={`${label}: ${loading ? "loading" : value}`}
    >
      <span className="text-2xl" aria-hidden="true">{icon}</span>

      <span
        className={[
          "font-display font-bold text-3xl tracking-tight text-(--accent-primary)",
          "group-hover:scale-105 transition-transform duration-200 inline-block",
          loading ? "animate-pulse opacity-40" : "",
        ].join(" ")}
      >
        {loading ? "—" : value}
      </span>

      <span className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase">
        {label}
      </span>
    </div>
  );
}

// ─── Language Bar ─────────────────────────────────────────────
const LANG_COLORS = {
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Python: "#3776AB",
  Rust: "#CE422B",
  Go: "#00ADD8",
  Java: "#B07219",
  "C++": "#F34B7D",
  "C#": "#178600",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Shell: "#89E051",
  Dockerfile: "#384D54",
  Vue: "#41B883",
  Svelte: "#FF3E00",
  default: "#7B61FF",
};

function LanguageBar({ languages, loading }) {
  if (loading) {
    return <div className="h-3 rounded-full bg-(--bg-hover) animate-pulse" />;
  }
  if (!languages?.length) return null;

  const total = languages.reduce((s, l) => s + l.count, 0);

  return (
    <div>
      <div
        className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-3"
        role="img"
        aria-label="Programming languages breakdown"
      >
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="rounded-full transition-all duration-700 hover:brightness-125"
            style={{
              width: `${((lang.count / total) * 100).toFixed(1)}%`,
              background: LANG_COLORS[lang.name] ?? LANG_COLORS.default,
              minWidth: "4px",
            }}
            title={`${lang.name}: ${((lang.count / total) * 100).toFixed(1)}%`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: LANG_COLORS[lang.name] ?? LANG_COLORS.default }}
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-(--text-secondary)">{lang.name}</span>
            <span className="font-mono text-[10px] text-(--text-tertiary)">
              {((lang.count / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main GitHub Section ──────────────────────────────────────
export default function GitHub() {
  const [profile, setProfile] = useState(null);   // /users/:username
  const [languages, setLanguages] = useState([]);      // top langs from repos
  const [heatmap, setHeatmap] = useState([]);      // 52×7 grid from events
  const [streak, setStreak] = useState(null);    // day streak
  const [totalCommits, setTotalCommits] = useState(null); // commits from events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const heatmapRef = useRef(null);
  const heatmapVisible = useScrollReveal(heatmapRef, { threshold: 0.1 });

  // ── Main data fetch ────────────────────────────────────────
  useEffect(() => {
    if (!GITHUB_USERNAME || GITHUB_USERNAME === "yourusername") {
      setError("No GitHub username configured.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        // 1. Profile
        const profileRes = await fetch(
          `${GH_API}/users/${GITHUB_USERNAME}`,
          { headers: GH_HEADERS }
        );
        if (!profileRes.ok) {
          const msg = profileRes.status === 403
            ? "GitHub API rate limit hit. Try again in a minute."
            : "Failed to load GitHub profile.";
          throw new Error(msg);
        }
        const profileData = await profileRes.json();
        setProfile(profileData);

        // 2. Repos (all pages) → languages
        const repos = await fetchAllPages(
          `${GH_API}/users/${GITHUB_USERNAME}/repos?sort=updated`
        );
        const langCount = {};
        repos.forEach((repo) => {
          if (repo.language && !repo.fork) {          // skip forks
            langCount[repo.language] = (langCount[repo.language] || 0) + 1;
          }
        });
        const sortedLangs = Object.entries(langCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 7)
          .map(([name, count]) => ({ name, count }));
        setLanguages(sortedLangs);

        // 3. Public events (up to 3 pages = 300 events ≈ 90 days of activity)
        const events = await fetchAllPages(
          `${GH_API}/users/${GITHUB_USERNAME}/events/public`,
          3
        );

        const grid = buildHeatmap(events);
        setHeatmap(grid);

        const dayStreak = calcStreak(events);
        setStreak(dayStreak);

        // Total push commits visible in events
        const commitCount = events
          .filter((e) => e.type === "PushEvent")
          .reduce((s, e) => s + (e.payload?.commits?.length ?? 0), 0);
        setTotalCommits(commitCount);

      } catch (err) {
        console.error("GitHub fetch error:", err);
        setError(err.message || "Failed to load GitHub data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ── Stat card definitions (all live) ──────────────────────
  const stats = [
    {
      icon: "📦",
      label: "Public Repos",
      value: profile ? `${profile.public_repos}` : null,
    },
    {
      icon: "👥",
      label: "Followers",
      value: profile ? `${profile.followers}` : null,
    },
    {
      icon: "🔥",
      label: "Day Streak",
      value: streak !== null ? `${streak}d` : null,
    },
    {
      icon: "💾",
      label: "Recent Commits",
      // Events API covers ~90 days; label reflects that
      value: totalCommits !== null ? `${totalCommits}+` : null,
    },
  ];

  return (
    <section
      id="github"
      className="section-padding bg-(--bg-primary)"
      aria-labelledby="github-heading"
    >
      <div className="container-main">

        {/* Section header */}
        <SectionHeader
          label="Open Source"
          number={4}
          title="GitHub activity."
          titleAccent="activity"
          subtitle={
            profile
              ? `@${GITHUB_USERNAME} · ${profile.bio || "Building in public."}`
              : "Building in public, one commit at a time."
          }
          id="github-heading"
        />

        {/* Error banner */}
        {error && (
          <div
            className="mb-8 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 font-mono text-sm"
            role="alert"
          >
            ⚠ {error}
          </div>
        )}

        {/* Stat cards */}
        <div
          className="grid gap-4 mb-12 grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="GitHub statistics"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              role="listitem"
            >
              <StatCard
                icon={stat.icon}
                label={stat.label}
                value={stat.value ?? "—"}
                loading={loading}
              />
            </div>
          ))}
        </div>

        {/* Contribution heatmap */}
        {/* <div
          ref={heatmapRef}
          className="reveal card rounded-2xl p-6 sm:p-8 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-1">
                Contribution Activity
              </p>
              <p className="text-sm text-(--text-secondary)">
                {heatmap.length > 0
                  ? "Past 52 weeks · real commit data"
                  : "Past 52 weeks"}
              </p>
            </div>

            <a
              href={GH_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "flex items-center gap-2 font-mono text-xs font-medium",
                "text-(--text-secondary) hover:text-(--accent-primary)",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-(--accent-primary) rounded",
              ].join(" ")}
            >
              View on GitHub →
            </a>
          </div>

          {loading ? (
            <div className="flex gap-1 h-24 items-end">
              {Array.from({ length: 52 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-(--bg-hover) animate-pulse"
                  style={{
                    height: `${30 + Math.sin(i * 0.4) * 20}%`,
                    animationDelay: `${i * 20}ms`,
                  }}
                />
              ))}
            </div>
          ) : (
            <ContribHeatmap grid={heatmap} animate={heatmapVisible} />
          )}
        </div> */}

        {/* Languages card */}
        {/* {(loading || languages.length > 0) && (
          <div className="reveal card rounded-2xl p-6 sm:p-8 mb-10">
            <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-5">
              Top Languages
            </p>
            <LanguageBar languages={languages} loading={loading} />
          </div>
        )} */}

        {/* Profile CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 reveal">
          <div className="flex items-center gap-4">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={`${GITHUB_USERNAME}'s GitHub avatar`}
                className="w-12 h-12 rounded-full border-2 border-(--border-subtle)"
                loading="lazy"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-(--bg-hover) border border-(--border-subtle) flex items-center justify-center font-mono text-sm text-(--text-tertiary)">
                GH
              </div>
            )}

            <div>
              <p className="font-display font-bold text-(--text-primary)">
                @{GITHUB_USERNAME}
              </p>
              <p className="font-mono text-xs text-(--text-tertiary)">
                {profile
                  ? `${profile.public_repos} repos · ${profile.followers} followers`
                  : loading ? "Loading…" : "GitHub profile"}
              </p>
            </div>
          </div>

          <Button variant="outline" size="md" href={GH_PROFILE_URL} external showArrow>
            View Full Profile
          </Button>
        </div>
      </div>
    </section>
  );
}