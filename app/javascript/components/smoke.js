import * as THREE from 'three/build/three.module.js';

const smoke = () => {
  const checkPage = document.getElementById('smoke-activation')
  if(!checkPage) return;
  //---------------------------------------------------------------------------------------
  let scene, camera, renderer;
  let imgURL = checkPage.dataset.url;
  let cloudParticles = [];


  //Main variables

  let init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;


    // let ambient = new THREE.AmbientLight(0x555555);
    // scene.add(ambient);

    // let directionalLight = new THREE.DirectionalLight(0xff8c19);
    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);

    // let orangeLight = new THREE.PointLight(0xcc6600,50,450,1.7);
    // orangeLight.position.set(200,300,100);
    // scene.add(orangeLight);
    // let redLight = new THREE.PointLight(0xd8547e,50,450,1.7);
    // redLight.position.set(100,300,100);
    // scene.add(redLight);
    // let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
    // blueLight.position.set(300,300,200);
    // scene.add(blueLight);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // scene.fog = new THREE.FogExp2(0x03544e, 0.001);
    // renderer.setClearColor(scene.fog.color);

    document.body.appendChild(renderer.domElement);


    // Start experimenting-------------------------
    let loader = new THREE.TextureLoader();
    loader.load(imgURL, function(texture){
      //texture is loaded
      let cloudGeo = new THREE.PlaneBufferGeometry(500,500);
      let cloudMaterial = new THREE.MeshLambertMaterial({
        map:texture,
        transparent: true
      });

      for(let p=0; p<30; p++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random()*800 -300,
          500,
          Math.random()*500-500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random()*2*Math.PI;
        cloud.material.opacity = 0.55;
        cloudParticles.push(cloud);
        scene.add(cloud);
      }

    });


    //-------------------------
    mainLoop();
  };


  // main animation loop - calls every 50-60 ms.
  let mainLoop = function() {
    cloudParticles.forEach(p => {
       p.rotation.z -=0.001;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
  };

  init();

}


export{smoke};
