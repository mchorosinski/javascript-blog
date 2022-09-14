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

    // eslint-disable-next-line semi
  }
  /* Stąd */


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks() {


    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages(){
      titleList.innerHTML = '';
    }
    console.log('titleList: ', titleList);
    clearMessages();

    /* find all the articles and save them to variable: articles */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles){

    /* [DONE] for each article

    const articles = document.querySelectorAll(optArticleSelector);

      for (const article of articles) {
      console.log('Article: ', article);

    */ // powyższy fragment trzeba było jednak usunąć?!

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      console.log('ArticleID: ', articleId);

      /* [DONE] find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('Article Title: ', articleTitle);

      /* [IN PROGRESS] get the title from the title element

      // ?? nie wiem o co tu chodzi... Wydaje się, że i tak działa ;/

      const titleElement = article.getAttribute(optTitleSelector);
      console.log('Title from Element: ', titleElement);

      */

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
