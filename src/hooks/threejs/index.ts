import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export const useThree = () => {
  //1. 创建场景
  const scene = new THREE.Scene();
  //2. 创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 10);
  scene.add(camera);

  //3. 添加物体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "0xffff00" });
  // 根据几何体和材质创建物体
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  //4. 渲染场景
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  //5. 控制器
  const controls = new OrbitControls(camera);

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  const render = () => {
    controls.update();
    renderer.render(scene, camera);
  };

  return {
    animate,
    scene,
    render,
  };
};
