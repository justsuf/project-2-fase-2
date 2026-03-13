let zoom = 1;

const viewer = document.getElementById("zoom");

viewer.innerHTML += `
<div class="zoomButtons">
  <button onclick="zoomIn()">+</button>
  <button onclick="zoomOut()">-</button>
</div>
`;

function zoomIn(){
  zoom += 0.1;
  document.getElementById("schoolplaat").style.transform = `scale(${zoom})`;
}

function zoomOut(){
  zoom -= 0.1;
  if(zoom < 0.2) zoom = 0.2;
  document.getElementById("schoolplaat").style.transform = `scale(${zoom})`;
}