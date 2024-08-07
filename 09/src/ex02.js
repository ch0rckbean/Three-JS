import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PreventDragClick } from './PreventDragClick';
// ----- 주제: Raycaster
// 3. 클릭한 메쉬 감지하기
// 4. 드래그 클릭 방지
// 5. 드래그 클릭 방지 모듈화

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
  camera.position.x = 5;
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

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  scene.add(controls);

  // Mesh
  //Material
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshStandardMaterial({ color: 'plum' });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.name = 'box';

  const torusGeometry = new THREE.TorusGeometry(2, 0.5, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({ color: 'lime' });
  const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
  torusMesh.name = 'torus';
  scene.add(boxMesh, torusMesh);

  const meshes = [boxMesh, torusMesh];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(); // 2차원 - x,y 만 갖고 있음
  // console.log(mouse)

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // const delta = clock.getDelta();
    const time = clock.getElapsedTime();
    boxMesh.position.y = Math.sin(time) * 2;
    torusMesh.position.y = Math.cos(time) * 2;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function checkIntersects() {
    if (preventDragClick.mouseMoved) return;

    raycaster.setFromCamera(mouse, camera);
    // mouse Evt 감지(origin이 카메라에 있다고 생각)
    // mouse: 클릭한 지점
    const intersects = raycaster.intersectObjects(meshes);
    for (const item of intersects) {
      console.log(item.object.name);
      item.object.material.color.set('blue');
      // == if(intersects[0]){
      // console.log(intersects[0].object.name)
      // }
      break;
      // 두 개 겹칠 시, 처음 만나는 item만 해당 되도록 break 추가
      // 처음 나오는 아이템만 찍고 for문 종료
    }
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);
  canvas.addEventListener('click', (e) => {
    console.log(e.clientX, e.clientY); //마우스 클릭 위치
    // y 좌표 변환 필요
    mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
    // console.log(mouse);
    checkIntersects();
  });
  const preventDragClick = new PreventDragClick(canvas);
  draw();
}
