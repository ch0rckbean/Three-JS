import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

// ----- 주제: DragControls

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
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls;
  const meshes = [];
  const controls = new DragControls(meshes, camera, renderer.domElement);
  // 파라미터
  // 1. 어떤 Mesh Drag 할 건지 : 배열로 삽입

  // Event
  controls.addEventListener('dragstart', (e) => {
    console.log(e.object.name);
  });

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let mesh;
  let material;

  for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
      // 배경 검정이면 안 보이므로 최소 50으로 설정
      color: `rgb(
				${50 + Math.floor(Math.random() * 205)},
				${50 + Math.floor(Math.random() * 205)},
				${50 + Math.floor(Math.random() * 205)}
			)`,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;
    mesh.name = `box=${i}`;
    scene.add(mesh);

    meshes.push(mesh);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

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
