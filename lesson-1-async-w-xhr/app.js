(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    function addImage() {}

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 265cbd43910e6142fdd0845465c9746e5d4295d3a0bed326edbca6585c3e06de');
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = imageError;
        function imageError() {
            console.log('Search request error. Check network connection.');
        }
        unsplashRequest.send();
    });
})();
