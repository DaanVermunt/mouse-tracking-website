document.getElementsByTagName("body").item(0).onmousemove = (e) => {
  // console.log(`mouse at: [${e.clientX}, ${e.clientY}]`)
  console.log(`mouse move`)
}

document.getElementsByTagName("body").item(0).onmousedown = (e) => {
  console.log(`click at: [${e.clientX}, ${e.clientY}]`)
}

document.getElementsByTagName("body").item(0).onmouseup = (e) => {
  if (window.getSelection) {
    const text = window.getSelection().toString()
    console.log(`Selected text: ${text}, based on function`)
  } else if (document.selection && document.selection.type != "Control") {
    const text = window.selection.createRange().text
    console.log(`Selected text: ${text}, based on object`)
  }
}

document.getElementsByTagName("body").item(0).onscroll = (e) => {
  console.log("scroll event recorded");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function mainLoop() {
  while(true) {
    // between 4 and 12 seconds
    const sleeptime = 4000 + (8000 * Math.random());
    await sleep(sleeptime)
    const wandering = confirm("Were you mind wandering?\nPress OK if you were mind wandering\nPress Cancel if you were still alert.")
    if(wandering){
      console.log("The subject was wandering")
    } else {
      console.log("The subject was paying attention")
    }
  }
}

mainLoop().then((res) => {
  console.log("Done")
})
