import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ----- 주제: CanvasTexture

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // CanvasTexture(1)
  const textCanvas = document.createElement('canvas'); // canvas 자체 생성
  const textContext = textCanvas.getContext('2d');
  textCanvas.width = 500;
  textCanvas.height = 500;
  const canvasTexture = new THREE.CanvasTexture(textCanvas);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // CanvasTexture(2)
  const material = new THREE.MeshBasicMaterial({
    map: canvasTexture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    // CanvasTexture Animation
    material.map.needsUpdate = true;

    // CanvasTexture(3)
    textContext.fillStyle = 'green';
    textContext.fillRect(0, 0, 500, 500);

    // 흰 점 + CanvasTexture Animation
    textContext.fillStyle = 'white';
    textContext.fillRect(time * 50, 100, 50, 50);

    textContext.font = 'bold 50px sans-serif';
    textContext.fillText('하리봉봉', 300, 300);

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
