import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ----- 주제: MeshToonMaterial(만화 느낌)

export default function example() {
  // 텍스처 이미지 로드
  const loadingManager = new THREE.LoadingManager();
  // 여러 이미지 로드 시 Control 용이
  loadingManager.onStart = () => {
    console.log('로드 시작');
  };
  loadingManager.onProgress = (img) => {
    console.log(img + ' 로드');
  };
  loadingManager.onLoad = () => {
    console.log('로드 완료');
  };
  loadingManager.onError = () => {
    console.log('에러');
  };

  const textureLoader = new THREE.TextureLoader(loadingManager);
  // 톤 다채롭게
  const gradientTxt = textureLoader.load('/textures/gradient.png');
  // 다시 만화 느낌 살리기
  gradientTxt.magFilter = THREE.NearestFilter;

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
  scene.background = new THREE.Color('black');

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
  const directionalLight = new THREE.DirectionalLight('white', 3);
  directionalLight.position.set(1, 1, 2);
  scene.add(directionalLight, ambientLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  const geometry = new THREE.ConeGeometry(1, 2, 128);
  const material = new THREE.MeshToonMaterial({
    color: 'plum',
    gradientMap: gradientTxt,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

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
