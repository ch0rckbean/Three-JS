import * as THREE from 'three';

// 1. 직접 DOM에 추가
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// 2. Canvas 사용 시
const canvas = document.getElementById('three-canvas');
// const renderer=new THREE.WebGLRenderer({canvas:canvas})
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // 시야각(field of view)
  window.innerWidth / window.innerHeight, // 종횡비(aspect)
  0.1, // near
  1000 // far
);

camera.position.z = 5;
scene.add(camera);
