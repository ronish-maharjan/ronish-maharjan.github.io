const searchInput = document.querySelector("#search");
const articles = document.querySelectorAll(".article-item");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const query = searchInput.value
            .trim()
            .toLowerCase();

        articles.forEach(article => {

            const title = article.dataset.title;

            if (!query || title.includes(query)) {
                article.style.display = "";
            } else {
                article.style.display = "none";
            }

        });

    });

}
