import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import { db } from "../firebase/firebase";
import VideoCard from "../components/Video/videoCard";

export default function Work({
  setVideoPlaying,
}) {
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        setError("");

        const videosQuery = query(
          collection(db, "videos"),
          orderBy("createdAt", "desc")
        );

        const snapshot =
          await getDocs(videosQuery);

        const fetchedVideos =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setVideos(fetchedVideos);
      } catch (err) {
        console.error(
          "Error fetching videos:",
          err
        );

        setError(
          "Unable to load videos right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main
      className="
        min-h-screen
        bg-black
        px-5
        pb-24
        pt-32
        text-white

        sm:px-6
        md:px-10
      "
    >

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >

        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-14 md:mb-16"
        >

          {/* LABEL */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-3
            "
          >

            <span
              className="
                h-2
                w-2
                shrink-0
                rounded-full
                bg-white
              "
            />

            <span
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/40
              "
            >
              Selected Work
            </span>

          </div>

          {/* TITLE */}

          <h1
            className="
              text-6xl
              font-semibold
              leading-[0.9]
              tracking-[-0.06em]

              sm:text-7xl
              md:text-8xl
            "
          >
            Videos
          </h1>

        </motion.div>

        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading && (
          <div
            className="
              flex
              min-h-[300px]
              items-center
              justify-center
            "
          >
            <Loader2
              size={28}
              className="
                animate-spin
                text-white/40
              "
            />
          </div>
        )}

        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {!loading && error && (
          <div
            className="
              rounded-3xl
              border
              border-red-500/20
              bg-red-500/5
              p-8
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* ================================= */}
        {/* EMPTY */}
        {/* ================================= */}

        {!loading &&
          !error &&
          videos.length === 0 && (
            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/[0.02]
                p-12
                text-center
              "
            >
              <p
                className="
                  text-sm
                  text-white/40
                "
              >
                No videos uploaded yet.
              </p>
            </div>
          )}

        {/* ================================= */}
        {/* VIDEO GRID */}
        {/* ================================= */}

        {!loading &&
          !error &&
          videos.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                grid
                grid-cols-1
                justify-items-center
                gap-x-6
                gap-y-12

                sm:grid-cols-2
                sm:gap-x-8

                lg:grid-cols-3
                lg:gap-x-10

                xl:grid-cols-4
                xl:gap-x-12
              "
            >

              {videos.map(
                (video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        index * 0.05,
                    }}
                    className="w-full"
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

            </motion.div>
          )}

      </div>
    </main>
  );
}