import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";

export default function VideoCard({
  video,
  setVideoPlaying,
}) {
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  // -----------------------------------------
  // VIDEO URL
  // -----------------------------------------

  const videoSrc =
    video?.videoUrl ||
    video?.secureUrl ||
    video?.url ||
    video?.src;

  // -----------------------------------------
  // PLAY VIDEO
  // -----------------------------------------

  const playVideo = async () => {
    const element = videoRef.current;

    if (!element) return;

    try {
      await element.play();

      setPlaying(true);

      // Hide navbar
      setVideoPlaying?.(true);
    } catch (error) {
      console.error(
        "Video playback error:",
        error
      );
    }
  };

  // -----------------------------------------
  // PAUSE VIDEO
  // -----------------------------------------

  const pauseVideo = () => {
    const element = videoRef.current;

    if (!element) return;

    element.pause();

    setPlaying(false);

    // Show navbar
    setVideoPlaying?.(false);
  };

  // -----------------------------------------
  // PLAY / PAUSE
  // -----------------------------------------

  const togglePlay = async () => {
    const element = videoRef.current;

    if (!element) return;

    if (element.paused) {
      await playVideo();
    } else {
      pauseVideo();
    }
  };

  // -----------------------------------------
  // MUTE
  // -----------------------------------------

  const toggleMute = () => {
    const element = videoRef.current;

    if (!element) return;

    element.muted = !element.muted;

    setMuted(element.muted);
  };

  // -----------------------------------------
  // FULLSCREEN
  // -----------------------------------------

  const toggleFullscreen = async () => {
    const element = videoRef.current;

    if (!element) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await element.requestFullscreen();
      }
    } catch (error) {
      console.error(
        "Fullscreen error:",
        error
      );
    }
  };

  // -----------------------------------------
  // VIDEO EVENTS
  // -----------------------------------------

  useEffect(() => {
    const element = videoRef.current;

    if (!element) return;

    const handlePlay = () => {
      setPlaying(true);

      // Hide navbar
      setVideoPlaying?.(true);
    };

    const handlePause = () => {
      setPlaying(false);

      // Show navbar
      setVideoPlaying?.(false);
    };

    const handleEnded = () => {
      setPlaying(false);

      // Show navbar after video ends
      setVideoPlaying?.(false);
    };

    element.addEventListener(
      "play",
      handlePlay
    );

    element.addEventListener(
      "pause",
      handlePause
    );

    element.addEventListener(
      "ended",
      handleEnded
    );

    return () => {
      element.removeEventListener(
        "play",
        handlePlay
      );

      element.removeEventListener(
        "pause",
        handlePause
      );

      element.removeEventListener(
        "ended",
        handleEnded
      );
    };
  }, [setVideoPlaying]);

  // -----------------------------------------
  // CLEANUP
  // -----------------------------------------

  useEffect(() => {
    return () => {
      setVideoPlaying?.(false);
    };
  }, [setVideoPlaying]);

  // -----------------------------------------
  // NO VIDEO
  // -----------------------------------------

  if (!videoSrc) {
    return (
      <article className="w-full max-w-[240px]">
        <div
          className="
            flex
            aspect-[9/16]
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
          "
        >
          <p className="px-4 text-center text-xs text-white/30">
            Video unavailable
          </p>
        </div>

        <div className="px-1 pt-3">
          <h2 className="truncate text-sm font-medium text-white/70">
            {video?.title ||
              "Untitled Project"}
          </h2>
        </div>
      </article>
    );
  }

  return (
    <article
      className="
        mx-auto
        w-full
        max-w-[240px]
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ===================================== */}
      {/* VIDEO CONTAINER */}
      {/* ===================================== */}

      <div
        className="
          relative
          mx-auto
          w-[200px]
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-black

          aspect-[9/16]

          sm:w-[210px]
          md:w-[220px]
          lg:w-[230px]
          xl:w-[240px]
        "
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="
            absolute
            inset-0
            h-full
            w-full
            bg-black
            object-contain
          "
          muted={muted}
          playsInline
          preload="metadata"
          onClick={togglePlay}
        />

        {/* ================================= */}
        {/* OVERLAY */}
        {/* ================================= */}

        <div
          className={`
            pointer-events-none
            absolute
            inset-0
            bg-black/10
            transition-opacity
            duration-300

            ${
              hovered
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />

        {/* ================================= */}
        {/* CENTER PLAY BUTTON */}
        {/* ================================= */}

        {!playing && (
          <button
            type="button"
            onClick={playVideo}
            aria-label="Play video"
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-10
              w-10
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              shadow-xl
              transition
              duration-300
              hover:scale-110

              sm:h-11
              sm:w-11
            "
          >
            <Play
              size={16}
              fill="currentColor"
              className="ml-0.5"
            />
          </button>
        )}

        {/* ================================= */}
        {/* CONTROLS */}
        {/* ================================= */}

        <div
          className={`
            absolute
            bottom-0
            left-0
            right-0
            flex
            items-center
            justify-between
            bg-gradient-to-t
            from-black/85
            via-black/30
            to-transparent
            px-3
            pb-3
            pt-8
            transition-all
            duration-300

            ${
              hovered
                ? "translate-y-0 opacity-100"
                : "translate-y-2 opacity-0"
            }
          `}
        >
          {/* LEFT CONTROLS */}

          <div className="flex items-center gap-2">

            {/* PLAY / PAUSE */}

            <button
              type="button"
              onClick={togglePlay}
              aria-label={
                playing
                  ? "Pause video"
                  : "Play video"
              }
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur-md
                transition
                hover:bg-white
                hover:text-black

                sm:h-8
                sm:w-8
              "
            >
              {playing ? (
                <Pause
                  size={12}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={12}
                  fill="currentColor"
                  className="ml-0.5"
                />
              )}
            </button>

            {/* MUTE */}

            <button
              type="button"
              onClick={toggleMute}
              aria-label={
                muted
                  ? "Unmute video"
                  : "Mute video"
              }
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                backdrop-blur-md
                transition
                hover:bg-white
                hover:text-black

                sm:h-8
                sm:w-8
              "
            >
              {muted ? (
                <VolumeX size={12} />
              ) : (
                <Volume2 size={12} />
              )}
            </button>
          </div>

          {/* FULLSCREEN */}

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Fullscreen"
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur-md
              transition
              hover:bg-white
              hover:text-black

              sm:h-8
              sm:w-8
            "
          >
            <Maximize2 size={12} />
          </button>
        </div>
      </div>

      {/* ===================================== */}
      {/* VIDEO INFO */}
      {/* ===================================== */}

      <div className="px-1 pt-3">

        <div className="flex items-start justify-between gap-2">

          <h2
            className="
              min-w-0
              truncate
              text-sm
              font-medium
              tracking-[-0.02em]
              text-white
            "
          >
            {video?.title ||
              "Untitled Project"}
          </h2>

          {video?.category && (
            <span
              className="
                shrink-0
                rounded-full
                border
                border-white/10
                px-2
                py-1
                text-[8px]
                uppercase
                tracking-[0.12em]
                text-white/40
              "
            >
              {video.category}
            </span>
          )}
        </div>

        {video?.description && (
          <p
            className="
              mt-1.5
              line-clamp-2
              text-[11px]
              leading-relaxed
              text-white/35
            "
          >
            {video.description}
          </p>
        )}
      </div>
    </article>
  );
}