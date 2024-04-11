//dynamic url

const loadPictures = function (query) {
  const URL = `https://api.pexels.com/v1/search?query=${query}`
  const row = document.getElementById('card-row')
  row.innerHTML = '' //clear the webpage

  fetch(URL, {
    method: 'GET',
    body: JSON.stringify(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'xFBj2MpOtMvpxx12EkG31qsXeIc43DZXkQVqOM5STgLlvhYYTHKhXdBl',
    },
  })
    .then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Failed to fetch')
      }
    })
    .then((data) => {
      console.log(data)

      // generate a set of cards

      data.photos.forEach((pic) => {
        const col = document.createElement('div')
        col.classList.add('col-md-4')
        const card = document.createElement('div')
        card.classList.add('card', 'mb-4', 'shadow-sm')

        card.innerHTML = `
        <a href="details.html?id=${pic.id}">
        <img src="${pic.src.portrait}" class="bd-placeholder-img card-img-top" />
        </a>
        <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
        <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
        </div>
        <small class="text-muted font-monospace">id:${pic.id}</small>
        </div>
        </div>`

        col.appendChild(card)
        row.appendChild(col)

        //hide button

        card.querySelector('.hide-btn').addEventListener('click', () => {
          col.remove()
        })
      })
    })
    .catch((error) =>
      console.log('There was an error in loading the images :(', error)
    )
}

//onload events

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('first-set').addEventListener('click', (event) => {
    event.preventDefault()
    loadPictures('city')
  })
  document.getElementById('second-set').addEventListener('click', (event) => {
    event.preventDefault()
    loadPictures('architecture')
  })
})
