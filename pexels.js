//dynamic url

const loadPictures = function (query) {
  const URL = `https://api.pexels.com/v1/search?query=${query}`
  const API_KEY = 'xFBj2MpOtMvpxx12EkG31qsXeIc43DZXkQVqOM5STgLlvhYYTHKhXdBl'
  const row = document.getElementById('card-row')

  fetch(URL, {
    method: 'GET',
    body: JSON.stringify(),
    headers: {
      'Content-Type': 'application/json',
      Authorization: API_KEY,
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

      row.innerHTML = '' //clear the webpage

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
        <button type="button" class="btn btn-sm btn-outline-secondary view-btn">View</button>
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

        //view button
        card.querySelector('.view-btn').addEventListener('click', () => {
          const modalContainer = document.createElement('div')
          modalContainer.innerHTML = `<div class="modal fade" id="viewImageModal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title font-monospace" id="modalLabel">${pic.alt}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <img src="${pic.src.original}" class="img-fluid">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      `

          document.body.appendChild(modalContainer)
          const modal = new bootstrap.Modal(
            modalContainer.querySelector('.modal')
          )
          modal.show()
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
  document.getElementById('search-btn').addEventListener('click', (event) => {
    event.preventDefault()
    const searchTerm = document.getElementById('search-input').value.trim()
    loadPictures(searchTerm)
    document.getElementById('search-form').reset()
  })
})
