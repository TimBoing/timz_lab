// import MyImage from 'images/max_dark.jpg'

const drawCanvas = () => {
  const canvas = document.getElementById("max-canvas");
  if(!canvas)return;
  const ctx = canvas.getContext("2d");
  const darkLogo = new Image();
  // canvas.style.width = "500px";
  // canvas.style.height = "500px";
  // ctx.imageSmoothingEnabled = false;
  darkLogo.src= "/assets/max_dark_copie.jpg";

  // darkLogo.src= MyImage;
  // background.onload=function(){loadedItems++;  console.log(97);}
  darkLogo.onload = () => {
    console.log(darkLogo.width);
    console.log(darkLogo.height);
    ctx.drawImage(darkLogo,0,0);

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(250, 200, 150, 0, 2 * Math.PI);
    ctx.stroke();
  }



}

export{drawCanvas};
