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
  ColorInput,
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
          {i === 0 ? null : (
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
                  shapeSettings.noiseLayers[i].useFirstAsMask =
                    e.target.checked;
                  this.setState({ shapeSettings: shapeSettings }, () => {
                    this.remakePlanet();
                  });
                }}
              />
            </Group>
          )}
          {i === 0 ? null : (
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
          )}

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
            <ColorInput
              label="Water Color"
              defaultValue={`rgb(${this.state.shapeSettings.colors.water.r},${this.state.shapeSettings.colors.water.g},${this.state.shapeSettings.colors.water.b})`}
              onChange={(color) => {
                var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                var match = matchColors.exec(color);
                if (match !== null) {
                  let temp = this.state.shapeSettings;
                  temp.colors.water = {r: parseInt(match[1]),g: parseInt(match[2]), b: parseInt(match[3])}
                  this.setState({shapeSettings: temp}, () => {this.remakePlanet();})
                }
              }}
              disallowInput
              format="rgb"
            />
            <ColorInput
              label="Sand Color"
              defaultValue={`rgb(${this.state.shapeSettings.colors.sand.r},${this.state.shapeSettings.colors.sand.g},${this.state.shapeSettings.colors.sand.b})`}
              onChange={(color) => {
                var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                var match = matchColors.exec(color);
                if (match !== null) {
                  let temp = this.state.shapeSettings;
                  temp.colors.sand = {r: parseInt(match[1]),g: parseInt(match[2]), b: parseInt(match[3])}
                  this.setState({shapeSettings: temp}, () => {this.remakePlanet();})
                }
              }}
              disallowInput
              format="rgb"
            />
            <ColorInput
              label="Grass Color"
              defaultValue={`rgb(${this.state.shapeSettings.colors.grass.r},${this.state.shapeSettings.colors.grass.g},${this.state.shapeSettings.colors.grass.b})`}
              onChange={(color) => {
                var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                var match = matchColors.exec(color);
                if (match !== null) {
                  let temp = this.state.shapeSettings;
                  temp.colors.grass = {r: parseInt(match[1]),g: parseInt(match[2]), b: parseInt(match[3])}
                  this.setState({shapeSettings: temp}, () => {this.remakePlanet();})
                }
              }}
              disallowInput
              format="rgb"
            />
            <ColorInput
              label="Lower Mountain Color"
              defaultValue={`rgb(${this.state.shapeSettings.colors.lowMt.r},${this.state.shapeSettings.colors.lowMt.g},${this.state.shapeSettings.colors.lowMt.b})`}
              onChange={(color) => {
                var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                var match = matchColors.exec(color);
                if (match !== null) {
                  let temp = this.state.shapeSettings;
                  temp.colors.lowMt = {r: parseInt(match[1]),g: parseInt(match[2]), b: parseInt(match[3])}
                  this.setState({shapeSettings: temp}, () => {this.remakePlanet();})
                }
              }}
              disallowInput
              format="rgb"
            />
            <ColorInput
              label="Mid Mountain Color"
              defaultValue={`rgb(${this.state.shapeSettings.colors.midMt.r},${this.state.shapeSettings.colors.midMt.g},${this.state.shapeSettings.colors.midMt.b})`}
              onChange={(color) => {
                var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                var match = matchColors.exec(color);
                if (match !== null) {
                  let temp = this.state.shapeSettings;
                  temp.colors.midMt = {r: parseInt(match[1]),g: parseInt(match[2]), b: parseInt(match[3])}
                  this.setState({shapeSettings: temp}, () => {this.remakePlanet();})
                }
              }}
              disallowInput
              format="rgb"
            />
            <ColorInput
              label="Upper Mountain Color"
              defaultValue={`rgb(${this.state.shapeSettings.colors.upperMt.r},${this.state.shapeSettings.colors.upperMt.g},${this.state.shapeSettings.colors.upperMt.b})`}
              onChange={(color) => {
                var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
                var match = matchColors.exec(color);
                if (match !== null) {
                  let temp = this.state.shapeSettings;
                  temp.colors.upperMt = {r: parseInt(match[1]),g: parseInt(match[2]), b: parseInt(match[3])}
                  this.setState({shapeSettings: temp}, () => {this.remakePlanet();})
                }
              }}
              disallowInput
              format="rgb"
            />

            {controls}
          </Paper>
        </Container>
      </div>
    );
  }
}

export default PlanetSim;
