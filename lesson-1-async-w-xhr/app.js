(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    function addImage() {
        const data = JSON.parse(this.responseText);
        let htmlContent;
        if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
        } else {
            htmlContent = `<div class="error-no-image">Sorry, no images found</div>`;
        }

        responseContainer.innerHTML = htmlContent;
    }

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
