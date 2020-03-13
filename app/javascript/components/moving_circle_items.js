const moveBlackLinesInCircle = () => {
  const animationStarter = document.getElementById('animation-starter');
  const container = document.querySelector('.loaders-container');
  const lineNum = 100;

  if(!animationStarter) return;

  const moveLines = () => {
    let rotationAngle = 0;
    const blackLines = document.querySelectorAll('.moving-black-line');
    blackLines.forEach(blackLine => {
      rotationAngle += (360 / lineNum);
      blackLine.style.transform = `rotate(${rotationAngle}deg) translate(1000px)`;
    });
  }

  const createRandomLines = () => {
    let rotationAngle = 0;


    for(let i = 0; i < lineNum; i += 1){
      let line = document.createElement("div");
      let randomWidth = Math.floor(Math.random() * 300);
      let lineTop = 50;
      let lineLeft = 50;
      rotationAngle += (360 / lineNum);
      line.classList.add("moving-black-line");
      line.style.width = `${randomWidth}px`;
      line.style.top = `${lineTop}%`;
      line.style.left = `${lineLeft}%`;
      line.style.transformOrigin = "0 0";
      line.style.transform = `rotate(${rotationAngle}deg) translate(50px)`;
      container.appendChild(line);
    }
     const waiting = setTimeout(moveLines, 20);
  }

  const startAnimation = () => {
    createRandomLines();
  }

  animationStarter.addEventListener('click', (event) => {
    startAnimation();
  });

}

export{moveBlackLinesInCircle};
