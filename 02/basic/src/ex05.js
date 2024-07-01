import * as THREE from 'three';

// ------ 주제: Light 조명

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

  // renderer 색 넣기
  //   renderer.setClearAlpha(0.5); // 불투명도 지수
  //   renderer.setClearColor(0x00ff00);
  renderer.setClearColor('#00ff00');
  renderer.setClearAlpha(0.5);

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('blue'); // scene이 우선이라 renderer 설정 적용 안 됨

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75, // 시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // far
  );

  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffff, 1); // 색, 빛의 강도
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // Mesh = Geometry + Material
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 'red',
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // console.log(clock.getElapsedTime()); // 초 단위로 찍히는 절대시간
    const time = clock.getElapsedTime();

    // 각도는 Radian을 사용
    // 360도는 2파이
    // mesh.rotation.y += 0.1;
    // mesh.rotation.y += THREE.MathUtils.degToRad(1); // (인자)도
    mesh.rotation.y = time; // 시간 경과하므로 + 안 써도 됨
    mesh.position.y += 0.01;
    if (mesh.position.y > 3) {
      mesh.position.y = 0;
    }
    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw); // window 전역 객체
    // WebXR(AI, VR) 환경에선 다음을 씀
    renderer.setAnimationLoop(draw); // == window.requestAnimationFrame(draw)
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
