import * as THREE from 'three/build/three.module.js';
// after command :  yarn add three


const testsThree = () => {
  const checkPage = document.getElementById('three-activation')
  if(!checkPage) return;


  // Basic setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  //Playing with camera
  let cameraX = 0;
  let cameraY = 10;
  let cameraZ = 20;
  let movingFactor = 1;

  camera.position.set( cameraX, cameraY, cameraZ );
   checkPage.innerHTML = `
      x : ${cameraX}
      <br>
      y : ${cameraY}
      <br>
      z : ${cameraZ}`;
  camera.lookAt( 0, 0, 0 );

  const moveCamera = (e) => {
    switch(e.keyCode){
      case 37 : //left
      cameraX = cameraX - movingFactor;
      break;
      case 39 : // right
        cameraX = cameraX + movingFactor;
      break;
      case 38 : // up
      cameraY = cameraY + movingFactor;
      break;
      case 40 : // down
      cameraY = cameraY - movingFactor;
      break;
      case 87 : // w
      cameraZ = cameraZ - movingFactor;
      break;
      case 83 : // s
      cameraZ = cameraZ + movingFactor;
      break;
      // default:
      // console.log(e.keyCode);
    }
    checkPage.innerHTML = `
      x : ${cameraX}
      <br>
      y : ${cameraY}
      <br>
      z : ${cameraZ}`;

    camera.position.set( cameraX, cameraY, cameraZ );
    camera.lookAt( 0, 0, 0 );
  }

  // Grid helper
  const size = 20;
  const divisions = 20;
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );


  // Creating a sphere
  const geometry = new THREE.SphereGeometry(1, 20, 20); // The high level of last parameters allow a nice round effect
  const material = new THREE.MeshNormalMaterial();
  const sphere = new THREE.Mesh( geometry, material );
  sphere.position.set(0,1,0)
  scene.add( sphere );

  // Creating a cube
  const cube_geo = new THREE.BoxGeometry()
  const cube_mat = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh( cube_geo, cube_mat );
  cube.position.set(0, 0.5, 5)
  scene.add( cube );

  // Creating lines
  const line_material = new THREE.LineBasicMaterial();
  const points = [];
  points.push( new THREE.Vector3( 0, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  const line_geometry = new THREE.BufferGeometry().setFromPoints( points );
  const line = new THREE.Line( line_geometry, line_material );
  scene.add( line );


  function animate() {
    requestAnimationFrame( animate );
    sphere.rotation.x += 0.01;
    cube.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  }
  animate();


  window.addEventListener('keydown', moveCamera);




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
