//Change name to theme animation

// run scrolling animation for title

const wrapper = document.getElementById("tiles");
var firstLoad = localStorage.getItem("firstLoad");
var lightTheme = localStorage.getItem("lightTheme");

let columns = 0,
  rows = 0,
  toggled = localStorage.lightTheme === "yes" ? false : true;

const adjustFooter = () => {
  if (document.body.clientWidth < 500) {
    anime({
      targets: [".footer_owner_info p"],
      fontSize: toggled ? "14px" : "18px",
      marginLeft: "0px",
      marginRight: "0px",
    });

    anime({
      targets: [".footer_owner_info"],
      fontSize: toggled ? "18px" : "18px",
    });
  } else {
    //reset footer
    anime({
      targets: [".footer_owner_info p"],
      fontSize: toggled ? "28px" : "36px",
      marginLeft: "0.05em",
      marginRight: "0.5em",
    });

    anime({
      targets: [".footer_owner_info"],
      fontSize: toggled ? "40px" : "40px",
    });
  }

  //remove margins
  //lower font size
  // Add display flex
  // set width
  // Icon size, text size ownerinfo
};

const toggle = () => {
  if (firstLoad === "yes") {
    firstLoad = "no";
    localStorage.setItem("firstLoad", "no");
    document.body.classList.toggle("toggled");
    return;
  }
  toggled = !toggled;
  lightTheme = lightTheme === "yes" ? "no" : "yes";
  localStorage.setItem("lightTheme", lightTheme);
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
    targets: ".collection_list_container",
    color: toggled ? "rgb(200, 200, 200)" : "rgb(0, 0, 0)",
    backgroundColor: toggled ? "rgb(0, 0, 0,0.85)" : "rgb(255, 255, 255)",
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
      " #highlight, #recent-activity, #title, .btn_text , .footer_btn, .footer_p, h2,h1,.collection_list_container",
    ],
    {
      fontFamily: toggled ? "DotGothic" : "Oswald",
    }
  );

  anime({
    targets: [".separator-zone-1, .separator-zone-2, .footer"],
    border: toggled
      ? "2.1px solid rgb(200, 200, 200)"
      : "2.1px solid rgb(0, 0, 0)",
    borderStyle: "solid",
    borderRightColor: "rgb(0, 0, 0,0)",
    borderBottomColor: "rgb(0, 0, 0,0)",
    borderLeftColor: "rgb(0, 0, 0,0)",
  });

  anime({
    targets: [".footer_owner_info p"],
    fontSize: toggled ? "28px" : "36px",
  });

  anime({
    targets: [".footer_owner_info"],
    fontSize: toggled ? "40px" : "40px",
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

const introAnimations = () => {
  // run scrolling animation for title
  anime({
    targets: [
      "#title",
      "#highlight",
      "#recent-activity",
      ".collection_list_container",
    ],
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 1500,
    easing: "easeOutCubic",
  });

  anime({
    targets: [
      ".info_text",
      ".short-desc-highlight",
      ".title-highlight",
      ".recent_activity_text",
      ".recent_activity_date",
    ],
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 1500,
    easing: "easeOutCubic",
  });
  anime({
    targets: ".header_btn ",
    translateY: [-50, 2],
    opacity: [0, 1],
    duration: 1500,
    easing: "easeOutCubic",
    delay: anime.stagger(300),
  });
};

const retrievePageStateAndSetTheme = () => {
  if (localStorage.getItem("lightTheme") === null) {
    console.log(localStorage.getItem("lightTheme"));
    localStorage.setItem("lightTheme", "no");
    localStorage.setItem("firstLoad", "no");
  }
  if (firstLoad === "yes") {
    if (lightTheme === "no") {
      firstLoad = "no";
      localStorage.setItem("firstLoad", "no");
      return;
    }
    const wrapper = document.getElementsByClassName("tile");
    const numb =
      Math.floor(wrapper.length / 2) + Math.floor(wrapper.length / 26);
    wrapper[numb].click();
  } else {
    if (lightTheme === "yes") {
      firstLoad = "yes";
      localStorage.setItem("firstLoad", "yes");
      const wrapper = document.getElementsByClassName("tile");
      const numb =
        Math.floor(wrapper.length / 2) + Math.floor(wrapper.length / 26);
      wrapper[numb].click();
    }
  }
};

window.onload = () => {
  introAnimations();
  retrievePageStateAndSetTheme();
  adjustFooter();
};

//Clean off variables
window.onunload = () => {
  localStorage.setItem("firstLoad", "no");
};

//Fix grid size on resize
window.onresize = () => {
  createGrid();
  adjustFooter();
};