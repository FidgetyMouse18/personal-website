import { Avatar, Blockquote, Container, Group, List, Space, Text, Title } from "@mantine/core";
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
      <Blockquote cite="Me" p="xl" color="blue">
        I'd like to thank StackOverflow, YouTube, W3Schools and GeeksforGeeks.
        Pretty sure I learnt 90% of my coding skills and knowledge from them.
      </Blockquote>
      <section className="row" />
      <section className="right">
        <Title pb="sm" order={2} style={{color: "white"}}>The Site Stack</Title>
        <List size="xl" color="white">
            <List.Item icon={<Avatar size="md" radius="xl"src="https://reactjs.org/logo-og.png" />}><a href="https://reactjs.org/">ReactJS</a></List.Item>
            <List.Item icon={<Avatar size="md" radius="xl"src="https://avatars.githubusercontent.com/u/79146003?s=280&v=4" />}><a href="https://mantine.dev/">Mantine</a></List.Item>
            <List.Item icon={<Avatar size="md" radius="xl"src="https://pbs.twimg.com/profile_images/1510259524271173638/lgTEVmRi_400x400.jpg" />}><a href="https://threejs.org/">ThreeJS</a></List.Item>
            <List.Item icon={<Avatar size="md" radius="xl"src="https://github.com/jwagner/simplex-noise.js/raw/main/doc/github-header-fs8.png" />}><a href="https://www.npmjs.com/package/simplex-noise">Simplex Noise</a></List.Item>
            <List.Item icon={<Avatar size="md" radius="xl"src="/logo.png" />}><a href="https://get.webgl.org/">Shaders (GLSL & WebGL)</a></List.Item>
        </List>
      </section>
      <section className="left">
      <Title order={2} style={{color: "white"}}>The Planet</Title>
      <Text size="xs" pb="sm" color="white">in the background</Text>
      <Text color="white">The planet carelessly spinning in the background is based off <a href="https://www.youtube.com/playlist?list=PLFt_AvWsXl0cONs3T0By4puYy6GM22ko8">Sebastian Lague's Planet series in Unity</a>.</Text>
      <Text color="white">However, I wanted it in the background using ThreeJS which is very different to Unity's rendering System. So for practical purposes, that planet is using the ideas from Sebastian but the code has mostly be rewritten and can be found on <a href="https://github.com/FidgetyMouse18/personal-website/tree/master/src/Assets/Planet">GitHub</a>.</Text>
      </section>

    </Container>
  );
}

export default MainText;
