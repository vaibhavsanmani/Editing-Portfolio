import { useEffect, useState } from "react";

import { signOut } from "firebase/auth";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";

import {
  Upload,
  LogOut,
  CheckCircle2,
  Loader2,
  Video,
  GripVertical,
  Save,
  Trash2,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { auth, db } from "../../firebase/firebase";

import { uploadVideo } from "../../services/cloudinary";


// ============================================================
// SORTABLE VIDEO CARD
// ============================================================

function SortableVideo({
  video,
  handleDeleteVideo,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: video.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/[0.025]
        p-4
      "
    >
      {/* DRAG HANDLE */}

      <button
        type="button"
        {...attributes}
        {...listeners}
        className="
          flex
          h-10
          w-10
          shrink-0
          cursor-grab
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          text-white/30
          transition
          hover:bg-white/[0.05]
          hover:text-white
          active:cursor-grabbing
        "
        title="Drag to reorder"
      >
        <GripVertical size={18} />
      </button>


      {/* VIDEO PREVIEW */}

      <div
        className="
          h-20
          w-14
          shrink-0
          overflow-hidden
          rounded-xl
          bg-black
        "
      >
        <video
          src={video.videoUrl || video.secureUrl}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
      </div>


      {/* INFORMATION */}

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-medium text-white">
          {video.title || "Untitled Video"}
        </h3>

        <p className="mt-1 text-xs text-white/30">
          {video.category || "Other"}
        </p>
      </div>


      {/* POSITION */}

      <div
        className="
          hidden
          shrink-0
          text-xs
          uppercase
          tracking-[0.15em]
          text-white/20
          sm:block
        "
      >
        #{video.position + 1}
      </div>


      {/* DELETE */}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteVideo(video);
        }}
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-white/10
          text-white/30
          transition
          hover:border-red-500/30
          hover:bg-red-500/10
          hover:text-red-400
        "
        title="Delete video"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
}


// ============================================================
// ADMIN DASHBOARD
// ============================================================

