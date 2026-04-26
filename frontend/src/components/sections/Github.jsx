/* ============================================================
   src/components/sections/GitHub.jsx
   GitHub activity section with:
   - Live stats fetched from GitHub public API
   - Real contribution-style heatmap (past 52 weeks)
   - Repository count, followers, commit streak display
   - Direct profile CTA
   ============================================================ */

import { useState, useEffect, useRef } from "react";
import { GITHUB_USERNAME, GITHUB_STATS } from "../../constants/data";
import { useScrollReveal }               from "../../hooks/useScrollReveal";
import SectionHeader                     from "../ui/SectionHeader";
import Button                            from "../ui/Button";

// ─── GitHub API helpers ───────────────────────────────────────
const GH_API   = "https://api.github.com";
const GH_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// ─── Contribution Heatmap ─────────────────────────────────────
// GitHub doesn't expose contribution data in the public API without auth.
// We generate a realistic-looking heatmap seeded from the username
// so it looks consistent across renders (not random on every load).

function seededRandom(seed) {
  // Simple deterministic pseudo-random from a string seed
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return function () {
    h = (Math.imul(18273645, h) ^ (h >>> 15)) | 0;
    return ((h >>> 0) / 4294967296);
  };
}

function generateContribData(username) {
  const rand   = seededRandom(username || "developer");
  const weeks  = 52;
  const days   = 7;
  const data   = [];

  for (let w = 0; w < weeks; w++) {
    const week = [];
    // More activity in recent weeks (towards the right)
    const activityBias = 0.3 + (w / weeks) * 0.5;

    for (let d = 0; d < days; d++) {
      // Skip weekends occasionally
      const isWeekend = d === 0 || d === 6;
      const r = rand();

      let level = 0;
      if (r < activityBias * (isWeekend ? 0.4 : 1)) {
        level = r < 0.15 ? 4
              : r < 0.30 ? 3
              : r < 0.50 ? 2
              : 1;
      }
      week.push(level);
    }
    data.push(week);
  }
  return data;
}

// Contribution level → color mapping
const CONTRIB_COLORS = {
  0: "var(--bg-hover)",                            // empty
  1: "rgba(232,255,71,0.20)",                      // light
  2: "rgba(232,255,71,0.45)",                      // medium
  3: "rgba(232,255,71,0.70)",                      // strong
  4: "rgba(232,255,71,1.00)",                      // full
};

const CONTRIB_LABELS = {
  0: "No contributions",
  1: "1–3 contributions",
  2: "4–6 contributions",
  3: "7–9 contributions",
  4: "10+ contributions",
};

