form = document.getElementById('qForm')
form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (form.checkValidity() === false) {
    event.stopPropagation()
  }
  form.classList.add('was-validated')
  const JSONobj = {
    screenWidth: $(window).width(),
    screenHeight: $(window).height(),
    age: Number.parseInt($('#ageInput').val()),
    gender: $('#genderSelect').val(),
    levelOfEducation: $('#levelOfEducationSelect').val(),
    distraction: Number.parseInt($('#distractionSelect').val()),
    usingMouse: document.getElementById('mouseRadiosMouse').checked,
    readWarAndPeace: document.getElementById('warPeaceRadioTrue').checked,
  }

  $.post({
        url: "http://localhost:8080/submit_quest",
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
