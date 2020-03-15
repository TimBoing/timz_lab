
const openEye = () => {

  const oeil = document.querySelector('.oeil');
  const oeilContainer = document.querySelector('.oeil-container');

  const openIt = (e) => {

    // console.log(e.keyCode);
    if(e.keyCode === 65){
      const oeil = document.querySelector('.oeil');
      oeil.style.height = '110vh';
      // oeilContainer.style.background= 'radial-gradient(white, #D09F97)';
      oeilContainer.style.filter = "brightness(200%)";
      oeil.style.filter = "blur(0px)";


    }else if(e.keyCode === 83){
      oeil.style.height = '1vh';
      // oeilContainer.style.background= 'radial-gradient(#D09F97, black)';
      oeil.style.filter = "blur(4px)";
      oeilContainer.style.filter = "brightness(110%)";
    }



  }
  window.addEventListener('keydown', openIt);

  oeilContainer.addEventListener('transitionend', (event) => {
    if(event.propertyName === "filter"){
      oeilContainer.style.filter = "brightness(100%)";

    };
  })
}

export{openEye};
