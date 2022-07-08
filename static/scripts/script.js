let filename = "filename1.jpg";

// setup
let server = window.location.origin;
let imgEl = document.querySelector(".myImg");
imgEl.src = "./static/uploads/" + filename;

imgEl.onclick = function (e) {
  let displayWidth = e.target.width;
  let displayHeight = e.target.height;

  let originalWidth = e.target.naturalWidth;
  let originalHeight = e.target.naturalHeight;

  let clickX = (originalWidth * e.offsetX) / displayWidth;
  let clickY = (originalHeight * e.offsetY) / displayHeight;

  clickX = Math.round(clickX)
  clickY = Math.round(clickY)
  console.log("clicked x,y is ", clickX, clickY);

  (async () => {
    const rawResponse = await fetch(server + "/test/"+clickX+"/"+clickY);
    const content = await rawResponse.json();
    console.log(content)

    document.querySelector('.colorName').innerHTML ="Color Name: "+content.colorName;

    document.querySelector('.r').innerHTML = "R: "+content.R;
    document.querySelector('.g').innerHTML = "G: "+content.G;
    document.querySelector('.b').innerHTML = "B: "+content.B;
    
  })();
};