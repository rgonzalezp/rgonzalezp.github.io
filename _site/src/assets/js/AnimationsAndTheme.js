const wrapper = document.getElementById("tiles");
let gamewrapper = document.getElementById("game_tiles");

var firstLoad = localStorage.getItem("firstLoad");
var lightTheme = localStorage.getItem("lightTheme");
let heartUndertaleIcon;
let gameMode = false;
let menuMode = false;

let columns = 0,
  rows = 0,
  toggled = localStorage.lightTheme === "yes" ? false : true;

  //##########################AUDIO###################################
const audioQueue = [];
// Function to add audio to the queue
function addToQueue(audioSrc) {
  const audio = new Audio(audioSrc);
  audioQueue.push(audio);
}

// Function to play the next audio in the queue
function playNext() {
  if (audioQueue.length > 0) {
    const audio = audioQueue.shift();
    audio.addEventListener('ended', playNext);
    audio.play();
  }
}

//##########################AUDIO###################################

//##########################PLAYER_CONTROLLER###################################
// Add an event listener for keyboard input on the document
// Define flag variables to track key states
let leftArrowPressed = false;
let upArrowPressed = false;
let rightArrowPressed = false;
let downArrowPressed = false;
let enterPressed = false;

function readKeyInputMenu(keyEvent) {
  if(!enterPressed && keyEvent === 'Enter'){
    enterPressed = true;
    addToQueue('./src/assets/music/snd_select.wav');
    playNext();
  } else if (!leftArrowPressed && keyEvent === 'ArrowLeft') {
    leftArrowPressed = true;
    btn_icons = document.querySelectorAll('.btn_icons')
    current = 0;
    for (let i = btn_icons.length-1; i > 0; i--) {
      current_btn = btn_icons[i];
      current = i;
      if(current_btn.classList.contains('heart_icon') && i !== 0){
        current_btn.classList.remove('heart_icon');
        break;
      }
    }
    if(current - 1 >= 0){
      current -= 1;
      btn_icons[current].classList.add('heart_icon');
      btn_icons[current].src = './src/assets/img/undertale/green_heart.png';
      menu_btns[current].style.border = "2px solid #faf443"
      menu_btns[current].style.color = "#faf443"
    }

    addToQueue('./src/assets/music/snd_squeak.wav');
    playNext();
    if(current === 2){
      btn_icons[3].src = './src/assets/img/undertale/mercy_icon.png';
      menu_btns[3].style.border = "2px solid #ff7f27"
      menu_btns[3].style.color = "#ff7f27"
    } else if (current === 1){
      btn_icons[2].src = './src/assets/img/undertale/item_icon.png';
      menu_btns[2].style.border = "2px solid #ff7f27"
      menu_btns[2].style.color = "#ff7f27"
      
    } else if (current === 0) {
      btn_icons[1].src = './src/assets/img/undertale/act_icon.png';
      menu_btns[1].style.border = "2px solid #ff7f27"
      menu_btns[1].style.color = "#ff7f27"
    }
   
  } else if (!upArrowPressed && keyEvent === 'ArrowUp') {
    upArrowPressed = true;
    
  } else if (!rightArrowPressed && keyEvent === 'ArrowRight') {
    rightArrowPressed = true;
    btn_icons = document.querySelectorAll('.btn_icons')
    current = 0;
    for (let i = 0; i < btn_icons.length; i++) {
      current_btn = btn_icons[i];
      current = i;
      if(current_btn.classList.contains('heart_icon') && i !== 3){
        current_btn.classList.remove('heart_icon');
        break;
      }
    }
    if(current + 1 < btn_icons.length){
      current += 1;
      btn_icons[current].classList.add('heart_icon');
      btn_icons[current].src = './src/assets/img/undertale/green_heart.png';
      menu_btns = document.querySelectorAll('.menu_btn');
      menu_btns[current].style.border = "2px solid #faf443"
      menu_btns[current].style.color = "#faf443"
    }

    addToQueue('./src/assets/music/snd_squeak.wav');
    playNext();
    if(current === 1){
      btn_icons[0].src = './src/assets/img/undertale/fight_icon.png';
      menu_btns[0].style.border = "2px solid #ff7f27"
      menu_btns[0].style.color = "#ff7f27"
      
    } else if (current === 2){
      btn_icons[1].src = './src/assets/img/undertale/act_icon.png';
      menu_btns[1].style.border = "2px solid #ff7f27"
      menu_btns[1].style.color = "#ff7f27"
      
    } else if (current === 3) {
      btn_icons[2].src = './src/assets/img/undertale/item_icon.png';
      menu_btns[2].style.border = "2px solid #ff7f27"
      menu_btns[2].style.color = "#ff7f27"
    }

    
  } else if (!downArrowPressed && keyEvent === 'ArrowDown') {
    downArrowPressed = true;
    
  }
}

// Add an event listener for keyboard input on the document
document.addEventListener('keydown', function(event) {
  
  if(menuMode){
    readKeyInputMenu(event.key);
  } else {
      // Check which key was pressed
    switch (event.key) {
      case 'ArrowLeft':
        // Code to execute when the left arrow key is pressed
        leftArrowPressed();
        break;
      case 'ArrowUp':
        // Code to execute when the up arrow key is pressed
        upArrowPressed();
        break;
      case 'ArrowRight':
        // Code to execute when the right arrow key is pressed
        rightArrowPressed();
        break;
      case 'ArrowDown':
        // Code to execute when the down arrow key is pressed
        downArrowPressed();
        break;
      default:
        // Handle other keys or do nothing
        break;
    }
  }
});


// Add an event listener for keyup to reset the flag when the key is released
document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case'Enter':
      enterPressed = false;
      break;
    case 'ArrowLeft':
      leftArrowPressed = false;
      break;
    case 'ArrowUp':
      upArrowPressed = false;
      break;
    case 'ArrowRight':
      rightArrowPressed = false;
      break;
    case 'ArrowDown':
      downArrowPressed = false;
      break;
  }
});

// Define functions for each arrow key action
function leftArrowPressedGame() {
  
}

function upArrowPressedGame() {
  
}

function rightArrowPressedGame() {
  
}

function downArrowPressedGame() {
  
}


//##########################PLAYER_CONTROLLER###################################





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
    duration: 100,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 0,
    duration: 50,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 1,
    duration: 50,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 0,
    duration: 50,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    opacity: 1,
    duration: 50,
    easing: 'easeOutInBounce',
  })
  .add({
    targets: ["#undertale_heart"],
    translateX: [0, -580],
    translateY: [0, -19],
    duration: 500,
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
      fight_icon.style.color = 'faf443';
      fight_icon.classList.add('heart_icon');
      fight_icon.src = './src/assets/img/undertale/green_heart.png';
      addToQueue('./src/assets/music/oh-yes-undertale.mp3');
      playNext();
      gameMode = true;
      menuMode = true;
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

  //Disabled for now, should create a cool stagger effect as before and keep my oldschool game style theme
  //tile.onclick = (e) => handleOnClick(index);

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
    // Usage
    addToQueue('./src/assets/music/BattleEncounter.mp3');

    // Start playing the queue
    playNext();
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