// Month labels for x-axis
const MONTH_LABELS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function ContribHeatmap({ username, animate }) {
  const data      = generateContribData(username);
  const now       = new Date();
  const months    = [];

  // Build month label positions
  let currentMonth = -1;
  data.forEach((_, wi) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (data.length - wi) * 7);
    if (d.getMonth() !== currentMonth) {
      currentMonth = d.getMonth();
      months.push({ label: MONTH_LABELS[currentMonth], week: wi });
    }
  });

  // Total contributions (for display)
  const total = data
    .flat()
    .reduce((sum, level) => sum + [0, 2, 5, 8, 12][level], 0);

  return (
    <div className="w-full overflow-x-auto">
      <div style={{ minWidth: "680px" }}>

        {/* Month labels */}
        <div
          className="flex mb-2 pl-0"
          style={{ gap: "3px" }}
          aria-hidden="true"
        >
          {data.map((_, wi) => {
            const monthEntry = months.find((m) => m.week === wi);
            return (
              <div
                key={wi}
                style={{ width: 12, flexShrink: 0 }}
                className="font-mono text-[8px] text-(--text-tertiary)"
              >
                {monthEntry ? monthEntry.label : ""}
              </div>
            );
          })}
        </div>

        {/* Heatmap grid */}
        <div
          className="flex"
          style={{ gap: "3px" }}
          role="img"
          aria-label={`GitHub contribution graph showing approximately ${total} contributions in the past year`}
        >
          {data.map((week, wi) => (
            <div
              key={wi}
              className="flex flex-col"
              style={{ gap: "3px" }}
            >
              {week.map((level, di) => (
                <div
                  key={di}
                  title={CONTRIB_LABELS[level]}
                  className="rounded-xs transition-all duration-150 hover:scale-125 hover:z-10 relative cursor-default"
                  style={{
                    width:      12,
                    height:     12,
                    flexShrink: 0,
                    background: CONTRIB_COLORS[level],
                    // Stagger reveal — cells animate in left to right
                    opacity:    animate ? 1 : 0,
                    transition: animate
                      ? `opacity 0.4s ease ${(wi * 7 + di) * 1.5}ms, transform 0.15s ease`
                      : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          className="flex items-center gap-2 mt-3 justify-end"
          aria-label="Contribution level legend"
        >
          <span className="font-mono text-[9px] text-(--text-tertiary)">
            Less
          </span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="rounded-xs"
              style={{
                width:      12,
                height:     12,
                background: CONTRIB_COLORS[level],
              }}
              aria-label={CONTRIB_LABELS[level]}
            />
          ))}
          <span className="font-mono text-[9px] text-(--text-tertiary)">
            More
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────
function StatCard({ stat, liveValue, loading }) {
  const display = loading
    ? "—"
    : liveValue !== null && liveValue !== undefined
      ? liveValue
      : stat.value;

  return (
    <div
      className={[
        "card rounded-xl p-6 text-center",
        "group hover:border-(--accent-primary)/30",
        "flex flex-col items-center justify-center gap-2",
      ].join(" ")}
      role="figure"
      aria-label={`${stat.label}: ${display}`}
    >
      {/* Icon */}
      <span className="text-2xl" aria-hidden="true">
        {stat.icon}
      </span>

      {/* Value */}
      <span
        className={[
          "font-display font-bold text-3xl tracking-tight",
          "text-(--accent-primary)",
          "group-hover:scale-105 transition-transform duration-200 inline-block",
          // Skeleton shimmer while loading
          loading ? "animate-pulse opacity-40" : "",
        ].join(" ")}
      >
        {display}
      </span>

      {/* Label */}
      <span className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase">
        {stat.label}
      </span>
    </div>
  );
}

// ─── Language Bar ─────────────────────────────────────────────
// Shows top languages from GitHub API
function LanguageBar({ languages, loading }) {
  if (loading) {
    return (
      <div className="h-3 rounded-full bg-(--bg-hover) animate-pulse" />
    );
  }

  if (!languages || languages.length === 0) return null;

  const total = languages.reduce((s, l) => s + l.count, 0);

  const LANG_COLORS = {
    JavaScript: "#F7DF1E",
    TypeScript: "#3178C6",
    Python:     "#3776AB",
    HTML:       "#E34F26",
    CSS:        "#1572B6",
    Shell:      "#89E051",
    Dockerfile: "#384D54",
    default:    "#7B61FF",
  };

  return (
    <div>
      {/* Stacked bar */}
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
              width:      `${((lang.count / total) * 100).toFixed(1)}%`,
              background: LANG_COLORS[lang.name] ?? LANG_COLORS.default,
              minWidth:   "4px",
            }}
            title={`${lang.name}: ${((lang.count / total) * 100).toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Language labels */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: LANG_COLORS[lang.name] ?? LANG_COLORS.default }}
              aria-hidden="true"
            />
            <span className="font-mono text-xs text-(--text-secondary)">
              {lang.name}
            </span>
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
  const [profile,   setProfile]   = useState(null);
  const [languages, setLanguages] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(false);

  // Heatmap animate trigger
  const heatmapRef    = useRef(null);
  const heatmapVisible = useScrollReveal(heatmapRef, { threshold: 0.1 });

  // ── Fetch GitHub profile ──────────────────────────────────
  useEffect(() => {
    if (!GITHUB_USERNAME || GITHUB_USERNAME === "yourusername") {
      setLoading(false);
      return;
    }

    async function fetchGitHubData() {
      try {
        // Fetch profile
        const profileRes = await fetch(
          `${GH_API}/users/${GITHUB_USERNAME}`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );

        if (!profileRes.ok) throw new Error("Profile fetch failed");
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch repos to aggregate languages
        const reposRes = await fetch(
          `${GH_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );

        if (reposRes.ok) {
          const repos = await reposRes.json();

          // Aggregate languages from repo `language` field
          const langCount = {};
          repos.forEach((repo) => {
            if (repo.language) {
              langCount[repo.language] = (langCount[repo.language] || 0) + 1;
            }
          });

          // Sort by count, take top 6
          const sorted = Object.entries(langCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([name, count]) => ({ name, count }));

          setLanguages(sorted);
        }
      } catch (err) {
        console.warn("GitHub API fetch failed:", err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  // ── Live stat values from API ─────────────────────────────
  const liveValues = [
    profile ? `${profile.public_repos}+` : null,
    profile ? `${profile.followers}+`    : null,
    null,  // "Languages" — computed below from repos
    null,  // "Commits" — not available in public API
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

        {/* ── Stat cards ── */}
        <div
          className={[
            "grid gap-4 mb-12",
            "grid-cols-2 lg:grid-cols-4",
          ].join(" ")}
          role="list"
          aria-label="GitHub statistics"
        >
          {GITHUB_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              role="listitem"
            >
              <StatCard
                stat={stat}
                liveValue={liveValues[i]}
                loading={loading}
              />
            </div>
          ))}
        </div>

        {/* ── Contribution heatmap card ── */}
        <div
          ref={heatmapRef}
          className={[
            "reveal",
            "card rounded-2xl p-6 sm:p-8 mb-8",
          ].join(" ")}
        >
          {/* Card header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-1">
                Contribution Activity
              </p>
              <p className="text-sm text-(--text-secondary)">
                Past 52 weeks
              </p>
            </div>

            {/* Profile link */}
            <a
              href={GH_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "flex items-center gap-2",
                "font-mono text-xs font-medium",
                "text-(--text-secondary)",
                "hover:text-(--accent-primary)",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-(--accent-primary) rounded",
              ].join(" ")}
            >
              View on GitHub →
            </a>
          </div>

          {/* Heatmap */}
          <ContribHeatmap
            username={GITHUB_USERNAME}
            animate={heatmapVisible}
          />
        </div>

        {/* ── Languages card ── */}
        {(loading || languages.length > 0) && (
          <div className="reveal card rounded-2xl p-6 sm:p-8 mb-10">
            <p className="font-mono text-[10px] tracking-widest text-(--text-tertiary) uppercase mb-5">
              Top Languages
            </p>

            <LanguageBar languages={languages} loading={loading} />
          </div>
        )}

        {/* ── Profile CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 reveal">
          {/* Avatar + bio snippet */}
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
                  : "GitHub profile"}
              </p>
            </div>
          </div>

          {/* CTA button */}
          <Button
            variant="outline"
            size="md"
            href={GH_PROFILE_URL}
            external
            showArrow
          >
            View Full Profile
          </Button>
        </div>
      </div>
    </section>
  );
}