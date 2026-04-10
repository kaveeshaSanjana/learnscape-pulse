import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Your Google Spreadsheet — first sheet (name it "Videos" as per the template)
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1hlT8eo643lur8Ac1JzX313dm1Pj4MP65Q4eoPPN1lLM/export?format=csv";
// ─────────────────────────────────────────────────────────────────────────────

interface VideoItem {
  title: string;
  url: string;
  description: string;
}

/** Robust CSV line parser — handles quoted fields that include commas */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

/** Parse the full CSV text into VideoItem array */
function parseCsv(text: string): VideoItem[] {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.trim() !== "");
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const titleIdx = headers.indexOf("title");
  const urlIdx = headers.indexOf("url");
  const descIdx = headers.indexOf("description");

  return lines
    .slice(1)
    .map((line) => {
      const cols = parseCsvLine(line);
      return {
        title: titleIdx >= 0 ? cols[titleIdx] ?? "" : "",
        url: urlIdx >= 0 ? cols[urlIdx] ?? "" : "",
        description: descIdx >= 0 ? cols[descIdx] ?? "" : "",
      };
    })
    .filter((v) => v.url.startsWith("http"));
}

/** Convert any Facebook video / reel / post URL to the embed plugin URL */
function getFbEmbedUrl(fbUrl: string): string {
  return (
    "https://www.facebook.com/plugins/video.php" +
    "?href=" +
    encodeURIComponent(fbUrl) +
    "&show_text=0&width=500&autoplay=0&mute=1"
  );
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
const VideoGallerySection = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.text();
      })
      .then((text) => {
        setVideos(parseCsv(text));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Duplicate for seamless infinite loop
  const track = videos.length > 0 ? [...videos, ...videos] : [];
  // Speed: wider gallery → adjust duration (seconds per full loop of ORIGINAL set)
  const durationSec = Math.max(20, videos.length * 8);

  return (
    <section className="py-20 overflow-hidden bg-background" id="videos">
      {/* ── Heading ── */}
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            className="text-primary font-semibold text-sm uppercase tracking-wider mb-2"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Video Gallery
          </p>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Latest Sessions
          </h2>
          <p
            className="text-muted-foreground mt-3 text-sm md:text-base max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Watch highlights from our live classes, student achievements and spoken English sessions
          </p>
        </motion.div>
      </div>

      {/* ── States ── */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      )}

      {error && (
        <p className="text-center text-muted-foreground py-12">
          Could not load videos. Please check back later.
        </p>
      )}

      {!loading && !error && videos.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No videos found. Add rows to your Google Sheet and refresh.
        </p>
      )}

      {/* ── RTL Scroll Gallery ── */}
      {!loading && !error && videos.length > 0 && (
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-background to-transparent" />

          {/* Scrolling track */}
          <div
            className="flex gap-5 w-max"
            style={{
              animation: `scroll-rtl ${durationSec}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {track.map((video, i) => (
              <div
                key={`${video.url}-${i}`}
                className="flex-shrink-0 w-[300px] md:w-[380px] rounded-2xl overflow-hidden border border-border bg-card shadow-md transition-shadow hover:shadow-xl"
              >
                {/* Facebook video embed */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={getFbEmbedUrl(video.url)}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={video.title || `Video ${i + 1}`}
                    loading="lazy"
                  />
                </div>

                {/* Card footer */}
                {(video.title || video.description) && (
                  <div className="p-4">
                    {video.title && (
                      <p
                        className="font-semibold text-foreground text-sm truncate"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {video.title}
                      </p>
                    )}
                    {video.description && (
                      <p
                        className="text-muted-foreground text-xs mt-1 line-clamp-2"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {video.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallerySection;
