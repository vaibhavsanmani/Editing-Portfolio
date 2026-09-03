import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        // ============================================
        // GET ALL VIDEOS
        // ============================================

        const snapshot = await getDocs(
          collection(db, "videos")
        );

        const videos = snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );

        // ============================================
        // SORT USING ADMIN POSITION
        // ============================================

        videos.sort((a, b) => {
          const aPosition =
            typeof a.position === "number"
              ? a.position
              : Infinity;

          const bPosition =
            typeof b.position === "number"
              ? b.position
              : Infinity;

          // Lower position = higher priority
          if (aPosition !== bPosition) {
            return aPosition - bPosition;
          }

          // ============================================
          // FALLBACK
          // ============================================

          const aTime =
            a.createdAt?.seconds || 0;

          const bTime =
            b.createdAt?.seconds || 0;

          return bTime - aTime;
        });

        console.log(
          "Work videos loaded:",
          videos
        );

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

  return (
    <main className="bg-black min-h-screen">
      {/* HEADER */}
      <section className="pt-32 pb-12 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="
                text-4xl
                md:text-5xl
                lg:text-6xl
                font-bold
                text-white
                mb-4
              "
            >
              My Work
            </h1>
            <p
              className="
                text-lg
                text-white/60
                max-w-2xl
              "
            >
              Explore my latest video editing projects and creative work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VIDEOS GRID */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div
              className="
                grid
                w-full
                grid-cols-1
                gap-8
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {[1, 2, 3, 4, 5, 6].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      aspect-[9/16]
                      w-full
                      animate-pulse
                      rounded-3xl
                      bg-white/[0.04]
                    "
                  />
                )
              )}
            </div>
          ) : workVideos.length > 0 ? (
            <div
              className="
                grid
                w-full
                grid-cols-1
                gap-8
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {workVideos.map(
                (video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className="min-w-0"
                  >
                    <VideoCard
                      video={video}
                      setVideoPlaying={
                        setVideoPlaying
                      }
                    />
                  </motion.div>
                )
              )}
            </div>
          ) : (
            <div
              className="
                flex
                min-h-[400px]
                w-full
                items-center
                justify-center
                rounded-3xl
                border
                border-white/10
                bg-white/[0.02]
              "
            >
              <p
                className="
                  text-sm
                  text-white/30
                "
              >
                No work videos available yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}