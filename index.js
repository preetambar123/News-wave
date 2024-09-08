const API_KEY = "dedfc35b581e47f98cf747e1a4ef99bb";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').remove()
    }, 1000);
});

// window.addEventListener('click', () => {
//     const list = document.getElementsByClassName("nav-links")[0];
//     list.classList.remove(".dropdown-content");
//     list.classList.add("nav-links")
// })

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.log("Error found");
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (article.urlToImage==null) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt);
    const day=date.getDay();
    const month=date.getMonth();
    const year=date.getFullYear();

    newsSource.innerHTML = `${article.source.name} · ${day}-${month}-${year}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
const ul=document.querySelector('ul')
console.log(ul);
ul.querySelector('#sports').addEventListener('click',()=>{
    fetchNews('sports');
    const navItem = document.getElementById('sports');
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
})
ul.querySelector('#finance').addEventListener('click',()=>{
    fetchNews('finance');
    const navItem = document.getElementById('finance');
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
})
ul.querySelector('#politics').addEventListener('click',()=>{
    fetchNews('politics');
    const navItem = document.getElementById('politics');
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
})

ul.querySelector('#technology').addEventListener('click',()=>{
    fetchNews('technology');
    const navItem = document.getElementById('technology');
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
})

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

let icon=document.querySelector('.icon');
icon.addEventListener('click',()=>{
    document.body.classList.toggle("dark-theme")
    if( document.body.classList.contains("dark-theme")){
        icon.src="https://static.vecteezy.com/system/resources/thumbnails/004/639/658/small_2x/sun-icon-on-white-background-vector.jpg"
      
    }else{
        icon.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCZIpPgy0z7eBCzHWMFfIZDDfh9lde3GLh5Q&s"
    }
})

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click event from propagating to document
        navLinks.classList.toggle('show');
    });

    document.addEventListener('click', () => {
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    });

    navLinks.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click event from propagating to document
    });
});
