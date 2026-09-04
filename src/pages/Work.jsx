import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";
import {
  collection,
  getDocs,
} from "firebase/firestore";

import VideoCard from "../components/Video/videoCard";
import { db } from "../firebase/firebase";

export default function Work({
  setVideoPlaying,
}) {
  const [workVideos, setWorkVideos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeFilter, setActiveFilter] =
    useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const snapshot = await getDocs(
          collection(db, "videos")
        );

        const videos = snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );

        videos.sort((a, b) => {
          const aPosition =
            typeof a.position === "number"
              ? a.position
              : Infinity;

          const bPosition =
            typeof b.position === "number"
              ? b.position
              : Infinity;

          if (aPosition !== bPosition) {
            return aPosition - bPosition;
          }

          const aTime =
            a.createdAt?.seconds || 0;

          const bTime =
            b.createdAt?.seconds || 0;

          return bTime - aTime;
        });

        setWorkVideos(videos);
      } catch (error) {
        console.error(
          "Error loading work videos:",
          error
        );

        setWorkVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        workVideos
          .map((video) =>
            video?.category?.trim()
          )
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [workVideos]);

  const featuredVideo = useMemo(() => {
    return (
      workVideos.find((video) => video.featured) ||
      workVideos[0]
    );
  }, [workVideos]);

  const visibleVideos = useMemo(() => {
    if (activeFilter === "All") {
      return workVideos;
    }

    return workVideos.filter(
      (video) => video.category === activeFilter
    );
  }, [activeFilter, workVideos]);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 pb-6 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-white/50">
              Portfolio
            </p>
            <h1 className="text-4xl font-bold tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
              My Work
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
              A selection of recent brand edits, commercial work, and visual stories designed for impact.
            </p>
          </motion.div>

          {!loading && featuredVideo && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]"
            >
              <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="w-full p-3 sm:p-4 lg:p-5">
                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-black">
                    <VideoCard
                      video={featuredVideo}
                      setVideoPlaying={setVideoPlaying}
                      className="mx-auto w-full max-w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center px-4 py-5 sm:px-6 lg:px-7">
                  <span className="mb-3 inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
                    Featured Project
                  </span>

                  <h2 className="text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl">
                    {featuredVideo.title || "Featured project"}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                    {featuredVideo.description ||
                      "A high-impact edit crafted to tell a story, move attention, and elevate brand presence."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredVideo.category && (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/50">
                        {featuredVideo.category}
                      </span>
                    )}
                    {featuredVideo.client && (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/50">
                        {featuredVideo.client}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {!loading && categories.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive =
                  activeFilter === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveFilter(category)
                    }
                    className={`rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-200 ${
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          {loading ? (
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-[9/16] w-full animate-pulse rounded-[28px] bg-white/[0.04]"
                />
              ))}
            </div>
          ) : visibleVideos.length > 0 ? (
            <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="min-w-0"
                >
                  <VideoCard
                    video={video}
                    setVideoPlaying={setVideoPlaying}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[320px] w-full items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
              <div>
                <p className="text-lg font-medium text-white/80">
                  No work in this category yet.
                </p>
                <p className="mt-2 text-sm text-white/45">
                  Try a different filter or check back soon.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}