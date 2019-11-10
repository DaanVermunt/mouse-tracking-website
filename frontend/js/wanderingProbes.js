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

async function startProbeTimer() {
  // between 4 and 12 seconds
  const sleeptime = 4000 + (8000 * Math.random());
  const probTime = new Date()

  console.log(sleeptime)
  for (let i = 1; i <= 6; i++) {
    $(`#probe_answer_${i}`).attr("onclick", `postProbe(${i}, ${sleeptime}, ${probTime.getTime()})`)
  }

  await sleep(sleeptime)

  $("#probe").modal({
    keyboard: false,
  })

}


function postProbe(answer, delayTime, timeStartTime) {

  const probeResponseData = {
    userId: getCookie("userId"),
    answer: answer,
    page: parseInt(getCookie("currentPage")),
    delayTime: Math.round(delayTime),
    timeToAnswer: Math.round((new Date()).getTime() - (timeStartTime + delayTime)),
    timestamp: (new Date()).toISOString(),
  }

  $.post({
    url: "http://localhost:8080/probe",
    crossDomain: true,
    crossOrigin: "*",
    contentType: 'text/plain',
    data: JSON.stringify(probeResponseData),
    success: (res, status) => {
      console.log("Thanks for answering!")
    },
  })
}
