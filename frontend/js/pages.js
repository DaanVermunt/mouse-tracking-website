const pages = [
  {
    sections: [
      "page 1",
      "Wikipedia was launched on January 15, 2001, by Jimmy Wales and Larry Sanger. Sanger coined its name, as a portmanteau of \"wiki\" (the Hawai'ian word for \"quick\") and \"encyclopedia\". Initially an English-language encyclopedia, versions in other languages were quickly developed. With at least 5,951,077 articles, the English Wikipedia is the largest of the more than 290 Wikipedia encyclopedias. Overall, Wikipedia comprises more than 40 million articles in 301 different languages and by February 2014 it had reached 18 billion page views and nearly 500 million unique visitors per month.",
      "Wikipedia was launched on January 15, 2001, by Jimmy Wales and Larry Sanger. Sanger coined its name, as a portmanteau of \"wiki\" (the Hawai'ian word for \"quick\") and \"encyclopedia\". Initially an English-language encyclopedia, versions in other languages were quickly developed. With at least 5,951,077 articles, the English Wikipedia is the largest of the more than 290 Wikipedia encyclopedias. Overall, Wikipedia comprises more than 40 million articles in 301 different languages and by February 2014 it had reached 18 billion page views and nearly 500 million unique visitors per month.",
      "Wikipedia was launched on January 15, 2001, by Jimmy Wales and Larry Sanger. Sanger coined its name, as a portmanteau of \"wiki\" (the Hawai'ian word for \"quick\") and \"encyclopedia\". Initially an English-language encyclopedia, versions in other languages were quickly developed. With at least 5,951,077 articles, the English Wikipedia is the largest of the more than 290 Wikipedia encyclopedias. Overall, Wikipedia comprises more than 40 million articles in 301 different languages and by February 2014 it had reached 18 billion page views and nearly 500 million unique visitors per month.",
    ]
  },
  {
    sections: [
      "page 2",
      "Wikipedia is a multilingual online encyclopedia created and maintained as an open collaboration project using a wiki-based editing system.It is the largest and most popular general reference work on the World Wide Web, and is one of the most popular websites ranked by Alexa as of October 2019. It features exclusively free content and no commercial ads, and is owned and supported by the Wikimedia Foundation, a non-profit organization funded primarily through donations.",
      "Wikipedia is a multilingual online encyclopedia created and maintained as an open collaboration project using a wiki-based editing system.It is the largest and most popular general reference work on the World Wide Web, and is one of the most popular websites ranked by Alexa as of October 2019. It features exclusively free content and no commercial ads, and is owned and supported by the Wikimedia Foundation, a non-profit organization funded primarily through donations.",
      "Wikipedia is a multilingual online encyclopedia created and maintained as an open collaboration project using a wiki-based editing system.It is the largest and most popular general reference work on the World Wide Web, and is one of the most popular websites ranked by Alexa as of October 2019. It features exclusively free content and no commercial ads, and is owned and supported by the Wikimedia Foundation, a non-profit organization funded primarily through donations.",
    ]
  },
]

function setPage(pageNr) {
  setCookie("currentPage", pageNr, 1)
  document.body.scrollTop = document.documentElement.scrollTop = 0;

  const page = pages[pageNr]
  const container = $('#main_text_container')

  container.empty()

  if (page) {

    page.sections.forEach((sec) => {
      container
        .append(`
        <p class="main_paragraph">
          ${sec}
        </p>
    `)
    })

    container.append(`
      <button type="button" class="nxtBtn btn btn-primary float-right" onclick="setPage(${pageNr + 1})">Next</button>
    `)
  } else {
    deleteCookie('currentPage')
    deleteCookie('userId')
    //  Show thank you screen
    container.append(`
      Thank you for taking the experiment.
    `)
  }

}
