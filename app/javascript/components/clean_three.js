import * as THREE from 'three/build/three.module.js';

const cleanThree = () => {
  const checkPage = document.getElementById('clean-three-activation')
  if(!checkPage) return;
  //---------------------------------------------------------------------------------------
  let scene, camera, renderer;

  let arbre;
  let origin = new THREE.Vector3( 0, 0, 0 );
  let blocker = 0;
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


  class Arbre {
    constructor(origin, length) {
      console.log("new arbre");

      this.origin = origin;
      this.length = length;
      this.angle = 0;
      this.grow();
    }

    grow(){
      let firstData = {init: true, origin: this.origin, length: this.length,angle: this.angle};
      let tronc = new Branche(firstData);
    }
  }



  class Branche {
    constructor(brancheMere) {
      console.log("new branche");
      // console.log(brancheMere);

      this.brancheMere = brancheMere;
      this.init = false;
      if(Math.random() > 0.5){
        this.cos = true;
      } else{
        this.cos = false;
      }

      if(brancheMere.init == true){
        console.log("Création du tronc");
        this.length = this.brancheMere.length;
        this.origin = this.brancheMere.origin;
        this.angle = 0;
        let y = this.origin.y + this.length;
        this.endPoint = new THREE.Vector3(this.origin.x, y, this.origin.z);

      }else{
        this.length = this.brancheMere.length * 0.62;
        let x1 = this.brancheMere.origin.x + Math.sin(this.brancheMere.angle) * this.brancheMere.length * 0.62;
        let y1 = this.brancheMere.origin.y + Math.cos(this.brancheMere.angle) * this.brancheMere.length * 0.62;
        let z1;
        if(this.brancheMere.brancheMere.init == true){
          z1 = 0;
        }else{
          if(this.brancheMere.cos == true){
            z1 = this.brancheMere.origin.z + Math.cos(this.brancheMere.angle) * this.brancheMere.length * 0.62;
          }else{
            z1 = this.brancheMere.origin.z + Math.sin(this.brancheMere.angle) * this.brancheMere.length * 0.62;
          }
        }
        this.origin = new THREE.Vector3( x1, y1, z1 );

        this.angle = this.brancheMere.angle + (this.getSign() * Math.PI / 2 * Math.random());

        let x2 = this.origin.x + Math.sin(this.angle) * this.length;
        let y2 = this.origin.y + Math.cos(this.angle) * this.length;
        let z2;
        if(this.cos == true){
          z2 = this.origin.z + Math.cos(this.angle) * this.length;
        }else{
          z2 = this.origin.z + Math.sin(this.angle) * this.length;
        }

        this.endPoint = new THREE.Vector3( x2, y2, z2 );

      }

      this.grow();
    }

    grow(){
      console.log(this);
      let lineMaterial = new THREE.LineBasicMaterial();
      let points = [this.origin, this.endPoint];
      let lineGeometry = new THREE.BufferGeometry().setFromPoints( points );
      let line = new THREE.Line( lineGeometry, lineMaterial );
      scene.add(line);

      let developBranch = this.checkProba();

      if(developBranch == 0){
        return;
      }else if(developBranch == 1){
        let b = new Branche(this);
      }else{
        let a = new Branche(this);
        let b = new Branche(this);
        let c = new Branche(this);
        let d = new Branche(this);
        let e = new Branche(this);
      }

    }

    checkProba(){
      if(this.brancheMere.init == true){
        return 2;
      }else{
        let proba = this.length / 10; //(8cm = 80%, 30 = 30%)
        if(Math.random() <= proba){
          return 2;
        }else{
          return 0;
        }
      }
    }

    getSign(){

      if(Math.random() > 0.5){
        return 1;
      } else {
        return -1;
      }
    }

  }



  // arbre.grow();
  // console.log(arbre.length);


  let init = function() {

      scene = new THREE.Scene();
      // scene.background = new THREE.Color(0xababab);
      // scene.add(axes);
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
      //Playing with camera
      camera.position.set( 0, 10, 40 );
      camera.lookAt( 0, 0, 0 );
      selectedObject = camera;

      // Grid helper
      const size = 20;
      const divisions = 20;
      const gridHelper = new THREE.GridHelper( size, divisions );
      scene.add( gridHelper );


      arbre = new Arbre(origin, 10);


      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
  };


  // main animation loop - calls every 50-60 ms.
  let mainLoop = function() {
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

    drawInfo();
    selectedObject.position.set( selectedObjectX, selectedObjectY, selectedObjectZ );
    camera.lookAt( 0, 0, 0 );
  }

  ///////////////////////////////////////////////
  window.addEventListener('keydown', keyboardShortcuts);
  init();
  mainLoop();

}


export{cleanThree};
