import { AppShell, Footer, Header, Text, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";
import "./css/App.css";
import FancyBackground from "./FancyBackground";
import MainText from "./MainText";
function App() {
  const bigDevice = useMediaQuery('(min-width: 900px)')
  let app;
  if(bigDevice) {
    app = <div><MainText />
    <FancyBackground /></div>
  } else {app = "This device is not currently supported"}
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
