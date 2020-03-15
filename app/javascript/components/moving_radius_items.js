const moveBlackCircles = () => {
  const animationStarter = document.getElementById('animation-starter');
  const container = document.querySelector('.loaders-container');
  const lineNum = 50;

  if(!animationStarter) return;

  const moveCircle = () => {

    const blackCircles = document.querySelectorAll('.moving-circle');
    blackCircles.forEach(blackCircle => {
      // blackCircle.style.transformOrigin = "0 0";
      blackCircle.style.height = '1500px';
      blackCircle.style.width = '1500px';
      blackCircle.style.transform = 'rotate(100deg)';
      blackCircle.addEventListener('transitionend', (event) => {
        if(blackCircle.parentNode){
          blackCircle.parentNode.removeChild(blackCircle); // autodestruction after
        }
      });

    })



  }

  const createCircle = () => {
    let rotationAngle = 0;

    let circle = document.createElement("div");
    // let circleTop = 50;
    // let circleLeft = 50;
    circle.classList.add("moving-circle");
    // circle.style.top = `${circleTop}%`;
    // circle.style.left = `${circleLeft}%`;

    container.appendChild(circle);

    const waiting = setTimeout(moveCircle, 20);
  }

  const startAnimation = () => {
    createCircle();
  }

  animationStarter.addEventListener('click', (event) => {
    // animationStarter.style.transform = 'scale(0.4)';
    // startAnimation();
    const myInterval = setInterval(startAnimation, 200);

  });

}

export{moveBlackCircles};
