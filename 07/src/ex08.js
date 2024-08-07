import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ----- 주제: 텍스처 이미지 변환

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
  const texture = textureLoader.load(
    '/textures/ground/Stylized_Ground_002_basecolor.png'
  );
  // 텍스처 변환
  // repeat 해야 자연스럽게 채워짐
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  // texture.offset.x = 0.3; // 이미지 위치 이동(자연스럽게 안 채워짐)
  // texture.offset.y = 0.3;

  texture.repeat.x = 2;
  texture.repeat.x = 3;

  // texture.rotation=Math.PI * 0.25;
  texture.rotation = THREE.MathUtils.degToRad(30);
  texture.center.x = 0.5; // 중앙 기준 회전
  texture.center.y = 0.5;

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
  scene.background = new THREE.Color('white');

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
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({
    // color: 'orangered',
    map: texture,
  });
  const mesh = new THREE.Mesh(geometry, material);

  scene.add(mesh);
  mesh.position.x = -1.5;

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
