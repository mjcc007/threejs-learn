<script setup lang="ts">
import { onMounted } from "vue";
import * as THREE from "three";
// @ts-ignore
import vertex from "@/glsl/vertex.glsl";
// @ts-ignore
// import fragement from "./glsl/fragment.glsl";
import fragement from "@/glsl/line/frgement.glsl";

const camera = new THREE.PerspectiveCamera();
camera.position.z = 1;

const scene = new THREE.Scene();
const clock = new THREE.Clock();

const geometry = new THREE.PlaneGeometry(1, 1);

const uniforms = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new THREE.Vector2() },
};

const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: vertex,
  fragmentShader: fragement,
});

var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);

const onWindowResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
};

const animate = () => {
  requestAnimationFrame(animate);
  render();
};

const render = () => {
  uniforms.u_time.value += clock.getDelta();
  renderer.render(scene, camera);
};

onMounted(() => {
  const container = document.getElementById("container");
  container?.appendChild(renderer.domElement);
  onWindowResize();
  window.addEventListener("resize", onWindowResize, false);
  animate();
});
</script>

<template>
  <div id="container"></div>
</template>

<style scoped></style>
