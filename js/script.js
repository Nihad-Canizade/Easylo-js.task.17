// To top button
let mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Section 2 JSON
let sec2Boxs = document.querySelector('.sec2-boxs');
let page = 3;

function getDataJson() {
  fetch('http://localhost:3000/boxs')
    .then(response => response.json())
    .then(data => {
      data.slice(page - 3, page).forEach(element => {
        sec2Boxs.innerHTML += `
            <div class="sec2-box">
            <i class="bi bi-heart-fill" onclick = "addFavorite(${element.id})""></i>    
            <img src="${element.image}" alt="Image">
            <p class="sec2-box-p1">${element.name}</p>
            <p class="sec2-box-p2">${element.description}</p>
            <div class = "sec2-box-btns">
            <button><a href = "./view.html?id=${element.id}" target ="_blank">View Details</a></button>
            <button><a href = "./update.html?id=${element.id}" target ="_blank">Update</a></button>
            <button onclick = "boxDelete(${element.id})">Delete</button>
            </div>
        </div>`
      })
    })
}
getDataJson();


// Load More function
let loadMoreBtn = document.querySelector(".loadmore-btn");
loadMoreBtn.addEventListener('click', () => {
  page += 3;
  getDataJson();
})


// Boxs delete function
function boxDelete(id) {
  axios.delete(`http://localhost:3000/boxs/${id}`)
  window.location.reload();
}


// Add to Favorties Function
function addFavorite(id) {
  axios.get('http://localhost:3000/boxs/' + id)
    .then(res => {
      axios.post('http://localhost:3000/favorites', res.data)
    })
}