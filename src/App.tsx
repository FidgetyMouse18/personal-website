import { AppShell, Footer, Header, Text, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import "./css/App.css";
import FancyBackground from "./FancyBackground";
import MainText from "./MainText";
import PlanetSim from "./PlanetSim"
function App() {
  const bigDevice = useMediaQuery("(min-width: 900px)");
  let app;
  if (bigDevice) {
    switch(window.location.pathname) {
      case "/":
        app = (
          <div>
            <MainText />
            <FancyBackground />
          </div>
        );
        break;
      case "/planet-sim":
        app = <PlanetSim />
        break
      default:
        window.location.pathname = "/"
        app = (
          <div>
            <MainText />
            <FancyBackground />
          </div>
        );
        break;
    }
    
  } else {
    app = "This device is not currently supported";
  }
  return (
    <div>
      <AppShell
        header={
          <Header
            height={70}
            p="md"
            style={{ position: "absolute", zIndex: 100 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <a href="/">
                <Image src="/logo.png" height={70} fit="contain" />
              </a>
              <div
                style={{
                  right: "0%",
                  position: "absolute",
                  marginRight: "25px",
                }}
              >
                <Text color="white" component="a" href="/planet-sim">Planet Sim</Text>
              </div>
            </div>
          </Header>
        }
      >
        {app}
      </AppShell>
    </div>
  );
}

export default App;
