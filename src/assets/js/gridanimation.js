const wrapper = document.getElementById("tiles");

let columns = 0,
  rows = 0,
  toggled = true;

const toggle = () => {
  if (localStorage.firstLoad === "yes") {
    localStorage.firstLoad = "no";
    if (localStorage.lightTheme === "yes") {
      toggled = !toggled;
      
      document.body.classList.toggle("toggled");
    }
    return;
  }

  toggled = !toggled;
  localStorage.lightTheme = localStorage.lightTheme === "yes" ? "no" : "yes";
  document.body.classList.toggle("toggled");
};

const handleOnClick = (index) => {
  toggle();
  anime({
    targets: ".tile",
    opacity: toggled ? 1 : 0,
    delay: anime.stagger(100, {
      grid: [columns, rows],
      from: index,
    }),
  });

  anime({
    targets:
      ".page, .container, a, btn_text, .title-highlight, #highlight, #recent-activity, #title, .collection_list",
    color: toggled ? "rgb(200, 200, 200)" : "rgb(0, 0, 0)",
    backgroundColor: toggled ? "rgb(0, 0, 0,0.3)" : "rgb(255, 255, 255)",
    fontWeight: toggled ? "400" : "300",
    delay: anime.stagger(10),
  });

  anime({
    targets: ".header, .div_article",
    border: toggled
      ? "1.85px solid rgb(200,200,200, 1)"
      : "1.85px solid rgb(0,0,0, 0.87)",
  });

  anime.set([".page, .container, a, .title-highlight"], {
    border: "none",
    fontFamily: toggled ? "VT323" : "Oswald",
  });

  anime.set(
    [
      " #highlight, #recent-activity, #title, .btn_text , .footer_btn, .footer_p, h2,h1",
    ],
    {
      fontFamily: toggled ? "DotGothic" : "Oswald",
    }
  );

  anime({
    targets: [".separator-zone-1, .separator-zone-2"],
    border: toggled
      ? "2.1px solid rgb(200, 200, 200)"
      : "2.1px solid rgb(0, 0, 0)",
    borderRightColor: "rgb(0, 0, 0,0)",
    borderBottomColor: "rgb(0, 0, 0,0)",
    borderLeftColor: "rgb(0, 0, 0,0)",
  });

  anime.set(["#special-separator"], {
    borderStyle: "none",
  });
};

const createTile = (index) => {
  const tile = document.createElement("div");

  tile.classList.add("tile");

  tile.style.opacity = 1;

  tile.onclick = (e) => handleOnClick(index);

  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";

  const size = document.body.clientWidth > 800 ? 100 : 50;

  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);

  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
};

createGrid();

window.onload = () => {
  if (localStorage.lightTheme === "yes") {
    const wrapper = document.getElementsByClassName("tile");
    wrapper[0].click();
  } else {
    localStorage.firstLoad = "no";
  }
};

window.onunload = () => {
  localStorage.firstLoad = "yes";
};

window.onresize = () => createGrid();
