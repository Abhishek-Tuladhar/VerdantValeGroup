import { useEffect } from "react";
import { ActiveSectorProvider } from "./context/ActiveSectorContext";
import Header from "./components/Header/Header";
import Hero from "./Page/Hero/Hero";
import IntroScreen from "./components/Introscreen/Introscreen";
import AboutUs from "./Page/AboutUs/AboutUs";
import OurMission from "./Page/OurMission/OurMission";
import Sectors from "./Page/Sectors/Sectors";
import Footer from "./components/Footer/Footer";

function App() {
  useEffect(() => {
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }, []);

  return (
    <IntroScreen>
      <ActiveSectorProvider>
        <Header />
        <Hero />
        <AboutUs />
        <OurMission />
        <Sectors />
      </ActiveSectorProvider>

      <Footer />
    </IntroScreen>
  );
}

export default App;
