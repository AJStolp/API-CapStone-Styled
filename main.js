'use strict';

let nationalUrl = 'https://developer.nps.gov/api/v1/campgrounds';
let apiKey = 'Sm8D9Px0mS0Caf9Cya2YNGsnTWAg6gexaEEKX6ab';
//Above is for national parks data
 
//YouTube
let googleApi = 'AIzaSyCAwHSlOJVcvcTe5CKnoa-G-1xKozrlbSQ';
let googleUrl = 'https://www.googleapis.com/youtube/v3/search';

//API Fetch for YouTube Data
function getYouTubeData(origins){
    const paramsGoogle = {
        key: googleApi,
        q: origins,
        part: 'snippet',
        maxResults: 15,
    }

    let queryStringGoogle = formatParams(paramsGoogle);
    let newGoogleUrl = googleUrl + '?' + queryStringGoogle;

    fetch   
        (newGoogleUrl)
            .then(response => response.json())
            .then(responseJsonGoogle => displayYouTubeData(responseJsonGoogle))
            .catch(error => {
                $('.displayError').append(`Sorry Something Happened Behind the Scenes - ${error.message}`)
            })
}

function displayYouTubeData(responseJsonGoogle){
    console.log(responseJsonGoogle);

    for(let i = 0; i < responseJsonGoogle.items.length; i++){
        let youTubeSearch = responseJsonGoogle.items[i].id.videoId;
        $('.displayYouTube').append(`
        <iframe class='videoFrame' src="https://www.youtube.com/embed/${youTubeSearch}"/>
        <p>${responseJsonGoogle.items[i].snippet.title}</p><hr>`)
    }
}

//This function formats the parameters for API call
function formatParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
}

//API Fetch for National Parks
function acquireDataNationalParksCG(campgroundLocation) {
    const paramsNational = {
        api_key: apiKey,
        stateCode: campgroundLocation,
    }

    let queryString = formatParams(paramsNational);
    let newNationalUrl = nationalUrl + '?' + queryString;
    console.log('working here');

    fetch 
        (newNationalUrl)
            .then(response => response.json())
            .then(responseJsonNational => displayNationalParksData(responseJsonNational))
            .catch(error => {
                $('.displayError').html(`Sorry, but there were some issues behind the scenes. Please wait and try again: ${error.message}`)
            })
}


function displayNationalParksData(responseJsonNational) {
    // console.log(responseJsonNational);
    for(let i = 0; i < responseJsonNational.data.length; i++) {
        $('.displayNational').append(`<h2>${responseJsonNational.data[i].name}</h2>
        <h4>${responseJsonNational.data[i].weatheroverview}</h4>
        <p>${responseJsonNational.data[i].directionsoverview}</p>
        <p>${responseJsonNational.data[i].description}</p>
        <p>${responseJsonNational.data[i].campsites.totalsites} - Total Campsites</p>
        <p>${responseJsonNational.data[i].amenities.toilets}</p>
        <p>${responseJsonNational.data[i].accessibility.wheelchairaccess}</p>
        <p>Cell Phone Reception - ${responseJsonNational.data[i].amenities.cellphonereception}</p>
        <p>${responseJsonNational.data[i].accessibility.firestovepolicy}</p>
        <p><a href="${responseJsonNational.data[i].regulationsurl}" target="_blank">Camping Regulations</a></p><hr>`)
    }
    let total = 0;
    let values = Object.values(responseJsonNational);
    for(let i = 0; i < responseJsonNational.length; i++ ){
        if(total === values[i]){
            $('.displayError').html('Sorry but either not parks exist or these State Abbreviations do not exist')
        }
    }
}

function submitForm() {
    $('#campground-button').on('click', function(e){
        e.preventDefault();
        let campgroundLocation = $('#submitNational').val();
        acquireDataNationalParksCG(campgroundLocation);
        $('.displayNational').empty();
        $('.displayError').empty();
    })
    $('#submitVideos').on('click', function(e){
        e.preventDefault();
        let origins = $('#youTube').val();
        getYouTubeData(origins);
        $('.displayYouTube').empty();
    })
}
$(submitForm);




//SCROLL TO TOP BUTTON
let mybutton = document.getElementById("myBtn");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}


function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
} 