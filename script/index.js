
function removeActiveClass (){
  const activeButtons = document.getElementsByClassName("active");
  for(let btn of activeButtons){
    btn.classList.remove("active");
  }
  console.log(activeButtons)

}
function loadCategories(){
  //1- fetch
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

//2- convert promise to json
 .then(res => res . json())
//  3- send data to display
 .then(deta => displayCategories(deta.categories));

}

function loadVideo (){
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
  .then(response => response.json())
  .then(data =>{

    removeActiveClass();

   document.getElementById("btn-all").classList.add("active");
    displayVideo(data.videos)
  })
}
                              // 1001
const loadCategoriesVideos = (id) => {
  
  const url =`
  https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  console.log(url)

  fetch(url)
  .then(res => res.json())
  .then((data)=>{

    removeActiveClass();

    const clickButton = document.getElementById(`btn-${id}`);
    clickButton.classList.add("active");
    console.log(clickButton)
    displayVideo(data.category)
  })
 
  
    
}

const loadVideoDetails =(videoId)=>{
  const url =`https://openapi.programming-hero.com/api/phero-tube/videos/${videoId}`;
  fetch(url)
  .then(res=>res.json())
  .then(data =>displayVideoDetails(data.video))
   
  
  
};

const displayVideoDetails=(video)=>{
  console.log(video)
  document.getElementById("video_details").showModal();

  const detailsContainer = document.getElementById("details_Container");

  detailsContainer.innerHTML=`
  <h2>${video.title}</h2>`
};
 



{
//   {
//     "category_id": "1001",
//     "video_id": "aaah",
//     "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//     "title": "Colors of the Wind",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//             "profile_name": "Ethan Clark",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "233K",
//         "posted_date": "16090"
//     },
//     "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }

  // "category_id": "1001",
  // "category": "Music"
}
function displayCategories(categories){
// console.log(categories)

// get the constainer
const categoriesContainer =document.
getElementById("category-container")
//  Loop operation on array of object
for(let cat of categories){
  console.log(cat)

// create Element
const categortDiv =document.createElement("div");
categortDiv.innerHTML=`
  <button id="btn-${cat.category_id}" onclick="loadCategoriesVideos(${cat.category_id})
  " class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category}</button>
 `;

// append the Element
categoriesContainer.append(categortDiv)

}

}


const displayVideo = (videos) => {
  // console.log(videos)
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML="";

  if(videos.length==0){
    videoContainer.innerHTML=`
     <div class="col-span-full flex flex-col text-center justify-center items-center py-20">
      <img class="w-[120px]" src="img/Icon.png" alt="">
      <h2 class="text-3xl font-bold ">Oops!! Sorry, There is no content here</h2>
    </div>
    
    `;
    return;
  }

  videos.forEach(video=>{
      console.log(video)
    const videoCard = document.createElement("div")
     videoCard .innerHTML = `
     <div class="card bg-base-100 ">
      <figure class="relative">
        <img class="w-full h-[150px] "
          src="${video.thumbnail}"
          alt="Shoes" />
          <span class="absolute  bottom-2 right-2 text-sm rounded text-white bg-black px-2">3hrs 56 min ago</span>
      </figure>

      <div class=" flex gap-3 px-0 py-5">
        <div class="profile">
          <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
        </div>

        <div class="">
          <h2 class="text- font-semibold">Midnight Serenade</h2>
          <p class=" text-sm text-gray-400 flex gap-1">
        ${video.authors[0].profile_name}<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"></p>
        <p class="text-gray-400">${video.others.views}</p>
        </div>

        </div>

        <div>
        <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Wide</button>
        </div>

      </div>
     
    `
    videoContainer.append( videoCard)
  })
  
  };



loadCategories();

 