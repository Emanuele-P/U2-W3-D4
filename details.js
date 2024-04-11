// contrasted text

const contrastText = function (hexcolor) {
  hexcolor = hexcolor.replace('#', '')
  let r = parseInt(hexcolor.substr(0, 2), 16)
  let g = parseInt(hexcolor.substr(2, 2), 16)
  let b = parseInt(hexcolor.substr(4, 2), 16)
  let yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? 'black' : 'white'
}
//manage url
const params = new URLSearchParams(window.location.search)
const imageId = params.get('id')

const URL = 'https://api.pexels.com/v1/photos/'
const API_KEY = 'xFBj2MpOtMvpxx12EkG31qsXeIc43DZXkQVqOM5STgLlvhYYTHKhXdBl'

window.addEventListener('DOMContentLoaded', () => {
  if (imageId) {
    const row = document.getElementById('card-row')
    fetch(`${URL}${imageId}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const col = document.createElement('div')
        col.classList.add('col-md-6')
        const card = document.createElement('div')
        card.classList.add('card', 'my-5', 'shadow-sm')

        card.innerHTML = `<img src=${data.src.landscape} class="bd-placeholder-img card-img-top" />
      <div class="card-body">
          <h5 class="card-title">${data.alt}</h5>
          <p class="card-text">
              ${data.photographer}
          </p>
          <div class="d-flex justify-content-between align-items-center">
          <a href="${data.photographer_url}" target="_blank" class="underline align-middle" rel="noopener noreferrer"><small class="text-muted align-top"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right align-top me-3" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
          <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
        </svg>Photographer's Page</small></a>
          </div>
      </div>`

        card.classList.add('frosted-glass')
        col.appendChild(card)
        row.appendChild(col)

        const body = document.querySelector('body')
        body.style.backgroundColor = data.avg_color

        //colored jumbotron
        const textColor = contrastText(data.avg_color)
        const jumbotron = document.querySelector('.jumbotron')
        jumbotron.style.color = textColor

        const buttons = jumbotron.querySelectorAll('.btn')

        buttons.forEach((button) => {
          button.style.color = textColor
          button.style.borderColor = textColor
        })
      })
      .catch((error) => console.log('Error fetching picture details', error))
  } else {
    console.log('No image Id')
  }
})
