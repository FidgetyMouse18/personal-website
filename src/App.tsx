import { AppShell, Footer, Header, Text, Image } from "@mantine/core";
import React from "react";
import "./css/App.css";
import FancyBackground from "./FancyBackground";
import MainText from "./MainText";
function App() {
  return (
    <div>
      <AppShell header={
        <Header height={70} p="md" style={{position: "absolute", zIndex: 100}}>
          <div style={{ display: "inline-flex", alignItems: 'center', height: '100%' }}>

            <Image src="/logo.png" height={70} fit="contain" />
          </div>
        </Header>
      }>
        <MainText/>
      <FancyBackground/>
      </AppShell>
    </div>
  );
}

export default App;
