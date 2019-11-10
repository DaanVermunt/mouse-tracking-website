let lastSendMoveObject = {
  x: null,
  y: null,
  clickedLeft: null,
  clickedRight: null,
  selectedText: null,
  scrollLoc: null,
  onScreen: null,
  timestamp: null,
}

let moveObject = {
  x: null,
  y: null,
  clickedLeft: false,
  clickedRight: false,
  selectedText: null,
  scrollLoc: null,
  onScreen: null,
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function compareObjects() {
  return (
    lastSendMoveObject.x === moveObject.x &&
    lastSendMoveObject.y === moveObject.y &&
    !moveObject.clickedLeft &&
    !moveObject.clickedRight &&
    lastSendMoveObject.selectedText === moveObject.selectedText &&
    lastSendMoveObject.scrollLoc === moveObject.scrollLoc &&
    lastSendMoveObject.onScreen === moveObject.onScreen
  )
}

function prepReqData() {
  lastSendMoveObject = {...moveObject}

  moveObject.clickedLeft = false
  moveObject.clickedRight = false

  return lastSendMoveObject
}

async function uploadDataLoop() {
  while (true) {
    const equal = compareObjects()

    if (!equal) {

      const reqData = prepReqData()
      console.log(reqData)

      $.post({
        url: "http://localhost:8080/create_record",
        crossDomain: true,
        crossOrigin: "*",
        contentType: 'text/plain',
        data: JSON.stringify({
          timestamp: (new Date()).toISOString(),
          userId: getCookie("userId"),
          ...reqData,
        }),
        success: (res, status) => {
          console.log(res)
          console.log(status)
        },
      })
    } else {
      console.log("No request send")
    }
    await sleep(1000)
  }
}

async function probeLoop() {
  // while (true) {
  // between 4 and 12 seconds
  const sleeptime = 4000 + (8000 * Math.random());

  $("#probe").modal({
    keyboard: false,
  })

  await sleep(sleeptime)
  // }

}
