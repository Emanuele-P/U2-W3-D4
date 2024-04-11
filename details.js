const params = new URLSearchParams(window.location.search)
const imageId = params.get('id')

window.addEventListener('DOMContentLoaded', () => {
  fetch(URL + id).then((response) => {
    const col = document.createElement('div')
    col.classList.add('col-md-6')
    const card = document.createElement('div')
    card.classList.add('card', 'mb-5', 'shadow-sm')

    const { _id, name, photographer, photographer_url } = picObj

    card.innerHTML = `<img src=${photos.src.portrait} class="bd-placeholder-img card-img-top" />
    <div class="card-body">
        <h5 class="card-title">${photos.alt}</h5>
        <p class="card-text">
            ${photos.photographer}
        </p>
        <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">${photographer_url}</small>
        </div>
    </div>`
  })
})
