const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false
let imagesLoaded = 0
let totalImages = 0


//Using picsum.photos API
let page = Math.floor(Math.random() * 100) + 1 
let apiUrl = `https://picsum.photos/v2/list?page=${page}&limit=5`


// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true //Loader only happens once, once inital load
        console.log('ready = ', ready)
    }
}



//Helper Fucntion to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


//Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0 //reset imagesLoaded back to 0
    totalImages = photosArray.length
    console.log('total images = ', totalImages)

    // Run function for each object in photoArray
    photosArray.forEach(photo => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.url,
            target: '_blank'
        })

        //Create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src:  photo.download_url,
            alt: photo.author,
            title: photo.author
        })

        //Event Listener, check when each is finished loading, img is loaded in the photosArray.forEach
        img.addEventListener('load', imageLoaded)

        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img)
        imageContainer.appendChild(item)
    });
}




// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()
        // console.log(photosArray);
    }catch(error){
        //Catch Error Here
    }
}



// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false //reset ready back to false, imagesLoaded !== totalImages
        page = Math.floor(Math.random() * 100) + 1 
        apiUrl = `https://picsum.photos/v2/list?page=${page}&limit=15`
        getPhotos() //run another fetch request
        console.log('load more')
    }
})




// On Load
getPhotos()