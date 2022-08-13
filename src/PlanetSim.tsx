import {
  Container,
  Paper,
  Title,
  Text,
  SimpleGrid,
  NumberInput,
  Checkbox,
  NativeSelect,
  Stack,
  Group,
  Button,
  Center,
} from "@mantine/core";
import { Component, ReactNode } from "react";
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Planet from "./Assets/Planet";
import { ShapeSettings } from "./Assets/Planet/Types/ShapeSettings";
import "./css/PlanetSim.css";

const shapeSettings: ShapeSettings = require("./Assets/Planet/Configs/ShapeSettings.json");

interface props {}

interface state {
  shapeSettings: ShapeSettings;
  resolution: number;
}

class PlanetSim extends Component<props, state> {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer | null;
  controls: OrbitControls | null;
  planet: Planet | null;
  constructor(props: any) {
    super(props);
    this.state = { shapeSettings: shapeSettings, resolution: 128 };
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = null;
    this.controls = null;
    this.planet = null;
    this.camera.position.setZ(30);

    this.animate = this.animate.bind(this);
  }

  componentDidMount(): void {
    this.renderer = new WebGLRenderer({
      //@ts-ignore
      canvas: document.querySelector("#bg"),
    });

    if (!this.renderer) return;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.planet = new Planet(
      this.scene,
      this.state.shapeSettings,
      this.state.resolution
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);

    if (!this.renderer) return;
    this.renderer.render(this.scene, this.camera);

    if (!this.controls) return;
    if (!this.planet) return;

    let planPos = this.planet.GetPos();
    this.controls.target.set(planPos.x, planPos.y, planPos.z);

    this.controls.update();
  }

  remakePlanet() {
    this.scene.clear();
    this.planet?.ChangeSettings(this.state.shapeSettings);
    this.planet?.Initialize();
  }

