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

    function imageError() {
        console.log('Image request error. Check network connection.');
    }


    function addArticles() {
        const data = JSON.parse(this.responseText);
        let htmlContent;
        if (data.response && data.response.docs && data.response.docs[0]) {
            htmlContent = document.createElement('ul');
            for (const d of data.response.docs) {
                const article = document.createElement('li');
                article.innerHTML = `<li class ="article">
                <h2><a href="${d.web_url}">${d.headline.main}</a></h2>
                <p>${d.snippet}</p>
                </li>`;
                htmlContent.appendChild(article);
            }
        } else {
            htmlContent = document.createElement('p');
            htmlContent.innerText = '<div classs="error-no-article">Sorry, no articles found!</div>';
        }
        responseContainer.appendChild(htmlContent);
    }

    function articleError() {
        console.log('Article search error');
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
        unsplashRequest.send();

        const articleRequest = new XMLHttpRequest();
        articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=9448b976337b4022b9d1a0ac2ec11bbb`);
        articleRequest.onload = addArticles;
        articleRequest.onerror = articleError;
        articleRequest.send();
    });
})();
