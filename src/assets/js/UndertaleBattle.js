//animate flashing heart 3 times

anime({
  targets: [".heart"],
  opacity: toggled ? [0, 1] : [1, 0],
  easing: "linear",
  duration: 500,
  delay: 500,
  loop: 3,
});
