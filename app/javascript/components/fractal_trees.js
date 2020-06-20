// UNCOMMENT FOR FRACTAL TREES WORK------------------------------------------------------------------------------------------------------------

import * as THREE from 'three/build/three.module.js';
// after command :  yarn add three


const fractalTree = () => {
  const checkPage = document.getElementById('fractal-tree-activation')
  if(!checkPage) return;

  // Basic setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500  );
  const renderer = new THREE.WebGLRenderer();

  //Playing with camera
  camera.position.set( 0, 10, 40 );
  camera.lookAt( 0, 0, 0 );

  //Main variables
  let mouse = new THREE.Vector2();
  let raycaster = new THREE.Raycaster();
  let intersects;
  let selectedObject = camera;
  let selectedObjectInfo = 'Camera';
  let selectedObjectX = 0;
  let selectedObjectY = 10;
  let selectedObjectZ = 40;
  let movingFactor = 1;

  // lights

  // const ambientLight = new THREE.AmbientLight( 0x606060 );
  // scene.add( ambientLight );
  // const directionalLight = new THREE.DirectionalLight( 0xffffff );
  // directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
  // scene.add( directionalLight );

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

      //Moving objects (including camera)
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
      case 68 : // d
        scene.remove(selectedObject);
        break;
      case 67 : // c
        selectedObject = camera;
        selectedObjectInfo = "Camera";
        getSelectedObjectPosition();
        break;

      // Creating new objects
      case 49 : // 1 ==> Square
        const newGeoBox = new THREE.BoxGeometry();
        const newMatBox = new THREE.MeshNormalMaterial();
        const newObjBox = new THREE.Mesh( newGeoBox, newMatBox );
        newObjBox.position.set(0,0,0);
        selectedObject = newObjBox;
        getSelectedObjectPosition();
        scene.add( newObjBox );
        break;
      case 50 : // 2 ==> sphere
        const newGeoSphere = new THREE.SphereGeometry(1, 15, 15); // The high level of last parameters allow a nice round effect
        const newMatSphere = new THREE.MeshNormalMaterial();
        const newObjSphere = new THREE.Mesh( newGeoSphere, newMatSphere );
        newObjSphere.position.set(0,0,0);
        selectedObject = newObjSphere;
        getSelectedObjectPosition();
        scene.add( newObjSphere );
        break;
      case 51 : // 3 ==> cylindre
        const newGeoCylinder = new THREE.CylinderGeometry( 1, 1, 2, 32 ); // The high level of last parameters allow a nice round effect
        const newMatCylinder = new THREE.MeshNormalMaterial();
        const newObjCylinder = new THREE.Mesh( newGeoCylinder, newMatCylinder );
        newObjCylinder.position.set(0,0,0);
        selectedObject = newObjCylinder;
        getSelectedObjectPosition();
        scene.add( newObjCylinder );
        break;

      // Tests
      case 81 :
        // selectedObject.geometry.setAttributes('height', 15);
         console.log(selectedObject);
         console.log(selectedObject.geometry.parameters);
         // height = 3;
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


  // // Creating a sphere
  // const geometry = new THREE.SphereGeometry(1, 15, 15); // The high level of last parameters allow a nice round effect
  // const material = new THREE.MeshNormalMaterial();
  // const sphere = new THREE.Mesh( geometry, material );
  // sphere.position.set(0,1,0)
  // scene.add( sphere );

  // // Creating a cube
  // const cube_geo = new THREE.BoxGeometry()
  // const cube_mat = new THREE.MeshNormalMaterial();
  // const cube = new THREE.Mesh( cube_geo, cube_mat );
  // cube.position.set(0, 0.5, 5)
  // scene.add( cube );

  // Creating lines
  // const line_material = new THREE.LineBasicMaterial();
  // const points = [];
  // points.push( new THREE.Vector3( 0, 0, 0 ) );
  // points.push( new THREE.Vector3( 0, 10, 0 ) );
  // points.push( new THREE.Vector3( 5, 20, 0 ) );
  // const line_geometry = new THREE.BufferGeometry().setFromPoints( points );
  // const line = new THREE.Line( line_geometry, line_material );
  // scene.add( line );

  const getSign = () => {

    if(Math.random() > 0.5){
      return 1;
    } else {
      return -1;
    }
  }


  let originXr = 0;
  let originXl = 0;
  let originYr = 0;
  let originYl = 0;
  let rotateAngle = 0;
  let height = 8;
  const newBranch = () => {
    console.log(`x : ${originXr}`);
    console.log(`y : ${originYr}`);
    console.log(`height : ${height}`);

    const line_material = new THREE.LineBasicMaterial();
    const pointsr = [];
    const pointsl = [];

    const originr = pointsr.push( new THREE.Vector3( originXr, originYr, 0 ) );
    const originl = pointsl.push( new THREE.Vector3( originXl, originYl, 0 ) );
    const targetXr = originXr + Math.sin(rotateAngle) * height;
    const targetXl = originXl + Math.sin(-rotateAngle) * height;
    const targetYr = originYr + Math.cos(rotateAngle) * height;
    const targetYl = originYl + Math.cos(-rotateAngle) * height;
    const goalr = pointsr.push( new THREE.Vector3( targetXr, targetYr, 0 ) ); // Ligne verticale
    const goall = pointsl.push( new THREE.Vector3( targetXl, targetYl, 0 ) ); // Ligne verticale

    const line_geometryr = new THREE.BufferGeometry().setFromPoints( pointsr );
    const line_geometryl = new THREE.BufferGeometry().setFromPoints( pointsl );
    const liner = new THREE.Line( line_geometryr, line_material );
    const linel = new THREE.Line( line_geometryl, line_material );
    scene.add( liner );
    scene.add( linel );


    originXr = targetXr;
    originXl = targetXl;
    originYr = targetYr;
    originYl = targetYl;
    rotateAngle += (Math.PI / 4);
    height = height / 2;

  }



  // origin change a chanque iteration

  let i = 0;
  const animate = () => {

    requestAnimationFrame( animate );
    // newBranch(i);

    if(i < 10){
      newBranch();
    }




    renderer.render( scene, camera );
    i += 1;
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

export{fractalTree};







// UNCOMMENT FOR bubbles WORK------------------------------------------------------------------------------------------------------------


// import * as THREE from 'three/build/three.module.js';
// // after command :  yarn add three


// const fractalTree = () => {
//   const checkPage = document.getElementById('fractal-tree-activation')
//   if(!checkPage) return;

//   // Basic setup
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500  );
//   const renderer = new THREE.WebGLRenderer();

//   //Playing with camera
//   camera.position.set( 50, 50, 650 );
//   // camera.lookAt( 0, 0, 0 );

//   //Main variables
//   let mouse = new THREE.Vector2();
//   let raycaster = new THREE.Raycaster();
//   let intersects;
//   let selectedObject = camera;
//   let selectedObjectInfo = 'Camera';
//   let selectedObjectX = 50;
//   let selectedObjectY = 50;
//   let selectedObjectZ = 155;
//   let movingFactor = 1;

//   // lights

//   // const ambientLight = new THREE.AmbientLight( 0x606060 );
//   // scene.add( ambientLight );
//   // const directionalLight = new THREE.DirectionalLight( 0xffffff );
//   // directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
//   // scene.add( directionalLight );

//   //Display the whole machinery
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   document.body.appendChild( renderer.domElement );

//   // Preparing to move objects

//   const getSelectedObjectPosition = () => {
//     selectedObjectX = selectedObject.position.x;
//     selectedObjectY = selectedObject.position.y;
//     selectedObjectZ = selectedObject.position.z;
//   }

//   const drawInfo = () => {

//     if(selectedObject.geometry) selectedObjectInfo = selectedObject.geometry.type;

//     checkPage.innerHTML = `
//       x : ${selectedObjectX}
//       <br>
//       y : ${selectedObjectY}
//       <br>
//       z : ${selectedObjectZ}
//       <br>
//       selectedObject: ${selectedObjectInfo}`;
//       // console.log(selectedObject.geometry.type);
//   }




//   const keyboardShortcuts = (e) => {
//     switch(e.keyCode){

//       //Moving objects (including camera)
//       case 37 : //left
//         selectedObjectX = selectedObjectX - movingFactor;
//         break;
//       case 39 : // right
//         selectedObjectX = selectedObjectX + movingFactor;
//         break;
//       case 38 : // up
//         selectedObjectY = selectedObjectY + movingFactor;
//         break;
//       case 40 : // down
//         selectedObjectY = selectedObjectY - movingFactor;
//         break;
//       case 87 : // w
//         selectedObjectZ = selectedObjectZ - movingFactor;
//         break;
//       case 83 : // s
//         selectedObjectZ = selectedObjectZ + movingFactor;
//         break;
//       case 68 : // d
//         scene.remove(selectedObject);
//         break;
//       case 67 : // c
//         selectedObject = camera;
//         selectedObjectInfo = "Camera";
//         getSelectedObjectPosition();
//         break;

//       // Creating new objects
//       case 49 : // 1 ==> Square
//         const newGeoBox = new THREE.BoxGeometry();
//         const newMatBox = new THREE.MeshNormalMaterial();
//         const newObjBox = new THREE.Mesh( newGeoBox, newMatBox );
//         newObjBox.position.set(0,0,0);
//         selectedObject = newObjBox;
//         getSelectedObjectPosition();
//         scene.add( newObjBox );
//         break;
//       case 50 : // 2 ==> sphere
//         const newGeoSphere = new THREE.SphereGeometry(1, 15, 15); // The high level of last parameters allow a nice round effect
//         const newMatSphere = new THREE.MeshNormalMaterial();
//         const newObjSphere = new THREE.Mesh( newGeoSphere, newMatSphere );
//         newObjSphere.position.set(0,0,0);
//         selectedObject = newObjSphere;
//         getSelectedObjectPosition();
//         scene.add( newObjSphere );
//         break;
//       case 51 : // 3 ==> cylindre
//         const newGeoCylinder = new THREE.CylinderGeometry( 1, 1, 2, 32 ); // The high level of last parameters allow a nice round effect
//         const newMatCylinder = new THREE.MeshNormalMaterial();
//         const newObjCylinder = new THREE.Mesh( newGeoCylinder, newMatCylinder );
//         newObjCylinder.position.set(0,0,0);
//         selectedObject = newObjCylinder;
//         getSelectedObjectPosition();
//         scene.add( newObjCylinder );
//         break;

//       // Tests
//       case 81 :
//         // selectedObject.geometry.setAttributes('height', 15);
//          console.log(selectedObject);
//          console.log(selectedObject.geometry.parameters);

//          // height = 3;
//         break;
//       default:
//       console.log(e.keyCode);
//     }

//     drawInfo();
//     selectedObject.position.set( selectedObjectX, selectedObjectY, selectedObjectZ );
//     // camera.lookAt( 0, 0, 0 );
//   }


//   // Grid helper
//   // const size = 200;
//   // const divisions = 200;
//   // const gridHelper = new THREE.GridHelper( size, divisions );
//   // scene.add( gridHelper );


//   // // Creating a sphere
//   // const geometry = new THREE.SphereGeometry(1, 15, 15); // The high level of last parameters allow a nice round effect
//   // const material = new THREE.MeshNormalMaterial();
//   // const sphere = new THREE.Mesh( geometry, material );
//   // sphere.position.set(0,1,0)
//   // scene.add( sphere );

//   // // Creating a cube
//   // const cube_geo = new THREE.BoxGeometry()
//   // const cube_mat = new THREE.MeshNormalMaterial();
//   // const cube = new THREE.Mesh( cube_geo, cube_mat );
//   // cube.position.set(0, 0.5, 5)
//   // scene.add( cube );

//   // // Creating lines
//   // const line_material = new THREE.LineBasicMaterial();
//   // const points = [];
//   // points.push( new THREE.Vector3( 0, 0, 0 ) );
//   // points.push( new THREE.Vector3( 0, 10, 0 ) );
//   // const line_geometry = new THREE.BufferGeometry().setFromPoints( points );
//   // const line = new THREE.Line( line_geometry, line_material );
//   // scene.add( line );


//   // const getSign = () => {

//   //   if(Math.random() > 0.5){
//   //     return 1;
//   //   } else {
//   //     return -1;
//   //   }
//   // }

//   // const createRandomSphere = () => {

//   //   const sizeRand = Math.floor(Math.random() * 10);
//   //   const xRand = Math.floor(Math.random() * 100) * getSign();
//   //   const yRand = Math.floor(Math.random() * 100) * getSign();
//   //   const zRand = Math.floor(Math.random() * 100) * getSign();

//   //   const geometry = new THREE.SphereGeometry(sizeRand, 15, 15); // The high level of last parameters allow a nice round effect
//   //   const material = new THREE.MeshNormalMaterial();
//   //   const sphere = new THREE.Mesh( geometry, material );
//   //   sphere.position.set(xRand,yRand,zRand);
//   //   scene.add( sphere );
//   // }

//   //  const createRandomSquare = () => {

//   //   const sizeRand = Math.floor(Math.random() * 10);
//   //   const xRand = Math.floor(Math.random() * 100) * getSign();
//   //   const yRand = Math.floor(Math.random() * 100) * getSign();
//   //   const zRand = Math.floor(Math.random() * 100) * getSign();

//   //   const cube_geo = new THREE.BoxGeometry(sizeRand); // The high level of last parameters allow a nice round effect
//   //   const cube_mat = new THREE.MeshNormalMaterial();
//   //   const cube = new THREE.Mesh( cube_geo, cube_mat );
//   //   cube.position.set(xRand,yRand,zRand);
//   //   scene.add( cube );
//   // }


//   // // for(let i = 0; i < 1000; i += 1){
//   // //   createRandomSphere();
//   // //   createRandomSquare();
//   // // }

//   // for(let i = 0; i < 20; i += 1){
//   //   for(let j = 0; j < 20; j += 1){
//   //     const c_geo = new THREE.BoxGeometry(3);
//   //     const c_mat = new THREE.MeshNormalMaterial();
//   //     const c = new THREE.Mesh( c_geo, c_mat );
//   //     c.position.set(i,0,j);
//   //     scene.add( c );
//   //   }
//   // }

//   // Creating a sphere
//   let x = 0;
//   let y = 0;
//   let z;
//   const zFact = 200;
//   let rowsNum = 0;
//   const ecart = 2;

//   while(rowsNum < 50){
//     console.log(`x = ${x}`);
//     console.log(`y = ${y}`);

//     x = x + ecart;
//     z = Math.random() * zFact

//     const geometry = new THREE.SphereGeometry(1, 15, 15); // The high level of last parameters allow a nice round effect
//     const material = new THREE.MeshNormalMaterial();
//     const sphere = new THREE.Mesh( geometry, material );
//     sphere.position.set(x,y,z)
//     scene.add( sphere );

//     // rowsNum += 1
//     if(x % 100  === 0 && x > 0){
//       console.log("ouais");
//       x = 0;
//       y += ecart;
//       rowsNum += 1
//     }
//   }


//   let i = 0;
//   let offset = 0;
//   const animate = () => {

//     requestAnimationFrame( animate );

//     if(i < 800){
//       console.log( 660 - i);
//       camera.position.set( 50, 50, 650 - i );
//     }

//     // sphere.rotation.x += 0.01;
//     // cube.rotation.x += 0.01;
//     // sphere.rotation.y += 0.01;
//     // cube.rotation.y += 0.01;

//     // cube.scale.y = Math.sin(i) * 10;

//     // createRandomSquare();

//     // scene.children.forEach((child) => {
//     //   child.scale.y = i * Math.sin(i) + Math.sin(offset);
//     //   offset += 0.1;
//     // })
//     renderer.render( scene, camera );
//     i += 5;
//   }




//   const onMouseMove = ( event )  => {

//     // calculate mouse position in normalized device coordinates
//     // (-1 to +1) for both components

//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//     // update the picking ray with the camera and mouse position
//     raycaster.setFromCamera( mouse, camera );

//     // calculate objects intersecting the picking ray
//     intersects = raycaster.intersectObjects( scene.children );

//   }

//   const onMouseClick = () => {

//     if(!intersects[0]) return;
//     selectedObject = intersects[0].object;
//     getSelectedObjectPosition();
//     drawInfo();

//     // for ( let i = 0; i < intersects.length; i++ ) {
//     //   alert(intersects[ i ].object.name);
//     //   // intersects[ i ].object.material.color.set( 0xff0000 );
//     // }
//   }



//   window.addEventListener('keydown', keyboardShortcuts);
//   window.addEventListener( 'mousemove', onMouseMove, false );
//   window.addEventListener( 'click', onMouseClick, false );
//   drawInfo();
//   animate();


// }

// export{fractalTree};




