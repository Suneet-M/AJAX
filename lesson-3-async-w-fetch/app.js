(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?query="${searchedForText}"`, {
            headers: {
                Authorization: 'Client-ID 265cbd43910e6142fdd0845465c9746e5d4295d3a0bed326edbca6585c3e06de'
            }
        }).then(response => response.json())
            .then(response => {
                let htmlContent;
                if (response && response.results && response.results[0]) {
                    const firstImage = response .results[0];
                    htmlContent = `<figure>
                        <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                        <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                        </figure>`;
                } else {
                    htmlContent = 'Sorry, no image found!';
                }
                responseContainer.innerHTML = htmlContent;
            })
            .catch(error => {
                throw Error(error);
            });
    });
})();