  render(): ReactNode {
    let controls = this.state.shapeSettings.noiseLayers.map((noiseLayer, i) => {
      return (
        <div>
          <Title p="sm" order={4} style={{ color: "white" }}>
            Noise Layer {i + 1}
          </Title>
          <Group position="center" grow pl="sm">
            <Text pb="sm" color="white">
              First Layer as Mask
            </Text>
            <Checkbox
              pb="sm"
              checked={noiseLayer.useFirstAsMask}
              onChange={(e) => {
                if (!e) return;
                let shapeSettings: ShapeSettings = this.state.shapeSettings;
                shapeSettings.noiseLayers[i].useFirstAsMask = e.target.checked;
                this.setState({ shapeSettings: shapeSettings }, () => {

                  this.remakePlanet();
                });
              }}
            />
          </Group>

          <Group position="center" grow pl="sm">
            <Text pb="sm" color="white">
              Noise Type
            </Text>
            <NativeSelect
              pb="sm"
              data={["Simple", "Rigid"]}
              value={noiseLayer.noiseSettings.type}
              onChange={(e) => {
                if (!e) return;
                let shapeSettings: ShapeSettings = this.state.shapeSettings;
                shapeSettings.noiseLayers[i].noiseSettings.type =
                  e.target.value;
                  this.setState({ shapeSettings: shapeSettings }, () => {

                    this.remakePlanet();
                  });
              }}
            />
          </Group>
          <Group position="center" grow pl="sm">
            <Text pb="sm" color="white">
              Strength
            </Text>
            <NumberInput
              step={0.01}
              precision={2}
              pb="sm"
              stepHoldDelay={500}
              stepHoldInterval={100}
              value={noiseLayer.noiseSettings.strength}
              onChange={(e) => {
                if (!e) return;
                let shapeSettings: ShapeSettings = this.state.shapeSettings;
                shapeSettings.noiseLayers[i].noiseSettings.strength = e;
                this.setState({ shapeSettings: shapeSettings }, () => {

                  this.remakePlanet();
                });
              }}
            />
          </Group>
          <Group position="center" grow pl="sm">
            <Text pb="sm" color="white">
              Base Roughness
            </Text>
            <NumberInput
              step={0.01}
              precision={2}
              pb="sm"
              stepHoldDelay={500}
              stepHoldInterval={100}
              value={noiseLayer.noiseSettings.baseRoughness}
              onChange={(e) => {
                if (!e) return;
                let shapeSettings: ShapeSettings = this.state.shapeSettings;
                shapeSettings.noiseLayers[i].noiseSettings.baseRoughness = e;
                this.setState({ shapeSettings: shapeSettings }, () => {

                  this.remakePlanet();
                });
              }}
            />
          </Group>

          <Group position="center" grow pl="sm">
            <Text pb="sm" color="white">
              Roughness
            </Text>
            <NumberInput
              step={0.01}
              precision={2}
              pb="sm"
              stepHoldDelay={500}
              stepHoldInterval={100}
              value={noiseLayer.noiseSettings.roughness}
              onChange={(e) => {
                if (!e) return;
                let shapeSettings: ShapeSettings = this.state.shapeSettings;
                shapeSettings.noiseLayers[i].noiseSettings.roughness = e;
                this.setState({ shapeSettings: shapeSettings }, () => {

                  this.remakePlanet();
                });
              }}
            />
          </Group>

          <Group position="center" grow pl="sm">
            <Text pb="sm" color="white">
              Octaves
            </Text>
            <NumberInput
              step={1}
              precision={0}
              pb="sm"
              stepHoldDelay={500}
              stepHoldInterval={100}
              value={noiseLayer.noiseSettings.octaves}
              onChange={(e) => {
                if (!e) return;
                let shapeSettings: ShapeSettings = this.state.shapeSettings;
                shapeSettings.noiseLayers[i].noiseSettings.octaves = e;
                this.setState({ shapeSettings: shapeSettings }, () => {

                  this.remakePlanet();
                });
              }}
            />
          </Group>

          <Group position="center" grow pl="sm">
            <Text pb="sm" color="white">
              Persistance
            </Text>
            <NumberInput
              step={0.01}
              precision={2}
              pb="sm"
              stepHoldDelay={500}
              stepHoldInterval={100}
              value={noiseLayer.noiseSettings.persistance}
              onChange={(e) => {
                if (!e) return;
                let shapeSettings: ShapeSettings = this.state.shapeSettings;
                shapeSettings.noiseLayers[i].noiseSettings.persistance = e;
                this.setState({ shapeSettings: shapeSettings }, () => {

                  this.remakePlanet();
                });
              }}
            />
          </Group>

          <Group position="center" grow pl="sm">
            <Text pb="sm" color="white">
              Min Value
            </Text>
            <NumberInput
              step={0.01}
              precision={2}
              pb="sm"
              stepHoldDelay={500}
              stepHoldInterval={100}
              value={noiseLayer.noiseSettings.minValue}
              onChange={(e) => {
                if (!e) return;
                let shapeSettings: ShapeSettings = this.state.shapeSettings;
                shapeSettings.noiseLayers[i].noiseSettings.minValue = e;
                this.setState({ shapeSettings: shapeSettings }, () => {

                  this.remakePlanet();
                });
              }}
            />
          </Group>
        </div>
      );
    });

    return (
      <div>
        <canvas id="bg"></canvas>
        <Container style={{ position: "fixed", right: 0, padding: 25 }}>
          <Paper
            withBorder
            p="sm"
            className="scrollable"
            style={{ maxHeight: "80vh" }}
          >
            <Title p="sm" style={{ color: "white" }} order={3}>
              Settings
            </Title>
            <Center pb="sm">
            <Button
              onClick={() => {
                this.planet?.ResetNoise();
                this.remakePlanet();
              }}
            >
              Generate Planet
            </Button>
            </Center>
            
            <Group position="center" grow pl="sm">
              <Text pb="sm" color="white">
                Planet Radius
              </Text>
              <NumberInput
                pb="sm"
                stepHoldDelay={500}
              stepHoldInterval={100}
                value={this.state.shapeSettings.planetRadius}
                onChange={(e) => {
                  if (!e) return;
                  let shapeSettings: ShapeSettings = this.state.shapeSettings;
                  shapeSettings.planetRadius = e;
                  this.setState({ shapeSettings: shapeSettings }, () => {

                this.remakePlanet();
              });
                }}
              />
            </Group>
            <Group position="center" grow pl="sm">
              <Text pb="sm" color="white">
                Planet Resolution
              </Text>
              <NumberInput
                pb="sm"
                stepHoldDelay={500}
              stepHoldInterval={100}
                value={this.state.resolution}
                onChange={(e) => {
                  if (!e) return;

                  this.setState({ resolution: e }, () => {
                    this.scene.clear();
                    this.planet?.ChangeResolution(this.state.resolution);
                    this.planet?.Initialize();
                  });
                }}
              />
            </Group>

            {controls}
          </Paper>
        </Container>
      </div>
    );
  }
}

export default PlanetSim;
