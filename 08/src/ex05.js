import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

// ----- 주제: HemisphereLight
// - 은은하게 비춰주는 라이트
// - 그림자가 없음
// - 반씩 나눠서 비춤(색 두 개 인자로 들어감)

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // 그림자 설정
  // renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type=THREE.PCFShadowMap // 기본값
  // renderer.shadowMap.type=THREE.BasicShadowMap; // 성능 좋음
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
  // const ambientLight = new THREE.AmbientLight('white', 0.5); // 전체적으로 은은하게 단색으로 깔아주는 조명(Base)
  // scene.add(ambientLight);

  const light = new THREE.HemisphereLight('pink', 'lime', 1);
  light.position.y = 3;
  scene.add(light);

  const lightHelper = new THREE.HemisphereLightHelper(light);
  scene.add(lightHelper);

  // 그림자 설정
  // light.castShadow = true;
  // mapSize: 클수록 해상도 높아짐 - 픽셀 설정
  // light.shadow.mapSize.width = 1024; // 기본값 512
  // light.shadow.mapSize.height = 1024;
  // light.shadow.radius = 15; // 가장자리 부드럽게 처리
  // light.shadow.radius = 15; // 기본값인 THREE.PCFShadowMap에서만 적용
  // light.shadow.camera.near = 1;
  // light.shadow.camera.far = 15; // 여유롭게

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Geometry
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

  // Material
  const material1 = new THREE.MeshStandardMaterial({ color: 'white' });
  const material2 = new THREE.MeshStandardMaterial({ color: 'white' });
  const material3 = new THREE.MeshStandardMaterial({ color: 'white' });

  // Mesh
  const plane = new THREE.Mesh(planeGeometry, material1);
  const box = new THREE.Mesh(boxGeometry, material2);
  const sphere = new THREE.Mesh(sphereGeometry, material3);

  plane.rotation.x = -Math.PI * 0.5;
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);

  // 그림자 설정
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  scene.add(plane, box, sphere);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(light.position, 'x', -5, 5).name('라이트 X');
  gui.add(light.position, 'y', -5, 5).name('라이트 Y');
  gui.add(light.position, 'z', -5, 5).name('라이트 Z');

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // const delta = clock.getDelta();
    const time = clock.getElapsedTime();
    // 각도를 계속 늘림
    // light.position.x = Math.cos(time) * 5; // x좌표
    // light.position.z = Math.sin(time) * 5; // y좌표(3차원)

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
