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

const tabs = [
  { key: "posts", label: "Posts" },
  { key: "reels", label: "Reels" },
];

export default function Showreel({
  setVideoPlaying,
}) {
  const [activeVideo, setActiveVideo] =
    useState(null);

  const [showreelVideos, setShowreelVideos] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("posts");

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

          const timeA =
            a.createdAt?.seconds || 0;

          const timeB =
            b.createdAt?.seconds || 0;

          return timeB - timeA;
        });

        setShowreelVideos(videos.slice(0, 6));
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

  const renderPosts = () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {showreelVideos.map((video) => (
        <article
          key={`${video.id}-post`}
          className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-black"
        >
          <img
            src={
              video.thumbnailUrl ||
              video.thumbnail ||
              video.coverUrl ||
              video.cover ||
              video.poster ||
              ""
            }
            alt={video.title || "Post preview"}
            className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          <span className="absolute bottom-2 left-2 rounded-full border border-white/15 bg-black/35 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
            Post
          </span>
        </article>
      ))}
    </div>
  );

  const renderReels = () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {showreelVideos.map((video, index) => (
        <motion.div
          key={`${video.id}-reel`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: index * 0.05 }}
          className="min-w-0"
        >
          <VideoCard
            video={video}
            index={index}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            setVideoPlaying={setVideoPlaying}
          />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-[#050505] px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col gap-3 sm:mb-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
              Selected Work
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-5xl">
              Recent edits that hit hard.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
            A quick look at the kinds of stories, campaigns, and content I build for brands and creators.
          </p>
        </motion.div>

        {loading ? (
          <div
            className="
              grid
              w-full
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  aspect-[9/16]
                  w-full
                  animate-pulse
                  rounded-[28px]
                  bg-white/[0.04]
                "
              />
            ))}
          </div>
        ) : showreelVideos.length > 0 ? (
          <div className="rounded-[30px] border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
              <div className="relative flex rounded-full border border-white/10 bg-[#111111] p-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.key;

                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`relative z-10 rounded-full px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 ${
                        isActive
                          ? "text-black"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute inset-0 -z-10 rounded-full bg-white" />
                      )}
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <Link
                to="/work"
                className="text-[10px] uppercase tracking-[0.18em] text-white/55 transition hover:text-white"
              >
                View all
              </Link>
            </div>

            {activeTab === "posts" ? renderPosts() : renderReels()}
          </div>
        ) : (
          <div
            className="
              flex
              min-h-[300px]
              w-full
              items-center
              justify-center
              rounded-[28px]
              border
              border-white/10
              bg-white/[0.02]
            "
          >
            <p className="text-sm text-white/30">
              No featured videos available.
            </p>
          </div>
        )}

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            to="/work"
            className="
              group
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/[0.02]
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition-all
              duration-200
              hover:border-white/20
              hover:bg-white
              hover:text-black
            "
          >
            View all work
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}