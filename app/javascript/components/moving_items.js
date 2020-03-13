const moveBlackLines = () => {
  const animationStarter = document.getElementById('animation-starter');
  const container = document.querySelector('.loaders-container');

  if(!animationStarter) return;

  const moveLines = () => {
    console.log("YO");
    const blackLines = document.querySelectorAll('.moving-black-line');
    blackLines.forEach(blackLine => {
      blackLine.style.transform = 'translate(-1000px)';
    });
  }


  const createRandomLines = () => {
    for(let i = 0; i <100; i += 1){
      let line = document.createElement("div");
      let randomWidth = Math.floor(Math.random() * 300);
      let randomTop = Math.floor(Math.random() * 100);
      let randomRight = Math.floor(Math.random() * 10);

      line.classList.add("moving-black-line");
      line.style.width = `${randomWidth}px`;
      line.style.top = `${randomTop}%`;
      line.style.right = `${randomRight}%`;
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

export{moveBlackLines};
