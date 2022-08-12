import {
  Avatar,
  Blockquote,
  Container,
  Group,
  List,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import "./css/MainText.css";

function MainText() {
  return (
    <Container className="main">
      <Space h="xl" />
      <Space h="xl" />
      <Container className="intro" m="xl">
        <Title style={{ color: "white" }} order={1}>
          Joshua Pinti
        </Title>
        <Text size="xl" color="white">
          Welcome to my Portfolio Site.
        </Text>
      </Container>
      <Blockquote cite="Me" p="xl" color="blue" style={{ color: "white" }}>
        I'd like to thank StackOverflow, YouTube, W3Schools and GeeksforGeeks.
        Pretty sure I learnt 90% of my coding skills and knowledge from them.
      </Blockquote>
      <section className="row" />
      <section className="right">
        <Title pb="sm" order={2} style={{ color: "white" }}>
          The Site Stack
        </Title>
        <List size="xl" color="white">
          <List.Item
            icon={
              <Avatar
                size="md"
                radius="xl"
                src="https://reactjs.org/logo-og.png"
              />
            }
          >
            <a href="https://reactjs.org/">ReactJS</a>
          </List.Item>
          <List.Item
            icon={
              <Avatar
                size="md"
                radius="xl"
                src="https://avatars.githubusercontent.com/u/79146003?s=280&v=4"
              />
            }
          >
            <a href="https://mantine.dev/">Mantine</a>
          </List.Item>
          <List.Item
            icon={
              <Avatar
                size="md"
                radius="xl"
                src="https://pbs.twimg.com/profile_images/1510259524271173638/lgTEVmRi_400x400.jpg"
              />
            }
          >
            <a href="https://threejs.org/">ThreeJS</a>
          </List.Item>
          <List.Item
            icon={
              <Avatar
                size="md"
                radius="xl"
                src="https://github.com/jwagner/simplex-noise.js/raw/main/doc/github-header-fs8.png"
              />
            }
          >
            <a href="https://www.npmjs.com/package/simplex-noise">
              Simplex Noise
            </a>
          </List.Item>
          <List.Item icon={<Avatar size="md" radius="xl" src="/logo.png" />}>
            <a href="https://get.webgl.org/">Shaders (GLSL & WebGL)</a>
          </List.Item>
        </List>
      </section>

      <section className="left">
        <Title order={2} style={{ color: "white" }}>
          The Planet
        </Title>
        <Text size="xs" pb="sm" color="white">
          in the background
        </Text>
        <Text color="white">
          The planet carelessly spinning in the background is based off{" "}
          <a href="https://www.youtube.com/playlist?list=PLFt_AvWsXl0cONs3T0By4puYy6GM22ko8">
            Sebastian Lague's Planet series in Unity
          </a>
          . It is procedurally generated and hence will change slightly every
          time you refresh the page.
        </Text>
        <Text color="white">
          Though it's based on Sebastian's code I wanted it in the background
          using ThreeJS which is very different to Unity's rendering System. So
          for practical purposes, that planet is using the ideas from Sebastian
          but the code has mostly be rewritten and can be found on{" "}
          <a href="https://github.com/FidgetyMouse18/personal-website/tree/master/src/Assets/Planet">
            GitHub
          </a>
          .
        </Text>
      </section>

      <section className="row" />
      <section className="right">
        <Title order={2} style={{ color: "white" }}>
          My Expertise
        </Title>
        <Text size="xs" pb="sm" color="white">
          or at least a brief overview of them
        </Text>
        <SimpleGrid cols={2}>
          <div>
            <Title pb="xs" order={4} style={{ color: "white" }}>
              Languages
            </Title>
            <List size="lg" style={{ color: "white" }}>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png"
                  />
                }
              >
                TypeScript
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png"
                  />
                }
              >
                JavaScript
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://miro.medium.com/max/1200/1*i2skbfmDsHayHhqPfwt6pA.png"
                  />
                }
              >
                Golang
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
                  />
                }
              >
                Python
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://www.avenga.com/wp-content/uploads/2020/11/C-Sharp.png"
                  />
                }
              >
                C#
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://nakedsecurity.sophos.com/wp-content/uploads/sites/2/2022/04/java-1200.png?w=780&h=408&crop=1"
                  />
                }
              >
                Java
              </List.Item>
            </List>
          </div>
          <div>
            <Title pb="xs" order={4} style={{ color: "white" }}>
              Frameworks
            </Title>
            <List size="lg" style={{ color: "white" }}>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://reactjs.org/logo-og.png"
                  />
                }
              >
                ReactJS
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://www.rlogical.com/wp-content/uploads/2021/08/Rlogical-Blog-Images-thumbnail.png"
                  />
                }
              >
                NextJS
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://github.com/wailsapp/wails/raw/master/logo-universal.png"
                  />
                }
              >
                WailsIO
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Electron_Software_Framework_Logo.svg/1200px-Electron_Software_Framework_Logo.svg.png"
                  />
                }
              >
                Electron
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_3de44ba8b1638979671c64379167d0b8/unity.jpeg"
                  />
                }
              >
                Unity
              </List.Item>
              <List.Item
                icon={
                  <Avatar
                    size="sm"
                    radius="xl"
                    src="https://www.gstatic.com/devrel-devsite/prod/v03524b055229ae2d7e36c2f7867401f3447503fd5c5c18fd5cdefd483b35c9b4/firebase/images/touchicon-180.png"
                  />
                }
              >
                Firebase
              </List.Item>
            </List>
          </div>
        </SimpleGrid>
      </section>
      <section className="left">
        <Space h="xl" />
      </section>
    </Container>
  );
}

export default MainText;
