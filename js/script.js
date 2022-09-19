/* eslint-disable indent */
{

  'use strict';

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('Argument "event" funkcji (in. handler) "titleClickHandler": ', event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active'); //jak nie ma spacji to spójnik

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector:', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log('Active article:', targetArticle);
  };

  // Te stałe były tutaj wcześniej i działały z funkcją generateTitleLinks...
  //const optArticleSelector = '.post'
    //optTitleSelector = '.post-title',
    //optTitleListSelector = '.titles',
    //optArticleTagsSelector = '.post-tags .list';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks() {

  // Natomiast te stałe przeniosłem z góry w to miejsce - wewnątrz funkcji.
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages() {
      titleList.innerHTML = '';
    }
    console.log('titleList: ', titleList);
    clearMessages();

    /* [DONE] find all the articles and save them to variable: articles */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      console.log('ArticleID: ', articleId);

      /* [DONE] find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('Article Title: ', articleTitle);

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('Link HTML: ', linkHTML);

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }
      console.log('Wyświetla zawartość zmiennej "html": ', html);

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('Co zawiera stała "links": ', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
}

  function generateTags(){

  // dlaczego muszę tutaj znowu ustalać te same stałe? Przecież wyżej zostały już podane (i też poza funkcją)...

  const optArticleSelector = '.post',
    optArticleTagsSelector = '.post-tags .list';

    /* [DONE] START LOOP: for every article: */

    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles) {

    console.log('Article: ', article, optArticleSelector);

      /* [DONE] find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('Tags Wrapper: ', tagsWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';

      /* [IN PROGRESS] get tags from data-tags attribute */

      const articleTags =

      /* split tags into array */

    /* START LOOP: for each tag */

      /* generate HTML of the link */

      /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
    }
  }

generateTags();
