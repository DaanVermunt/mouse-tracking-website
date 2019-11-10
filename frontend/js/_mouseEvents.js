//Set listeners for mouse events
document.getElementsByTagName("body").item(0).onmousemove = (e) => {
  moveObject.x = e.clientX
  moveObject.y = e.clientY
}

document.getElementsByTagName("body").item(0).onmousedown = (e) => {
  moveObject.clickedLeft = true
}

document.getElementsByTagName("body").item(0).oncontextmenu = (e) => {
  moveObject.clickedRight = true
}

document.getElementsByTagName("body").item(0).onmouseup = (e) => {
  if (window.getSelection) {
    moveObject.selectedText = window.getSelection().toString()
  } else if (document.selection && document.selection.type != "Control") {
    moveObject.selectedText = window.selection.createRange().text
  }
}

document.getElementsByTagName("body").item(0).onscroll = (e) => {
  moveObject.scrollLoc = window.pageYOffset || document.documentElement.scrollTop
}

window.addEventListener('blur', () => [
  moveObject.onScreen = false
])

window.addEventListener('focus', () => [
  moveObject.onScreen = true
])
