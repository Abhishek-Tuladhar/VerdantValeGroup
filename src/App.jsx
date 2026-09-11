import { useEffect } from "react";
import Header from "./components/Header/Header";
import Hero from "./Page/Hero/Hero";
import IntroScreen from "./components/Introscreen/Introscreen";
import AboutUs from "./Page/AboutUs/AboutUs";
import OurMission from "./Page/OurMission/OurMission";
import Sectors from "./Page/Sectors/Sectors";

function App() {
  useEffect(() => {
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }, []);

  return (
    <IntroScreen>
      <Header />
      <Hero />
      <AboutUs />
      <OurMission />
      <Sectors />
    </IntroScreen>
  );
}

export default App;