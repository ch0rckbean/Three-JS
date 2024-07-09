import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: Geometry 형태 조작하기

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
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  // (카메라, canvas)

  // Mesh
  // const geometry = new THREE.SphereGeometry(5, 64, 64);
  const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 'seagreen',
    side: THREE.DoubleSide,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // console.log(geometry.attributes.position.array);
  // x,y,z 포지션 값 다 갖고 있어서 3개 숫자씩 끊어서 봐야 함
  const positionArr = geometry.attributes.position.array;

  const randomArr = [];

  for (let i = 0; i < positionArr.length; i += 3) {
    // Vertex 한개의 x,y,z 좌표 랜덤 조정
    positionArr[i] = positionArr[i] + (Math.random() - 0.5) * 0.2; //x
    positionArr[i + 1] = positionArr[i + 1] + (Math.random() - 0.5) * 0.2; //y
    positionArr[i + 2] = positionArr[i + 2] + (Math.random() - 0.5) * 0.2; //z

    // 각 값 조정 위해 미리 랜덤 값 세팅 되어 있어야
    randomArr[i] = (Math.random() - 0.5) * 0.2;
    randomArr[i + 1] = (Math.random() - 0.5) * 0.2;
    randomArr[i + 2] = (Math.random() - 0.5) * 0.2;
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime() * 3;
    for (let i = 0; i < positionArr.length; i += 3) {
      // 그래프가 파형이므로 사용(진동)
      // - x축: 각도
      positionArr[i] += Math.sin(time + randomArr[i] * 10) * 0.002;
      positionArr[i + 1] += Math.sin(time + randomArr[i + 1] * 10) * 0.002;
      positionArr[i + 2] += Math.sin(time + randomArr[i + 2] * 10) * 0.002;
    }

    geometry.attributes.position.needsUpdate = true;

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
