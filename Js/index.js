const discussCardContainer = document.getElementById('discuss-card-container');
const markAsReadContainer = document.getElementById('mark-as-read-container');
const counter = document.getElementById('counter');
const latestPostContainer = document.getElementById('latest-post-container');
const loadingSpinner = document.getElementById('loading-spinner');
let count = 1;



//handle loading spinner
const handleLoadingSpinner = (isLoading)=>{
     if(isLoading){
       
        loadingSpinner.classList.remove('hidden');
        
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const spinnerFor2Sec =()=>{
setTimeout(()=> {
    handleLoadingSpinner(false);
}, 2000);
}


 const loadAllPosts = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    discussCardContainer.innerHTML = "";
    data.posts.forEach((post)=>{
        categoryName = post.category;
        let activeStatusGreen = `<div class="bg-green-400 rounded-full w-[14px] h-[14px] mx-auto" ></div>`
        let activeStatusRed = `<div class="bg-red-400 rounded-full w-[14px] h-[14px] mx-auto" ></div>`
        if(post.isActive){
            
            post.isActive = activeStatusGreen;
        }
        else{
           post.isActive = activeStatusRed;
        }
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="space-y-4">
                    
                    <div class="bg-[#797DFC1A] p-10 rounded-xl flex flex-col lg:flex-row gap-6">
                      <div class="w-[50px] lg:w-[72px] h-[50px] lg:h-[72px] rounded-2xl shadow-sm  relative bg-[url('${post.image}')] bg-no-repeat bg-cover">
                          <div class ="bg-white w-[18px] h-[18px] rounded-full absolute -right-2 -top-2 flex items-center" >
                          ${post.isActive}
                          </div>
                      </div>
                      <div class="flex-1">
                          <div class="font-inter text-[#12132DCC] font-medium flex flex-col lg:flex-row lg:items-center gap-5 mb-3">
                            <h4># ${post.category}</h4>
                            <h4>Author : ${post.author.name}</h4>
                          </div>
                          <div class="font-mulish text-[#12132D] text-xl font-semibold mb-4">
                            <h3>${post.title}</h3>
                          </div>
                          <div class="font-inter text-[#12132D99] mb-5">
                            <p>${post.description}</p>
                          </div>
                          <div class="my-5">
                            <hr class="border-dashed border-[#12132D40]">
                          </div>
                          <div class="flex gap-4 lg:gap-0 flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
                            <div class="text-[#12132D99] font-inter flex flex-col lg:flex-row items-start lg:items-center gap-5">
                              <div class="flex gap-3 items-center"><i class="ri-chat-2-line text-xl"></i> <span>${post.comment_count}?</span></div>
                              <div class="flex gap-3 items-center"><i class="ri-eye-line text-xl"></i> <span>${post.view_count}</span></div>
                              <div class="flex gap-3 items-center"><i class="ri-time-line text-xl"></i> <span>${post.posted_time} min</span></div>
                            </div>
                            <div class="">
                              <button id="mark-as-btn" onclick="add('${post.title.replace(/'/g,'')}', '${post.view_count}')" class="w-[28px] h-[28px] rounded-full bg-[#10B981] p-4 flex justify-center items-center mx-auto"><i class="ri-mail-open-line text-white font-bold"></i></button>
                            </div>
                          </div>
                      </div>
                    </div>
                    
                    <div></div>
                  </div>

                  
        `

        discussCardContainer.appendChild(div);
    })
 }


    const loadPosts = async(categoryName)=>{
    
    const res =await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`);
    const data =await res.json();
    discussCardContainer.innerHTML = "";
    
    data.posts.forEach((post)=>{
        let activeStatusGreen = `<div class="bg-green-400 rounded-full w-[14px] h-[14px] mx-auto" ></div>`
        let activeStatusRed = `<div class="bg-red-400 rounded-full w-[14px] h-[14px] mx-auto" ></div>`
        if(post.isActive){
            
            post.isActive = activeStatusGreen;
        }
        else{
           post.isActive = activeStatusRed;
        }
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="space-y-4">
                    
                    <div class="bg-[#797DFC1A] p-10 rounded-xl flex flex-col lg:flex-row gap-6">
                      <div class="w-[50px] lg:w-[72px] h-[50px] lg:h-[72px] rounded-2xl shadow-sm  relative bg-[url('${post.image}')] bg-no-repeat bg-cover">
                          <div class ="bg-white w-[18px] h-[18px] rounded-full absolute -right-2 -top-2 flex items-center" >
                          ${post.isActive}
                          </div>
                      </div>
                      <div class="flex-1">
                          <div class="font-inter text-[#12132DCC] font-medium flex flex-col lg:flex-row lg:items-center gap-5 mb-3">
                            <h4># ${post.category}</h4>
                            <h4>Author : ${post.author.name}</h4>
                          </div>
                          <div class="font-mulish text-[#12132D] text-xl font-semibold mb-4">
                            <h3>${post.title}</h3>
                          </div>
                          <div class="font-inter text-[#12132D99] mb-5">
                            <p>${post.description}</p>
                          </div>
                          <div class="my-5">
                            <hr class="border-dashed border-[#12132D40]">
                          </div>
                          <div class="flex gap-4 lg:gap-0 flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
                            <div class="text-[#12132D99] font-inter flex flex-col lg:flex-row items-start lg:items-center gap-5">
                              <div class="flex gap-3 items-center"><i class="ri-chat-2-line text-xl"></i> <span>${post.comment_count}?</span></div>
                              <div class="flex gap-3 items-center"><i class="ri-eye-line text-xl"></i> <span>${post.view_count}</span></div>
                              <div class="flex gap-3 items-center"><i class="ri-time-line text-xl"></i> <span>${post.posted_time} min</span></div>
                            </div>
                            <div class="">
                              <button id="mark-as-btn" onclick="add('${post.title.replace(/'/g,'')}', '${post.view_count}')" class="w-[28px] h-[28px] rounded-full bg-[#10B981] p-4 flex justify-center items-center mx-auto"><i class="ri-mail-open-line text-white font-bold"></i></button>
                            </div>
                          </div>
                      </div>
                    </div>
                    
                    <div></div>
                  </div>

                  
        `

        discussCardContainer.appendChild(div);
    })
    
    
}
//handle title and add read lists
const add= (title,postView)=>{
    
    const markAsButton = document.querySelector('#mark-as-btn');
    const markAsReadContainer = document.getElementById('mark-as-read-container')
    const div = document.createElement('div');
    div.className = "bg-white shadow-sm rounded-2xl lg:flex justify-between items-center w-full p-4"
    div.innerHTML = `
    <div class="w-[212px]">
        <h5 class="text-[#12132D] font-semibold">${title}</h5>
    </div>
    <div class="flex items-center gap-1">
        <img src="./images/tabler-icon-eye.jpg" alt=""> <p class="text-[#12132D99]">${postView}</p>
    </div>

    `

    markAsReadContainer.appendChild(div)
    const counter = document.getElementById('counter');
    counter.innerText = count;
    count++;
   

}


//handle search button
const handleSearch = async()=>{
   
    const searchBoxValue = document.getElementById('search-box').value;
    if(searchBoxValue){
        handleLoadingSpinner(true)
        loadPosts(searchBoxValue);
        spinnerFor2Sec();
    }
    else{
        handleLoadingSpinner(false)
    }

}



//handle latest post
const loadLatestPosts = async()=>{

    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    
    const allPosts = data;
    
    allPosts.forEach((post)=>{
        const div = document.createElement('div');
        let authorDesignation = '';
        
        if(post.author.designation){
            authorDesignation = post.author.designation;
        }
        else{
            authorDesignation = "Unknown";
           
        }
        let publishedDate = '';
        if(post.author.posted_date){
            publishedDate = post.author.posted_date
        }
        else{
            publishedDate="No published date";
        }

        div.className = "card lg:w-96 bg-base-100 shadow-xl";
        div.innerHTML = `
        <figure class="px-10 pt-10">
                      <img src="${post.cover_image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body space-y-2">
                      <div class="flex items-center gap-4">
                        <img src="./images/calender-icon.jpg" alt="">
                        <p>${publishedDate}</p>
                      </div>
                      <h4 class="text-[#12132D] font-bold">${post.title}</h4>
                      <p class="text-[#12132D99]">${post.description}</p>
                      <div class="flex items-center gap-4">
                        <img class="w-[44px] h-[44px] rounded-full object-cover" src="${post.profile_image}" alt="">
                        <div>
                            <h5 class="text-[#12132D] font-semibold">${post.author.name}</h5>
                            <p class="#12132D99">${authorDesignation}</p>
                        </div>
                      </div>
                    </div>
        `
        latestPostContainer.appendChild(div);
    })
}


loadAllPosts();

// handleSearch();

loadPosts("comedy");

loadLatestPosts();