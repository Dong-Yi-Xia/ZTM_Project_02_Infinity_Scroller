const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 3;
// const apiKey =  '4_5C-62Utc5h_Wxm6PWYCvvtULmeL2nhdTnXTz8b6d0';
const apiKey = 'JHpsMZn8P6DwKybIINcnFzqM9r7m2j7aBvFoFiE2vbI'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Helper Fucntion to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}



//Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
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

// On Load
getPhotos()