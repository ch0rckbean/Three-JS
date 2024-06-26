import * as THREE from 'three';

// ------ 주제: 브라우저 창 사이즈 변경에 대응하기

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  // const renderer=new THREE.WebGLRenderer({canvas:canvas})
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   console.log(window.devicePixelRatio); // 2
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 고밀도 해상도
  // 삼항연산자 : 성능면 유리

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // Mesh = Geometry + Material
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 'red',
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  renderer.render(scene, camera);

  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  // 이벤트
  window.addEventListener('resize', setSize);
}
