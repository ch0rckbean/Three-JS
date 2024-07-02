import * as THREE from 'three';

// ------ 주제: Fog(안개)

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 고밀도 해상도

  // Scene
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('violet', 3, 7); // (color, near, far)

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );

  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1); // 색, 빛의 강도
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 5;
  scene.add(light);

  // Geo, Mtrl 재사용 가능
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'pink',
  });

  // Mesh 배열 생성
  const meshes = [];
  let mesh;

  // Mesh 10개 생성
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    // 5의 절반 == 2.5 빼서 가운데 기준 정렬
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  // 그리기
  let time = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - time;
    time = newTime;

    meshes.forEach((item) => {
      //   console.log(item);
      item.rotation.y += deltaTime * 0.001;
      renderer.render(scene, camera);

      renderer.setAnimationLoop(draw);
    });
  }

  function setSize() {
    // 카메라
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }
  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
