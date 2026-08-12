import Hero from "../components/Hero/Hero";
import Showreel from "../components/Showreel/Showreel";

export default function Home({
  setVideoPlaying,
}) {
  return (
    <main className="bg-black">

      <section id="home">
        <Hero />
      </section>

      <Showreel
        setVideoPlaying={setVideoPlaying}
      />
      

    </main>
  );
}