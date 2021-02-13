const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready = false
let imagesLoaded = 0
let totalImages = 0

// Unsplash API
let count = 5; //Increase Performance Time, fetch 5 images. 
const apiKey =  '4_5C-62Utc5h_Wxm6PWYCvvtULmeL2nhdTnXTz8b6d0';
// const apiKey = 'JHpsMZn8P6DwKybIINcnFzqM9r7m2j7aBvFoFiE2vbI'
// const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true //Loader only happens once, once inital load
        console.log('ready = ', ready)
        count = 30 //Now all following fetch will be 30 images, updating the count and apiUrl
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
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
        // item.setAttribute('href', photo.links.html)
        // item.setAttribute('target', '_blank')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        //Create <img> for photo
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img, {
            src:  photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
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
        getPhotos() //run another fetch request
        console.log('load more')
    }
})




// On Load
getPhotos()