import useLenis from "./animation/useLenis.js";

import Hero from "./sections/Hero.jsx";
import ImmersiveStage from "./sections/ImmersiveStage.jsx";
import Details from "./sections/Details.jsx";
import Final from "./sections/Final.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Loader from "./components/Loader.jsx";
import StatsStage from "./sections/StatsStage.jsx";
import Spacer from "./sections/Spacer.jsx";




export default function App() {
  useLenis();

  return (
    <>
      <Loader videoSrc="/cinematic-loop.mp4" minMs={800} maxMs={3500} />
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
