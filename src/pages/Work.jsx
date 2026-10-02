import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

  const [activeMobileIndex, setActiveMobileIndex] =
    useState(0);

  const touchStartX = useRef(null);

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

  useEffect(() => {
    setActiveMobileIndex(0);
  }, [activeFilter, visibleVideos.length]);

  const goToPreviousVideo = () => {
    if (!visibleVideos.length) return;

    setActiveMobileIndex((currentIndex) =>
      currentIndex === 0
        ? visibleVideos.length - 1
        : currentIndex - 1
    );
  };

  const goToNextVideo = () => {
    if (!visibleVideos.length) return;

    setActiveMobileIndex((currentIndex) =>
      (currentIndex + 1) % visibleVideos.length
    );
  };

  const handleTouchStart = (event) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        goToNextVideo();
      } else {
        goToPreviousVideo();
      }
    }

    touchStartX.current = null;
  };

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
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {!loading && categories.length > 1 && (
            <div className="mb-12 flex justify-start gap-3 overflow-x-auto pb-1 sm:gap-4">
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
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 sm:text-xs ${
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-[#111111] text-white/75 hover:border-white/20 hover:text-white"
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
            <>
              <div
                className="relative md:hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative flex min-h-[540px] items-center justify-center overflow-visible">
                  {visibleVideos.map((video, index) => {
                    const rawOffset = index - activeMobileIndex;
                    const wrappedOffset =
                      rawOffset > 0
                        ? rawOffset - visibleVideos.length
                        : rawOffset;
                    const absOffset = Math.abs(wrappedOffset);
                    const isActive = index === activeMobileIndex;

                    if (absOffset > 1) {
                      return null;
                    }

                    return (
                      <motion.div
                        key={video.id}
                        animate={{
                          x: wrappedOffset * 110,
                          scale: isActive ? 1.12 : 0.82,
                          opacity: isActive ? 1 : 0.52,
                          filter: isActive
                            ? "brightness(1)"
                            : "brightness(0.55)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 18,
                        }}
                        style={{
                          zIndex: isActive ? 20 : 10,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-[76vw] max-w-[280px]">
                          <VideoCard
                            video={video}
                            setVideoPlaying={setVideoPlaying}
                            className="!max-w-none w-full"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-12 mb-2 flex items-center justify-between gap-3 px-3">
                  <button
                    type="button"
                    onClick={goToPreviousVideo}
                    aria-label="Previous video"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className="flex items-center gap-2">
                    {visibleVideos.map((video, index) => (
                      <button
                        key={`${video.id}-dot`}
                        type="button"
                        onClick={() =>
                          setActiveMobileIndex(index)
                        }
                        aria-label={`Go to ${video.title || "video"}`}
                        className={`h-2.5 rounded-full transition-all duration-200 ${
                          index === activeMobileIndex
                            ? "w-7 bg-white"
                            : "w-2.5 bg-white/30 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={goToNextVideo}
                    aria-label="Next video"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="hidden w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:grid">
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
            </>
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