import * as THREE from 'three/build/three.module.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import GLTFLoader from 'three-gltf-loader';

const bn = () => {
  const checkPage = document.getElementById('bn-activation')
  if(!checkPage) return;
  //---------------------------------------------------------------------------------------
  let scene, camera, renderer, light, lightHelper, cube, cam, sphere, logo, plane;
  const loader = new GLTFLoader();

  let rot = 0.05;
  // console.log(origin.x);


  //Main variables
  // let mouse = new THREE.Vector2();
  // let raycaster = new THREE.Raycaster();
  // let intersects;
  let selectedObject;
  let selectedObjectInfo = 'Camera';
  let selectedObjectX = 0;
  let selectedObjectY = 10;
  let selectedObjectZ = 40;
  let movingFactor = 1;

  let createPlane = () => {
    let geometry = new THREE.PlaneGeometry(100, 100, 50, 50);
    let material = new THREE.MeshPhongMaterial({ color: 0x00a1cb, wireframe: true, shininess: 100, side: THREE.DoubleSide});
    plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = Math.PI / 2;
    plane.position.y = -2;
    scene.add(plane);
  }


  let createLogo = () => {
    let logoPath = checkPage.dataset.max;
    console.log(logoPath);


    // let geometry = new THREE.PlaneGeometry(10, 10, 50, 50);
    let geometry = new THREE.CircleGeometry( 2, 50 );
    // let geometry = new THREE.BoxGeometry(5,5,5);

    let texture = new THREE.TextureLoader().load(logoPath);
    let material = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide, shininess: 100});

    logo = new THREE.Mesh(geometry, material);
    logo.position.x = -20;

    scene.add(logo);
    // plane.rotation.x = Math.PI / 2;
  }

  let createSphere = () => {
    let logoPath = checkPage.dataset.max;
    console.log(logoPath);
    let texture = new THREE.TextureLoader().load(logoPath);

    let geometry = new THREE.SphereGeometry(1,30,30);
    let material = new THREE.MeshPhongMaterial({map: texture});
    sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
  }

  let createCamera = () => {
    let geometry = new THREE.Geometry();

    // Bottom
    geometry.vertices.push(new THREE.Vector3(0,0,0));
    geometry.vertices.push(new THREE.Vector3(1,0,0));
    geometry.vertices.push(new THREE.Vector3(1,0,-1));
    geometry.vertices.push(new THREE.Vector3(0,0,-1));

    geometry.faces.push(new THREE.Face3(0,1,3));
    geometry.faces.push(new THREE.Face3(1,2,3));

    // Top
    geometry.vertices.push(new THREE.Vector3(0,1,0));
    geometry.vertices.push(new THREE.Vector3(1,1,0));
    geometry.vertices.push(new THREE.Vector3(1,1,-1));
    geometry.vertices.push(new THREE.Vector3(0,1,-1));

    geometry.faces.push(new THREE.Face3(4,5,7));
    geometry.faces.push(new THREE.Face3(5,6,7));

    //sides
      //left
    geometry.faces.push(new THREE.Face3(0,3,7));
    geometry.faces.push(new THREE.Face3(0,4,7));

      //Right
    // geometry.faces.push(new THREE.Face3(0,3,7));
    // geometry.faces.push(new THREE.Face3(0,4,7));



    let material = new THREE.MeshBasicMaterial({color: 0x00a1cb, side: THREE.DoubleSide});
    cam = new THREE.Mesh(geometry, material);
    scene.add(cam);

  }

  let createCube = () => {
    let geometry = new THREE.BoxGeometry(1,1,1);
    let material = new THREE.MeshBasicMaterial({color: 0x00a1cb});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }


  let uploadGLB = (x,y,z) => {

    let objectPath = checkPage.dataset.max;


    loader.load(
        objectPath,
        ( gltf ) => {
            // called when the resource is loaded
            scene.add( gltf.scene );
            gltf.scene.position.x = x;
            gltf.scene.position.y = y;
            gltf.scene.position.z = z;
        },
        ( xhr ) => {
            // called while loading is progressing
            console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
        },
        ( error ) => {
            // called when loading has errors
            console.error( 'An error happened', error );
        },
    );

  }



  let init = function() {

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xababab);
      // scene.add(axes);
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
      //Playing with camera
      camera.position.set( 0, 10, 20 );
      camera.lookAt( 0, 0, 0 );
      selectedObject = camera;

      createPlane();
      // createLogo();

      // for(let i = -10; i < 10; i += 1){
      //   for(let j=-10; j < 10; j += 1){
      //     uploadGLB(i,0,j);
      //   }
      // }

      uploadGLB(0,0,0);


      let ambient = new THREE.AmbientLight(0x404040,2);
      // light = new THREE.HemisphereLight(0Xffffff,0X000000);
      light = new THREE.DirectionalLight(0Xffffff, 2);
      // light.target = logo;
      light.position.y = 5;
      light.position. x = 1;
      light.position.z = 5;
      // // light = new THREE.PointLight(0Xffffff,2,20,2);
      // // light2 = new THREE.PointLight(0Xffffff,2,20,2);
      // light.position.y = 10;
      // light.position.x = 18;
      // // // light.position.y = 5;
      // light.position.z = 60;
      // // light.castShadow = true;

      scene.add(ambient);
      scene.add(light);
      // scene.add(light2);
      // lightHelper = new THREE.DirectionalLightHelper(light, 5, 0x000000);
      // scene.add(lightHelper);



      // Grid helper
      const size = 20;
      const divisions = 20;
      const gridHelper = new THREE.GridHelper( size, divisions );
      // scene.add( gridHelper );


      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
  };






  // main animation loop - calls every 50-60 ms.

  let theta = 0;
  let mainLoop = function() {

    // i+= 1;
    theta += Math.PI / 200;

    // if(i <= 400){
    //   logo.position.x += 0.1;
    //   logo.rotation.z -= 0.05;
    // }else{
    //   i = 0;
    //   createLogo();
    //   light.target = logo;

    // }

    // if(i <= 100){
    //   logo.position.x += 0.1;
    // }else if(i <=200){
    //   logo.rotation.y += 0.015;
    // }else if(i <= 300){
    //   logo.position.y += 0.005;
    // }




    // cam.rotation.y = rot;
    // sphere.rotation.y += 0.01;
    // sphere.rotation.x += rot;
    // logo.rotation.y += 0.01;
    // logo.rotation.z -= 0.01;

    // if(logo.position.x < 5){
    //   logo.position.x += 0.01;
    // }
    // }else if(logo.position.x > -5){
    //   logo.position.x -= 0.01;
    // }

    // logo.rotation.z += 0.03;

    camera.position.x = 20 * Math.sin(theta);
    camera.position.z = 20 * Math.cos(theta);
    camera.lookAt(0,0,0);
    // lightHelper.update();
    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
  };








  const getSelectedObjectPosition = () => {
    selectedObjectX = selectedObject.position.x;
    selectedObjectY = selectedObject.position.y;
    selectedObjectZ = selectedObject.position.z;
  }

  const drawInfo = () => {

    // if(selectedObject.geometry) selectedObjectInfo = selectedObject.geometry.type;

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

  let rotateCam = 0;


  const keyboardShortcuts = (e) => {
    switch(e.keyCode){

      //Moving objects (including camera)
      case 37 : //left
        // selectedObjectX = selectedObjectX - movingFactor;
        rotateCam += (Math.PI / 10);
        selectedObjectX = Math.cos(rotateCam) * 40 ;
        selectedObjectZ = Math.sin(rotateCam) * 40;
        break;
      case 39 : // right
        // selectedObjectX = selectedObjectX + movingFactor;
        rotateCam -= (Math.PI / 10);
        selectedObjectX = Math.cos(rotateCam) * 40 ;
        selectedObjectZ = Math.sin(rotateCam) * 40;
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
      // case 68 : // d
      //   scene.remove(selectedObject);
      //   break;
      // case 67 : // c
      //   selectedObject = camera;
      //   selectedObjectInfo = "Camera";
      //   getSelectedObjectPosition();
      //   break;

    //   // Creating new objects
    //   case 49 : // 1 ==> Square
    //     const newGeoBox = new THREE.BoxGeometry();
    //     const newMatBox = new THREE.MeshNormalMaterial();
    //     const newObjBox = new THREE.Mesh( newGeoBox, newMatBox );
    //     newObjBox.position.set(0,0,0);
    //     selectedObject = newObjBox;
    //     getSelectedObjectPosition();
    //     scene.add( newObjBox );
    //     break;
    //   case 50 : // 2 ==> sphere
    //     const newGeoSphere = new THREE.SphereGeometry(1, 15, 15); // The high level of last parameters allow a nice round effect
    //     const newMatSphere = new THREE.MeshNormalMaterial();
    //     const newObjSphere = new THREE.Mesh( newGeoSphere, newMatSphere );
    //     newObjSphere.position.set(0,0,0);
    //     selectedObject = newObjSphere;
    //     getSelectedObjectPosition();
    //     scene.add( newObjSphere );
    //     break;
    //   case 51 : // 3 ==> cylindre
    //     const newGeoCylinder = new THREE.CylinderGeometry( 1, 1, 2, 32 ); // The high level of last parameters allow a nice round effect
    //     const newMatCylinder = new THREE.MeshNormalMaterial();
    //     const newObjCylinder = new THREE.Mesh( newGeoCylinder, newMatCylinder );
    //     newObjCylinder.position.set(0,0,0);
    //     selectedObject = newObjCylinder;
    //     getSelectedObjectPosition();
    //     scene.add( newObjCylinder );
    //     break;

    //   // Tests
    //   case 81 :
    //     // selectedObject.geometry.setAttributes('height', 15);
    //      console.log(selectedObject);
    //      console.log(selectedObject.geometry.parameters);
    //      // height = 3;
    //     break;
      default:
      console.log(e.keyCode);
    }

    // drawInfo();
    // selectedObject.position.set( selectedObjectX, selectedObjectY, selectedObjectZ );
    // camera.lookAt( 0, 0, 0 );
  }

  ///////////////////////////////////////////////
  window.addEventListener('keydown', keyboardShortcuts);
  init();
  mainLoop();


}


export{bn};