export default function AdminDashboard() {
  const navigate = useNavigate();


  // ==========================================================
  // UPLOAD STATE
  // ==========================================================

  const [file, setFile] = useState(null);

  const [title, setTitle] = useState("");

  const [category, setCategory] =
    useState("Reels");

  const [description, setDescription] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");


  // ==========================================================
  // VIDEO MANAGEMENT STATE
  // ==========================================================

  const [videos, setVideos] =
    useState([]);

  const [loadingVideos, setLoadingVideos] =
    useState(true);

  const [savingOrder, setSavingOrder] =
    useState(false);

  const [orderSaved, setOrderSaved] =
    useState(false);


  // ==========================================================
  // DELETE MODAL
  // ==========================================================

  const [deleteVideo, setDeleteVideo] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);


  // ==========================================================
  // DRAG SENSOR
  // ==========================================================

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );


  // ==========================================================
  // SORT VIDEOS
  // ==========================================================

  const sortVideos = (videoList) => {
    return [...videoList].sort((a, b) => {
      const positionA =
        typeof a.position === "number"
          ? a.position
          : Infinity;

      const positionB =
        typeof b.position === "number"
          ? b.position
          : Infinity;

      // First priority = position

      if (positionA !== positionB) {
        return positionA - positionB;
      }

      // Fallback for old videos

      const timeA =
        a.createdAt?.seconds || 0;

      const timeB =
        b.createdAt?.seconds || 0;

      return timeB - timeA;
    });
  };


  // ==========================================================
  // NORMALIZE POSITIONS
  // ==========================================================

  const normalizeVideos = (videoList) => {
    return videoList.map(
      (video, index) => ({
        ...video,
        position: index,
      })
    );
  };


  // ==========================================================
  // FETCH VIDEOS
  // ==========================================================

  const fetchVideos = async () => {
    try {
      setLoadingVideos(true);

      const snapshot = await getDocs(
        collection(db, "videos")
      );

      const fetchedVideos =
        snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );

      // Sort according to position

      const sortedVideos =
        sortVideos(fetchedVideos);

      // Normalize local positions

      const normalizedVideos =
        normalizeVideos(sortedVideos);

      console.log(
        "ADMIN FIRESTORE ORDER:"
      );

      console.table(
        normalizedVideos.map(
          (video) => ({
            id: video.id,
            title: video.title,
            position: video.position,
          })
        )
      );

      setVideos(normalizedVideos);
    } catch (err) {
      console.error(
        "Error loading videos:",
        err
      );

      setVideos([]);

      setError(
        "Unable to load videos."
      );
    } finally {
      setLoadingVideos(false);
    }
  };


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchVideos();
  }, []);


  // ==========================================================
  // DELETE VIDEO
  // ==========================================================

  const handleDeleteVideo = (video) => {
    setDeleteVideo(video);
  };


  // ==========================================================
  // CONFIRM DELETE
  // ==========================================================

  const confirmDeleteVideo = async () => {
    if (!deleteVideo) return;

    try {
      setDeleting(true);

      setError("");
      setSuccess("");


      // ======================================================
      // DELETE FROM FIRESTORE
      // ======================================================

      await deleteDoc(
        doc(
          db,
          "videos",
          deleteVideo.id
        )
      );


      // ======================================================
      // REMOVE FROM LOCAL STATE
      // ======================================================

      const remainingVideos =
        videos.filter(
          (video) =>
            video.id !== deleteVideo.id
        );


      // ======================================================
      // NORMALIZE POSITIONS
      // ======================================================

      const normalizedVideos =
        normalizeVideos(
          remainingVideos
        );


      // ======================================================
      // SAVE NEW POSITIONS
      // ======================================================

      if (normalizedVideos.length > 0) {
        const batch = writeBatch(db);

        normalizedVideos.forEach(
          (video, index) => {
            const videoRef = doc(
              db,
              "videos",
              video.id
            );

            batch.update(
              videoRef,
              {
                position: index,
                updatedAt:
                  serverTimestamp(),
              }
            );
          }
        );

        await batch.commit();
      }


      // ======================================================
      // UPDATE UI
      // ======================================================

      setVideos(normalizedVideos);

      setDeleteVideo(null);

      setSuccess(
        "Video deleted successfully."
      );
    } catch (err) {
      console.error(
        "Error deleting video:",
        err
      );

      setError(
        err?.message ||
          "Could not delete video."
      );
    } finally {
      setDeleting(false);
    }
  };


  // ==========================================================
  // FILE CHANGE
  // ==========================================================

  const handleFileChange = (e) => {
    const selectedFile =
      e.target.files?.[0];

    setError("");
    setSuccess("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (
      !selectedFile.type.startsWith(
        "video/"
      )
    ) {
      setError(
        "Please select a valid video file."
      );

      setFile(null);

      return;
    }

    setFile(selectedFile);


    // Automatically generate title

    if (!title) {
      const filename =
        selectedFile.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ");

      setTitle(filename);
    }
  };


  // ==========================================================
  // UPLOAD VIDEO
  // ==========================================================

  const handleUpload = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!file) {
      setError(
        "Please select a video."
      );

      return;
    }

    if (!title.trim()) {
      setError(
        "Please enter a video title."
      );

      return;
    }

    try {
      setUploading(true);

      setProgress(0);


      // ======================================================
      // 1. UPLOAD TO CLOUDINARY
      // ======================================================

      const cloudinaryData =
        await uploadVideo(
          file,
          (percentage) => {
            setProgress(
              percentage
            );
          }
        );

      console.log(
        "Cloudinary upload successful:",
        cloudinaryData
      );


      // ======================================================
      // 2. GET FRESH FIRESTORE VIDEOS
      // ======================================================

      const snapshot =
        await getDocs(
          collection(db, "videos")
        );

      const currentVideos =
        snapshot.docs.map(
          (document) => ({
            id: document.id,
            ...document.data(),
          })
        );


      // ======================================================
      // 3. SORT CURRENT VIDEOS
      // ======================================================

      const sortedVideos =
        sortVideos(currentVideos);


      console.log(
        "BEFORE UPLOAD ORDER:"
      );

      console.table(
        sortedVideos.map(
          (video) => ({
            title: video.title,
            position: video.position,
          })
        )
      );


      // ======================================================
      // 4. SHIFT ALL EXISTING VIDEOS
      // ======================================================

      if (sortedVideos.length > 0) {
        const batch = writeBatch(db);

        sortedVideos.forEach(
          (video, index) => {
            const videoRef = doc(
              db,
              "videos",
              video.id
            );

            batch.update(
              videoRef,
              {
                position: index + 1,
                updatedAt:
                  serverTimestamp(),
              }
            );
          }
        );

        await batch.commit();
      }


      // ======================================================
      // 5. CREATE NEW VIDEO AS #1
      // ======================================================

      const videoData = {
        title: title.trim(),

        category,

        description:
          description.trim(),

        videoUrl:
          cloudinaryData.url,

        secureUrl:
          cloudinaryData.url,

        publicId:
          cloudinaryData.publicId,

        duration:
          cloudinaryData.duration || 0,

        format:
          cloudinaryData.format ||
          "mp4",

        width:
          cloudinaryData.width || 0,

        height:
          cloudinaryData.height || 0,

        originalFileName:
          file.name,

        fileSize:
          file.size,

        resourceType:
          "video",

        // ================================================
        // NEW VIDEO IS ALWAYS FIRST
        // ================================================

        position: 0,

        createdAt:
          serverTimestamp(),

        updatedAt:
          serverTimestamp(),
      };


      const newVideoRef =
        await addDoc(
          collection(db, "videos"),
          videoData
        );


      console.log(
        "NEW VIDEO:",
        newVideoRef.id
      );


      // ======================================================
      // SUCCESS
      // ======================================================

      setSuccess(
        "Video uploaded successfully."
      );

      setFile(null);

      setTitle("");

      setDescription("");

      setCategory("Reels");

      setProgress(100);


      const fileInput =
        document.getElementById(
          "video-upload"
        );

      if (fileInput) {
        fileInput.value = "";
      }


      // ======================================================
      // REFRESH ADMIN VIDEOS
      // ======================================================

      await fetchVideos();
    } catch (err) {
      console.error(
        "Upload error:",
        err
      );

      setError(
        err?.message ||
          "Something went wrong while uploading the video."
      );
    } finally {
      setUploading(false);
    }
  };


  // ==========================================================
  // DRAG END
  // ==========================================================

  const handleDragEnd = ({
    active,
    over,
  }) => {
    if (!over) {
      return;
    }

    if (
      active.id === over.id
    ) {
      return;
    }


    // ======================================================
    // FIND OLD POSITION
    // ======================================================

    const oldIndex =
      videos.findIndex(
        (video) =>
          video.id === active.id
      );


    // ======================================================
    // FIND NEW POSITION
    // ======================================================

    const newIndex =
      videos.findIndex(
        (video) =>
          video.id === over.id
      );


    if (
      oldIndex === -1 ||
      newIndex === -1
    ) {
      return;
    }


    // ======================================================
    // MOVE
    // ======================================================

    const reordered =
      arrayMove(
        videos,
        oldIndex,
        newIndex
      );


    // ======================================================
    // NORMALIZE
    // ======================================================

    const updatedVideos =
      normalizeVideos(
        reordered
      );


    console.log(
      "NEW LOCAL ORDER:"
    );

    console.table(
      updatedVideos.map(
        (video) => ({
          title: video.title,
          position: video.position,
        })
      )
    );


    setVideos(
      updatedVideos
    );

    setOrderSaved(false);

    setSuccess("");
  };


  // ==========================================================
  // SAVE ORDER
  // ==========================================================

  const handleSaveOrder =
    async () => {
      if (videos.length === 0) {
        return;
      }

      try {
        setSavingOrder(true);

        setOrderSaved(false);

        setError("");


        // ====================================================
        // NORMALIZE BEFORE SAVING
        // ====================================================

        const normalizedVideos =
          normalizeVideos(
            videos
          );


        // ====================================================
        // BATCH UPDATE
        // ====================================================

        const batch =
          writeBatch(db);


        normalizedVideos.forEach(
          (video, index) => {
            const videoRef =
              doc(
                db,
                "videos",
                video.id
              );

            batch.update(
              videoRef,
              {
                position: index,

                updatedAt:
                  serverTimestamp(),
              }
            );
          }
        );


        // ====================================================
        // COMMIT
        // ====================================================

        await batch.commit();


        // ====================================================
        // REFRESH FROM FIRESTORE
        // ====================================================

        await fetchVideos();


        // ====================================================
        // SUCCESS
        // ====================================================

        setOrderSaved(true);

        setSuccess(
          "Video order saved successfully."
        );


        setTimeout(() => {
          setOrderSaved(false);
        }, 3000);
      } catch (err) {
        console.error(
          "Error saving video order:",
          err
        );

        setError(
          err?.message ||
            "Could not save video order."
        );
      } finally {
        setSavingOrder(false);
      }
    };


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout =
    async () => {
      try {
        await signOut(auth);

        navigate(
          "/admin/login"
        );
      } catch (err) {
        console.error(err);
      }
    };


  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <main
      className="
        min-h-screen
        bg-[#050505]
        px-5
        py-20
        text-white
        md:px-10
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-16
            flex
            items-start
            justify-between
            gap-6
          "
        >
          <div>
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
                Private Area
              </span>
            </div>

            <h1
              className="
                text-5xl
                font-semibold
                tracking-[-0.06em]
                md:text-7xl
              "
            >
              Dashboard
            </h1>

            <p
              className="
                mt-4
                max-w-lg
                text-sm
                leading-relaxed
                text-white/40
              "
            >
              Upload and manage videos
              for your SnipSync portfolio.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              px-5
              py-3
              text-xs
              uppercase
              tracking-[0.15em]
              text-white/50
              transition
              hover:border-white/30
              hover:bg-white
              hover:text-black
            "
          >
            <LogOut size={15} />

            Logout
          </button>
        </div>


        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div
            className="
              mb-6
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-green-500/20
              bg-green-500/5
              px-5
              py-4
              text-sm
              text-green-400
            "
          >
            <CheckCircle2 size={18} />

            {success}
          </div>
        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-500/20
              bg-red-500/5
              px-5
              py-4
              text-sm
              text-red-400
            "
          >
            {error}
          </div>
        )}


        {/* =================================================
            UPLOAD CARD
        ================================================= */}

        <div
          className="
            rounded-[2rem]
            border
            border-white/10
            bg-white/[0.025]
            p-6
            md:p-10
          "
        >
          <div className="mb-10">
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <Video size={20} />

              <h2
                className="
                  text-2xl
                  font-medium
                  tracking-[-0.03em]
                "
              >
                Upload Video
              </h2>
            </div>

            <p
              className="
                mt-2
                text-sm
                text-white/35
              "
            >
              Upload a video to Cloudinary
              and automatically add it to
              your Work page.
            </p>
          </div>


          <form
            onSubmit={handleUpload}
            className="space-y-7"
          >

            {/* FILE */}

            <div>
              <label
                htmlFor="video-upload"
                className="
                  mb-3
                  block
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Video
              </label>

              <label
                htmlFor="video-upload"
                className="
                  group
                  flex
                  min-h-[180px]
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-3xl
                  border
                  border-dashed
                  border-white/15
                  bg-white/[0.02]
                  px-5
                  transition
                  hover:border-white/30
                  hover:bg-white/[0.04]
                "
              >
                <Upload
                  size={28}
                  className="
                    mb-4
                    text-white/40
                    transition
                    group-hover:text-white
                  "
                />

                <span
                  className="
                    text-sm
                    text-white/70
                  "
                >
                  {file
                    ? file.name
                    : "Choose a video"}
                </span>

                <span
                  className="
                    mt-2
                    text-xs
                    text-white/25
                  "
                >
                  MP4, MOV, WebM
                </span>

                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={
                    handleFileChange
                  }
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>


            {/* TITLE */}

            <div>
              <label
                htmlFor="video-title"
                className="
                  mb-3
                  block
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Title
              </label>

              <input
                id="video-title"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="Weekend at Kolhapuri Chav"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-5
                  py-4
                  text-sm
                  outline-none
                  transition
                  placeholder:text-white/20
                  focus:border-white/30
                "
                disabled={uploading}
              />
            </div>


            {/* CATEGORY */}

            <div>
              <label
                htmlFor="video-category"
                className="
                  mb-3
                  block
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Category
              </label>

              <select
                id="video-category"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="
                  w-full
                  appearance-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-5
                  py-4
                  text-sm
                  text-white
                  outline-none
                  focus:border-white/30
                "
                disabled={uploading}
              >
                <option
                  value="Reels"
                  className="bg-black"
                >
                  Reels
                </option>

                <option
                  value="Commercial"
                  className="bg-black"
                >
                  Commercial
                </option>

                <option
                  value="Social Media"
                  className="bg-black"
                >
                  Social Media
                </option>

                <option
                  value="Brand"
                  className="bg-black"
                >
                  Brand
                </option>

                <option
                  value="Other"
                  className="bg-black"
                >
                  Other
                </option>
              </select>
            </div>


            {/* DESCRIPTION */}

            <div>
              <label
                htmlFor="video-description"
                className="
                  mb-3
                  block
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Description
              </label>

              <textarea
                id="video-description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Short description of this project..."
                rows={4}
                className="
                  w-full
                  resize-none
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-5
                  py-4
                  text-sm
                  outline-none
                  transition
                  placeholder:text-white/20
                  focus:border-white/30
                "
                disabled={uploading}
              />
            </div>


            {/* PROGRESS */}

            {uploading && (
              <div>
                <div
                  className="
                    mb-3
                    flex
                    justify-between
                    text-xs
                    text-white/40
                  "
                >
                  <span>
                    Uploading...
                  </span>

                  <span>
                    {progress}%
                  </span>
                </div>

                <div
                  className="
                    h-1
                    overflow-hidden
                    rounded-full
                    bg-white/10
                  "
                >
                  <div
                    className="
                      h-full
                      bg-white
                      transition-all
                      duration-300
                    "
                    style={{
                      width:
                        `${progress}%`,
                    }}
                  />
                </div>
              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={uploading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-white
                px-6
                py-4
                text-sm
                font-medium
                text-black
                transition
                hover:bg-white/90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {uploading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />

                  Upload Video
                </>
              )}
            </button>
          </form>
        </div>


        {/* =================================================
            MANAGE VIDEOS
        ================================================= */}

        <div
          className="
            mt-10
            rounded-[2rem]
            border
            border-white/10
            bg-white/[0.025]
            p-6
            md:p-10
          "
        >

          {/* HEADER */}

          <div
            className="
              mb-8
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <GripVertical size={20} />

                <h2
                  className="
                    text-2xl
                    font-medium
                    tracking-[-0.03em]
                  "
                >
                  Manage Videos
                </h2>
              </div>

              <p
                className="
                  mt-2
                  text-sm
                  text-white/35
                "
              >
                Drag and drop videos
                to change their order.
              </p>
            </div>


            {/* SAVE */}

            <button
              type="button"
              onClick={
                handleSaveOrder
              }
              disabled={
                savingOrder ||
                videos.length === 0
              }
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-full
                bg-white
                px-5
                py-3
                text-xs
                font-medium
                text-black
                transition
                hover:bg-white/90
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {savingOrder ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <Save size={15} />

                  Save Order
                </>
              )}
            </button>
          </div>


          {/* ORDER SAVED */}

          {orderSaved && (
            <div
              className="
                mb-6
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-green-500/20
                bg-green-500/5
                px-5
                py-4
                text-sm
                text-green-400
              "
            >
              <CheckCircle2 size={18} />

              Video order saved successfully.
            </div>
          )}


          {/* LOADING */}

          {loadingVideos ? (
            <div
              className="
                flex
                items-center
                justify-center
                py-16
              "
            >
              <Loader2
                size={24}
                className="
                  animate-spin
                  text-white/30
                "
              />
            </div>
          ) : videos.length === 0 ? (

            /* EMPTY */

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.02]
                py-16
                text-center
              "
            >
              <Video
                size={28}
                className="
                  mx-auto
                  mb-4
                  text-white/20
                "
              />

              <p
                className="
                  text-sm
                  text-white/30
                "
              >
                No videos uploaded yet.
              </p>
            </div>

          ) : (

            /* VIDEOS */

            <DndContext
              sensors={sensors}
              collisionDetection={
                closestCenter
              }
              onDragEnd={
                handleDragEnd
              }
            >
              <SortableContext
                items={videos.map(
                  (video) =>
                    video.id
                )}
                strategy={
                  verticalListSortingStrategy
                }
              >
                <div className="space-y-3">

                  {videos.map(
                    (video) => (
                      <SortableVideo
                        key={video.id}
                        video={video}
                        handleDeleteVideo={
                          handleDeleteVideo
                        }
                      />
                    )
                  )}

                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>


      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {deleteVideo && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/70
            px-5
            backdrop-blur-sm
          "
          onClick={() => {
            if (!deleting) {
              setDeleteVideo(null);
            }
          }}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-[2rem]
              border
              border-white/10
              bg-[#0b0b0b]
              p-7
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <div
                  className="
                    mb-4
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500/10
                    text-red-400
                  "
                >
                  <Trash2 size={19} />
                </div>

                <h3
                  className="
                    text-xl
                    font-medium
                    tracking-[-0.03em]
                  "
                >
                  Delete video?
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-white/40
                  "
                >
                  This will remove{" "}

                  <span className="text-white/70">
                    {deleteVideo.title ||
                      "this video"}
                  </span>{" "}

                  from your portfolio.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!deleting) {
                    setDeleteVideo(null);
                  }
                }}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  text-white/30
                  transition
                  hover:bg-white/5
                  hover:text-white
                "
                disabled={deleting}
              >
                <X size={18} />
              </button>
            </div>


            {/* ACTIONS */}

            <div
              className="
                mt-8
                flex
                gap-3
              "
            >
              <button
                type="button"
                onClick={() =>
                  setDeleteVideo(null)
                }
                disabled={deleting}
                className="
                  flex-1
                  rounded-full
                  border
                  border-white/10
                  px-5
                  py-3
                  text-sm
                  text-white/60
                  transition
                  hover:bg-white/5
                  hover:text-white
                  disabled:opacity-40
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  confirmDeleteVideo
                }
                disabled={deleting}
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-red-500
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-red-400
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {deleting ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />

                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />

                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}