form = document.getElementById('qForm')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (form.checkValidity() === false) {
    event.stopPropagation()
  }
  form.classList.add('was-validated')

  const readWarAndPeace = document.getElementById('warPeaceRadioTrue').checked
  const readGrimm = document.getElementById('grimmRadioTrue').checked

  const JSONobj = {
    screenWidth: $(window).width(),
    screenHeight: $(window).height(),
    age: Number.parseInt($('#ageInput').val()),
    gender: $('#genderSelect').val(),
    levelOfEducation: $('#levelOfEducationSelect').val(),
    usingMouse: document.getElementById('mouseRadiosMouse').checked,
    readWarAndPeace: readWarAndPeace,
    readGrimm: readGrimm,
  }

  if (readGrimm && !readWarAndPeace) {
    setCookie("reads", "war_and_peace", 1)
  } else if (!readGrimm && readWarAndPeace) {
    setCookie("reads", "grimm", 1)
  } else {
    if (Math.random() > .5) {
      setCookie("reads", "grimm", 1)
    } else {
      setCookie("reads", "war_and_peace", 1)
    }
  }


  $.post({
        url: `${hostUrl}/submit_quest`,
        crossDomain: true,
        crossOrigin: "*",
        contentType: 'text/plain',
        data: JSON.stringify(JSONobj),
        success: (res, status) => {
          setCookie('userId', res['cookieId'], 1)
          window.location.href = "index.html"
        },
      })
}, false)

