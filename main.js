'use strict';

let nationalUrl = 'https://developer.nps.gov/api/v1/campgrounds';
let nationalEvents = 'https://developer.nps.gov/api/v1/events'
let apiKey = '9QyndIrmU1OY2fFCidHVeWDuZDfSMZ9Ac6VZ8ei7';
//Above is for national parks data
 
//YouTube
let googleApi = 'AIzaSyA-NIJU320_1cpKM6em5K1nfFhQjMN8GOU';
let googleUrl = 'https://www.googleapis.com/youtube/v3/search';

function getYouTubeData(origins){
    const paramsGoogle = {
        key: googleApi,
        q: origins,
        part: 'snippet',
        maxResults: 25,
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
        <iframe src="https://www.youtube.com/embed/${youTubeSearch}"/>
        <p>${responseJsonGoogle.items[i].snippet.title}</p><hr>`)
    }
}

function formatParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        return queryItems.join('&');
}


function acquireDataNationalParksCG(campgroundLocation) {
    const paramsNational = {
        api_key: apiKey,
        stateCode: campgroundLocation,
    }

    let queryString = formatParams(paramsNational);
    let newNationalUrl = nationalUrl + '?' + queryString;


    fetch 
        (newNationalUrl)
            .then(response => response.json())
            .then(responseJsonNational => displayNationalParksData(responseJsonNational))
            .catch(error => {
                $('.displayError').html(`Sorry, but there were some issues behind the scenes. Please wait and try again: ${error.message}`)
            })
}

// function acquireEventsData(campgroundLocation){
//     const paramEvents = {
//         api_key: apiKey,
//         stateCode: campgroundLocation
//     }

//     let queryStringEvents = formatParams(paramEvents);
//     let newNationalEventsUrl = nationalEvents + '?' + queryStringEvents;


//     fetch 
//         (newNationalEventsUrl)
//             .then(response => response.json())
//             .then(responseJsonEvents => displayNationalEventsData(responseJsonEvents))
//             .catch(error => {
//                 $('.displayError').html(`Sorry, but there were some issues behind the scenes. Please wait and try again:::: ${error.message}`)
//             })
// }

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
}


function submitForm() {
    $('#submitzWeather').on('click', function(e){
        e.preventDefault();
        let location = $('#location').val();
        acquireDataWeather(location);
        $('.clear').empty();
    })
    $('#campground-button').on('click', function(e){
        let campgroundLocation = $('#submitNational').val();
        acquireDataNationalParksCG(campgroundLocation);
        $('.displayNational').empty()
        
    })
    $('#submitVideos').on('click', function(e){
        e.preventDefault();
        let origins = $('#youTube').val();
        getYouTubeData(origins);
        $('.displayYouTube').empty();
    })
}
submitForm();



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

//POSSIBLE FEATURES TO BE ADDED LATER

// function displayNationalEventsData(responseJsonEvents){
//     console.log(responseJsonEvents);
//     for(let i = 0; i < responseJsonEvents.data.length; i++) {
//         $('.displayParkEvents').append(`
//         <h4>${responseJsonEvents.data[i].location}</h4>
//         <p>${responseJsonEvents.data[i].description}</p>`)
//     }
// }
// function addBackground(){
//     $(window).on('scroll', function(){
//         $('.gridInput').addClass('gridInputs');
//     })
// }
//  addBackground();
// function scrollFade() {
//     $(document).on('scroll', function(){
//         let pageTop = $(document).scrollTop();
//         let pageBottom = $(window).height();
        
//         let tags = $('.mainSect')

//         for(let i = 0; i < tags.length; i++) {
//             let tag = tags[i]
            
//             if($(tag).position().top < pageBottom){
//                 $(tag).addClass('visible')
//             } else {
//                 $(tag).removeClass('visible')
//             }
//         }
//     })
// }



// scrollFade();