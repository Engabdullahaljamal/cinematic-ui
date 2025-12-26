import useLenis from "./animation/useLenis.js";

import Hero from "./sections/Hero.jsx";
import ImmersiveStage from "./sections/ImmersiveStage.jsx";
import Details from "./sections/Details.jsx";
import Final from "./sections/Final.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Loader from "./components/Loader.jsx";
import StatsStage from "./sections/StatsStage.jsx";




export default function App() {
  useLenis();
  const BASE = import.meta.env.BASE_URL;
  return (
    <>
      <Loader videoSrc={`${BASE}cinematic-loop-2.mp4`} minMs={800} maxMs={3500} />
      <ScrollProgress />

      <main>
        <Hero />
        <ImmersiveStage />
        <StatsStage />
        <Details />
        <Final />
      </main>
    </>
  );
}
