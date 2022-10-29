const wrapper = document.getElementById("tiles");
let gamewrapper = document.getElementById("game_tiles");

var firstLoad = localStorage.getItem("firstLoad");
var lightTheme = localStorage.getItem("lightTheme");
let heartUndertaleIcon;
let gameMode = false;

let columns = 0,
  rows = 0,
  toggled = localStorage.lightTheme === "yes" ? false : true;

const loadGame = () => {
 

  let spawn_pos = {
    x: heartUndertaleIcon.getBoundingClientRect().left,
    y: heartUndertaleIcon.getBoundingClientRect().top,
  };

  //Hide everything to start game
  window.document.getElementsByClassName("div_bg")[0].style.display = "none";
  window.document.getElementsByClassName("container")[0].style.display = "none";
  window.document.getElementsByClassName("collection_list_container")[0].style.display = "none";

  const heartUndertale = window.document.getElementById("undertale_heart");
  
  //Spawn undertale heart at spawn position
  heartUndertale.style.zIndex = "10";
  heartUndertale.style.position = "absolute";
  heartUndertale.style.left = spawn_pos.x -17.5 + "px";
  heartUndertale.style.top = spawn_pos.y -17.5 + "px";


  //Flashing animation and move into position
  var tl = anime.timeline({
    easing: 'linear',
    duration: 0
  });
  

  tl
  .add({
    targets: ["#undertale_heart"],
    opacity: 0,
    duration: 200,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 0,
    duration: 100,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 1,
    duration: 100,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 0,
    duration: 100,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 0,
    duration: 200,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 1,
    duration: 100,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    translateX: [0, -580],
    translateY: [0, -19],
    duration: 700,
    easing: 'linear',
  }).add({
    targets: [".game_container",".stats_box",".game_box",".background_box",".options_box"],
    opacity: 1,
    duration: 400,
    easing: 'linear',
    begin: function() {
      document.querySelector('.game_container').style.display = 'block';
      document.querySelector('.stats_box').style.display = 'block';
      document.querySelector('.game_box').style.display = 'block';
      document.querySelector('.background_box').style.display = 'block';
      document.querySelector('.options_box').style.display = 'flex';
      createGrid(gamewrapper);
    }
  }).add({
    targets: ["#undertale_heart"],
    opacity: 0,
    duration: 100,
    easing: 'linear',
    begin: function() {

      const fight_icon = document.querySelector('#fight_icon');
      fight_icon.classList.add('heart_icon');
      fight_icon.src = './src/assets/img/undertale/green_heart.png';
      
    }
  });


  //height: 34px;
  //top: 50%;
  //transform: translateY(75%);

  //Synchronize with SFX
  //Set to right translateX and translateY

  

 
  
  

  //Turn Opacity to 1 of menu battle scene and small fighting grid
};

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
      ? "6.35px solid rgb(200,200,200, 1)"
      : "0.1px solid rgb(0,0,0, 0.87)",
  });

  anime.set([".page, .container, a, .title-highlight"], {
    border: "none",
    fontFamily: toggled ? "VT323" : "Oswald",
  });

  anime.set(
    [
      "#highlight, #recent-activity, #title, .btn_text , .footer_btn, .footer_p, h2,h1,.collection_list_container",
    ],
    {
      fontFamily: toggled ? "DotGothic" : "Oswald",
    }
  );

  anime.set(
    [".subtext_recent_activity"],
    {fontFamily: toggled ? "under_mono" : "Oswald",}
  )

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

const createTile = (index,e) => {
  const tile = document.createElement("div");
  if(e.id === "game_tiles") {
    tile.classList.add("game_tile");
    tile.style.opacity = 1;
    return tile;
  }
  tile.classList.add("tile");
  //Make element invisible to screen reader
  tile.setAttribute("aria-hidden", "true");

  tile.style.opacity = 1;

  tile.onclick = (e) => handleOnClick(index);

  return tile;
};

const createTiles = (quantity,e) => {
  Array.from(Array(quantity)).map((tile, index) => {
    e.appendChild(createTile(index,e));
  });
};

const createGrid = (e) => {
 
  e.innerHTML = "";

  const size = document.body.clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.body.clientWidth / size);
  rows = Math.floor(document.body.clientHeight / size);
  
  if(e.id === "game_tiles")
  {
    columns = Math.floor(e.getBoundingClientRect().width /size/2);
    rows = Math.floor(e.getBoundingClientRect().height /size/2);
  }

  e.style.setProperty("--columns", columns);
  e.style.setProperty("--rows", rows);

  createTiles(columns * rows, e);
};

createGrid(wrapper);

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
  heartUndertaleIcon = document.getElementById("undertale_heart_icon");
  gamewrapper = document.getElementById("game_tiles");
  heartUndertaleIcon.onclick = () => {
    loadGame();
  };
  
};

//Clean off variables
window.onunload = () => {
  localStorage.setItem("firstLoad", "no");
};

//Fix grid size on resize
window.onresize = () => {
  createGrid(wrapper);
  adjustFooter();
};
