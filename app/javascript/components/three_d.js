import * as THREE from 'three/build/three.module.js';
// after command :  yarn add three


const testsThree = () => {
  const checkPage = document.getElementById('three-activation')
  if(!checkPage) return;


  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // let geometry = new THREE.BoxGeometry();
  // let material = new THREE.MeshNormalMaterial();
  // const cube = new THREE.Mesh( geometry, material );

  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshNormalMaterial();
  const sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );

  // scene.add( cube );

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame( animate );
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    renderer.render( scene, camera );
  }
  animate();







}

export{testsThree};


  // var camera, scene, renderer;
  // var geometry, material, mesh;

  // init();
  // animate();

  // function init() {

  //     camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  //     camera.position.z = 1;

  //     scene = new THREE.Scene();

  //     geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
  //     material = new THREE.MeshNormalMaterial();

  //     mesh = new THREE.Mesh( geometry, material );
  //     scene.add( mesh );

  //     renderer = new THREE.WebGLRenderer( { antialias: true } );
  //     renderer.setSize( window.innerWidth, window.innerHeight );
  //     document.body.appendChild( renderer.domElement );

  // }

  // function animate() {

  //     requestAnimationFrame( animate );

  //     mesh.rotation.x += 0.01;
  //     mesh.rotation.y += 0.02;

  //     renderer.render( scene, camera );

  // }
