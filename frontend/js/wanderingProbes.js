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

// mainLoop().then(() => {
//   console.log("Done")
// })
