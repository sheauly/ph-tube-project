function loadCategories() {
    // console.log("category is loading")
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
    .then (data => displayCategories(data.categories))
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
    .then(data => displayVideos(data.videos
))
}
// category_id: '1001',
// category: 'Music'

const loadCategoriesVideos = (id) => {
    console.log(id);
    const url = ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
        .then((res) => res.json())
    .then((data) => displayVideos(data.category))
}

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (let cat of categories) {
        // console.log(cat)
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML = `
        <button onclick = "loadCategoriesVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `

        categoryContainer.append(categoryDiv)
    }
}


// {category_id: '1001', video_id: 'aaah', thumbnail: 'https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg', title: 'Colors of the Wind', authors: Array(1), …}
// authors
// : 
// [{…}]
// category_id
// : 
// "1001"
// description
// : 
// "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// others
// : 
// {views: '233K', posted_date: '16090'}
// thumbnail
// : 
// "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg"
// title
// : 
// "Colors of the Wind"
// video_id
// : 
// "aaah"
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container')
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
            </div>
        `

        videosContainer.append(videoCard)
    })
}
loadCategories();
