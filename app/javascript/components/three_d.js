import * as THREE from 'three/build/three.module.js';
// after command :  yarn add three


const testsThree = () => {
  const checkPage = document.getElementById('three-activation')
  if(!checkPage) return;

  // Basic setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500  );
  const renderer = new THREE.WebGLRenderer();

  //Playing with camera
  camera.position.set( 0, 10, 20 );
  camera.lookAt( 0, 0, 0 );

  //Main variables
  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  let intersects;
  let selectedObject = camera;
  let selectedObjectInfo = 'Camera';
  let selectedObjectX = 0;
  let selectedObjectY = 10;
  let selectedObjectZ = 20;
  let movingFactor = 1;


  //Display the whole machinery
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );


  // Preparing to move objects

  const getSelectedObjectPosition = () => {
    selectedObjectX = selectedObject.position.x;
    selectedObjectY = selectedObject.position.y;
    selectedObjectZ = selectedObject.position.z;
  }

  const drawInfo = () => {

    if(selectedObject.geometry) selectedObjectInfo = selectedObject.geometry.type;

    checkPage.innerHTML = `
      x : ${selectedObjectX}
      <br>
      y : ${selectedObjectY}
      <br>
      z : ${selectedObjectZ}
      <br>
      selectedObject: ${selectedObjectInfo}`;
      // console.log(selectedObject.geometry.type);
  }




  const keyboardShortcuts = (e) => {
    switch(e.keyCode){
      case 37 : //left
      selectedObjectX = selectedObjectX - movingFactor;
      break;
      case 39 : // right
        selectedObjectX = selectedObjectX + movingFactor;
      break;
      case 38 : // up
      selectedObjectY = selectedObjectY + movingFactor;
      break;
      case 40 : // down
      selectedObjectY = selectedObjectY - movingFactor;
      break;
      case 87 : // w
      selectedObjectZ = selectedObjectZ - movingFactor;
      break;
      case 83 : // s
      selectedObjectZ = selectedObjectZ + movingFactor;
      break;
      case 78 : // n
      const newGeo = new THREE.SphereGeometry(1, 15, 15); // The high level of last parameters allow a nice round effect
      const newMat = new THREE.MeshNormalMaterial();
      const newObj = new THREE.Mesh( newGeo, newMat );
      newObj.position.set(0,0,0)
      selectedObject = newObj;
      getSelectedObjectPosition();
      scene.add( newObj );
      break;
      case 68 : // d
      scene.remove(selectedObject);
      break;
      case 67 : // c
      selectedObject = camera;
      selectedObjectInfo = "Camera";
      getSelectedObjectPosition();
      break;
      default:
      console.log(e.keyCode);
    }

    drawInfo();
    selectedObject.position.set( selectedObjectX, selectedObjectY, selectedObjectZ );
    camera.lookAt( 0, 0, 0 );
  }


  // Grid helper
  const size = 20;
  const divisions = 20;
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper );


  // Creating a sphere
  const geometry = new THREE.SphereGeometry(1, 15, 15); // The high level of last parameters allow a nice round effect
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


  const animate = () => {
    requestAnimationFrame( animate );
    sphere.rotation.x += 0.01;
    cube.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
  }

  const onMouseMove = ( event )  => {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    intersects = raycaster.intersectObjects( scene.children );

  }

  const onMouseClick = () => {

    if(!intersects[0]) return;
    selectedObject = intersects[0].object;
    getSelectedObjectPosition();
    drawInfo();

    // for ( let i = 0; i < intersects.length; i++ ) {
    //   alert(intersects[ i ].object.name);
    //   // intersects[ i ].object.material.color.set( 0xff0000 );
    // }
  }



  window.addEventListener('keydown', keyboardShortcuts);
  window.addEventListener( 'mousemove', onMouseMove, false );
  window.addEventListener( 'click', onMouseClick, false );
  drawInfo();
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
