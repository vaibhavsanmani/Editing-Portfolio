import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const videosCollection = collection(db, "videos");

export async function createVideo(videoData) {
  const docRef = await addDoc(videosCollection, {
    ...videoData,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getVideos() {
  const q = query(
    videosCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function deleteVideo(videoId) {
  await deleteDoc(doc(db, "videos", videoId));
}