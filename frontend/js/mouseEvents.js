//Set listeners for mouse events
document.getElementsByTagName("body").item(0).onmousemove = (e) => {
  // console.log(`mouse at: [${e.clientX}, ${e.clientY}]`)
  console.log(`mouse move`)
}

document.getElementsByTagName("body").item(0).onmousedown = (e) => {
  const x = e.clientX / window.screen.availWidth
  const y = e.clientY / window.screen.availHeight
  console.log(`click at: [${x}, ${y}]`)
}


document.getElementsByTagName("body").item(0).onmouseup = (e) => {
  if (window.getSelection) {
    const text = window.getSelection().toString()
    if (text !== '') {
      console.log(`Selected text: ${text}, based on function`)
    }
  } else if (document.selection && document.selection.type != "Control") {
    const text = window.selection.createRange().text
    console.log(`Selected text: ${text}, based on object`)
  }
}

document.getElementsByTagName("body").item(0).onscroll = (e) => {
  console.log("scroll event recorded");
}

window.addEventListener('blur', () => [
  console.log("STOP CAPTURING")
])
window.addEventListener('focus', () => [
  console.log("START AGAIN")
])
