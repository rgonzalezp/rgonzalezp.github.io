const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false;

const toggle = () => {
  toggled = !toggled;
  
  document.body.classList.toggle("toggled");
}

const handleOnClick = index => {
  toggle();
  
  anime({
    targets: ".tile",
    opacity: toggled? 1 : 0,
    backgroundColor: toggled? "rgb(200, 200, 200)" : "rgb(0, 0, 0)",
    delay: anime.stagger(100, {
      grid: [columns, rows],
      from: index
    })
  });

  anime({
    targets: ".page",
    color: toggled? "rgb(200, 200, 200)" : "rgb(0, 0, 0)",
    delay: anime.stagger(300)
  });

  anime({
    targets: [".separator-zone-1, .separator-zone-2"],
    border: toggled? "2.1px solid rgb(200, 200, 200)" : "2.1px solid rgb(0, 0, 0)",
    borderRightColor: "rgb(0, 0, 0)",
    borderBottomColor: "rgb(0, 0, 0)",
    borderLeftColor: "rgb(0, 0, 0)",
  });
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = 1;

  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
}

createGrid();

window.onresize = () => createGrid();