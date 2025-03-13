function removeActiveClass() {
    const activeButton = document.getElementsByClassName("active");
    // console.log(activeButton)
    for (let btn of activeButton) {
                btn.classList.remove("active");
            }
}

function loadCategories() {
    // console.log("category is loading")
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
    .then (data => displayCategories(data.categories))
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            document.getElementById("btn-all").classList.add("active");
        displayVideos(data.videos)
    })
};

const loadVideoDetails = (videoId) => {
    console.log(videoId);
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then((res) => res.json())
    .then(data => displayvideosDetails(data.video))
}

const displayvideosDetails = (videos) => {
    console.log(videos);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById("details-contaoiner");

    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${videos.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${videos.title}</h2>
    <p>${videos.description}</p>
  
  </div>
</div>
    `
}
// category_id: '1001',
// category: 'Music'

const loadCategoriesVideos = (id) => {
    // console.log(id);
    const url = ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass();
            const clickdButton = document.getElementById(`btn-${id}`);
            clickdButton.classList.add("active");
            
            console.log(clickdButton)
            displayVideos(data.category)
        });
}

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (let cat of categories) {
        // console.log(cat)
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick = "loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `

        categoryContainer.append(categoryDiv)
    }
}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');

    videosContainer.innerHTML = "";

    if (videos.length == 0) {
        videosContainer.innerHTML = `
         <div class="col-span-full text-center flex flex-col justify-center items-center py-20">
            <img class="w-[120px]" src="assests/Icon.png" alt="" />
            <h2 class="text-2xl font-bold">Oops! sorry, There is no content here</h2>
          </div>
        `
        return; 
    }
    videos.forEach((video) => {
        // console.log(videos);

        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
          <div class="card bg-base-100">
                <figure class="relative ">
                    <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                    <span class="absolute bottom-2 right-2 text-white bg-black rounded px-2">3hrs 56 min ago</span>
                </figure>
                <div class="flex gap-3 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="intro ">
                    <h2 class="text-2xl font-semibold ">Midnight Serenade</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                        <img class="w-5 h-5" src="https://static.vecteezy.com/system/resources/thumbnails/047/309/930/small_2x/verified-badge-profile-icon-png.png" alt="" />
                    </p>
                    <p class="text-sm text-gray-400 ">${video.others.views}</p>
                    </div>
                </div>
                <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Show Details</button>
            </div>
        `

        videosContainer.append(videoCard)
    })
}
loadCategories();
