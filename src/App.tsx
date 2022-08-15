import { AppShell, Footer, Header, Text, Image, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import "./css/App.css";
import FancyBackground from "./FancyBackground";
import MainText from "./MainText";
import PlanetSim from "./PlanetSim";
function App() {
  const bigDevice = useMediaQuery("(min-width: 900px)");
  let app;
  if (bigDevice) {
    switch (window.location.pathname) {
      case "/":
        app = (
          <div>
            <MainText />
            <FancyBackground />
          </div>
        );
        break;
      case "/planet-sim":
        app = <PlanetSim />;
        break;
      default:
        window.location.pathname = "/";
        app = (
          <div>
            <MainText />
            <FancyBackground />
          </div>
        );
        break;
    }
  } else {
    app = <FancyBackground />;
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
              {bigDevice ? <div
                style={{
                  right: "0%",
                  position: "absolute",
                  marginRight: "25px",
                }}
              >
                <Group>
                <Text color="white" component="a" href="/planet-sim">
                  Planet Sim
                </Text>
                <Text color="white" component="a" href="http://blog.joshuapinti.com/">Blog</Text>
                </Group>
                
              </div> : null }
              
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
