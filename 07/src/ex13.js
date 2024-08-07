import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// ----- 주제: MeshStandardMaterial에 효과 더하기

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
  const normalTxt = textureLoader.load(
    '/textures/lava/Stylized_Lava_001_normal.png'
  );
  const ambientTxt = textureLoader.load(
    '/textures/lava/Stylized_Lava_001_ambientOcclusion.png'
  );
  const baseColorTxt = textureLoader.load(
    '/textures/lava/Stylized_Lava_001_basecolor.png'
  );
  const emissiveTxt = textureLoader.load(
    '/textures/lava/Stylized_Lava_001_emissive.png'
  );
  const heightTxt = textureLoader.load(
    '/textures/lava/Stylized_Lava_001_height.png'
  );
  const roughnessTxt = textureLoader.load(
    '/textures/lava/Stylized_Lava_001_roughness.png'
  );

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
  const geometry = new THREE.BoxGeometry(3, 3, 3);
  const material = new THREE.MeshBasicMaterial({
    map: normalTxt,
    normalMap: normalTxt, // 입체감
    // roughness: 0.3, // 거칠기
    roughness: roughnessTxt,
    metalness: 0.3, // 메탈
    // aoMap: ambientTxt, // 어둡게
    // aoMapIntensity: 10,
    color: 'pink', // 따로 적용 O
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
