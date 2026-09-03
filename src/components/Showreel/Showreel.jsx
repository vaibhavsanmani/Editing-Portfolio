import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import VideoCard from "../Video/videoCard";

import { db } from "../../firebase/firebase";

export default function Showreel({
  setVideoPlaying,
}) {
  const [activeVideo, setActiveVideo] =
    useState(null);

  const [showreelVideos, setShowreelVideos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const snapshot = await getDocs(
          collection(db, "videos")
        );

        const videos =
          snapshot.docs.map(
            (document) => ({
              id: document.id,
              ...document.data(),
            })
          );

        // =====================================================
        // SORT USING ADMIN POSITION
        // =====================================================

        videos.sort((a, b) => {
          const positionA =
            typeof a.position === "number"
              ? a.position
              : Infinity;

          const positionB =
            typeof b.position === "number"
              ? b.position
              : Infinity;

          if (positionA !== positionB) {
            return positionA - positionB;
          }

          // Old videos without position
          const timeA =
            a.createdAt?.seconds || 0;

          const timeB =
            b.createdAt?.seconds || 0;

          return timeB - timeA;
        });

        console.log(
          "SHOWREEL ORDER:",
          videos.map((video) => ({
            title: video.title,
            position: video.position,
          }))
        );

        // First 3 according to Admin order
        setShowreelVideos(
          videos.slice(0, 3)
        );
      } catch (error) {
        console.error(
          "Error loading showreel videos:",
          error
        );

        setShowreelVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="w-full overflow-hidden bg-[#050505]">
      {/* VIDEOS */}

      {loading ? (
        <div
          className="
            mt-14
            grid
            w-full
            grid-cols-1
            gap-x-4
            gap-y-10
            sm:grid-cols-2
            sm:gap-x-6
            lg:grid-cols-3
            lg:gap-x-8
          "
        >
          {[1, 2, 3].map((item) => (
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
          ))}
        </div>
      ) : showreelVideos.length > 0 ? (
        <div
          className="
            mt-14
            grid
            w-full
            grid-cols-1
            gap-8
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {showreelVideos.map(
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
                  index={index}
                  activeVideo={activeVideo}
                  setActiveVideo={
                    setActiveVideo
                  }
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
            mt-14
            flex
            min-h-[300px]
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
            No featured videos available.
          </p>
        </div>
      )}

      {/* VIEW ALL */}

      <div
        className="
          mt-12
          flex
          justify-center
        "
      >
        <Link
          to="/work"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-sm
            text-white
          "
        >
          View all work

          <ArrowUpRight
            size={17}
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </section>
  );
}