let lastSendMoveObject = {
  x: null,
  y: null,
  clickedLeft: null,
  clickedRight: null,
  selectedText: null,
  scrollLoc: null,
  onScreen: null,
  timestamp: null,
  screenWidth: null,
  screenHeight: null,
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
    const userId = getCookie("userId")
    if (!equal && userId) {

      const reqData = prepReqData()

      $.post({
        url: `${hostUrl}/create_record`,
        crossDomain: true,
        crossOrigin: "*",
        contentType: 'text/plain',
        data: JSON.stringify({
          timestamp: (new Date()).toISOString(),
          screenWidth: $(window).width(),
          screenHeight: $(window).height(),
          userId: userId,
          ...reqData,
        })
      })
    } else {
      console.log("No request send")
    }
    await sleep(1000)
  }
}

async function startProbeTimer(firstProbe) {
  // between 4 and 12 seconds
  let sleeptime
  if (firstProbe) {
    sleeptime = 10 * 1000 + (20 * 1000 * Math.random());
  } else {
    sleeptime = 20 * 1000 + (10 * 1000 * Math.random());
  }

  const probTime = new Date()

  for (let i = 1; i <= 6; i++) {
    $(`#probe_answer_${i}`).attr("onclick", `postProbe(${i}, ${sleeptime}, ${probTime.getTime()}, ${firstProbe})`)
  }

  await sleep(sleeptime)

  $("#probe").modal({
    backdrop: "static",
    keyboard: false,
  })

}


function postProbe(answer, delayTime, timeStartTime, firstProbe) {

  if (firstProbe) {
    startProbeTimer(false)
  }

  const probeResponseData = {
    userId: getCookie("userId"),
    answer: answer,
    page: parseInt(getCookie("currentPage")),
    delayTime: Math.round(delayTime),
    timeToAnswer: Math.round((new Date()).getTime() - (timeStartTime + delayTime)),
    timestamp: (new Date()).toISOString(),
  }

  $.post({
    url: `${hostUrl}/probe`,
    crossDomain: true,
    crossOrigin: "*",
    contentType: 'text/plain',
    data: JSON.stringify(probeResponseData),
    success: (res, status) => {
      console.log("Thanks for answering!")
    },
  })
}
