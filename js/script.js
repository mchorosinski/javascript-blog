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

    const activeArticles = document.querySelectorAll('.post.active'); //! Gdy w zapisie argumentu nie ma spacji (a występuje np. kropka), wtedy jest to spójnik.

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

  const generateTitleLinks = function (customSelector = '') {

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

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('Artykuły z "generateTitleLinks": ', articles);

    let html = '';

    for (let article of articles) {

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
  };

  generateTitleLinks();

  const generateTags = function () {

    const optArticleSelector = '.post',
      optArticleTagsSelector = '.post-tags .list';

    /* [DONE] START LOOP: for every article: */

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      console.log('Article: ', article, optArticleSelector);

      /* [DONE] find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('Tags Wrapper: ', tagsWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';
      console.log('Clean HTML', html);

      /* [DONE] get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log('Taken tags from the article: ', articleTags);

      /* [DONE] split tags into array */

      const articleTagsArray = articleTags.split(' ');
      console.log('Tags spiltted but in an array: ', articleTagsArray);

      /* [DONE] START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        console.log('Tag separately: ', tag);

        /* [DONE] generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        console.log('Link HTML: ', linkHTML);

        /* [DONE] add generated code to html variable */

        html = html + linkHTML;
        console.log('Wyświetla zawartość zmiennej "html": ', html);

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;
      console.log('Insert html code into tagsWrapper: ', html);

      /* END LOOP: for every article: */
    }
  };

  generateTags();

  const tagClickHandler = function (event) {

    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('Argument funkcji "tagClickHandler": done');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log({href});

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
    console.log({tag});

    /* [DONE] find all tag links with class active */

    const activeTag = document.querySelectorAll('a.active[href^="#tag-"]'); //! Łącznik ^= oznacza: "atrybut href zaczynający się od "#tag-".
    console.log({activeTag});

    /* [DONE] START LOOP: for each active tag link */

    for (let tag of activeTag) {
      console.log('"Active tag" loop activated');

      /* remove class active */

      tag.classList.remove('active');
      console.log('Removed an active class from tag', tag);

      /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log({tagLinks});

    /* [DONE] START LOOP: for each found tag link */

    for (let tagLink of tagLinks) {
      console.log('"Tag link" loop activated');

      /* [DONE] add class active */

      tagLink.classList.add('active');
      console.log('Added an active class to tagLink', tagLink);

      /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]'); //! Łącznik ~= oznacza: "znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo 'tag'".
  };

  const addClickListenersToTags = function () {

    /* [DONE] find all links to tags */

    const links = document.querySelectorAll('a[href^="#tag-"]'); //! link (a), <selektor>[atrybut (href) "(^=) zaczynający się od" "#tag-"]</selektor>.

    /* [DONE] START LOOP: for each link */

    for(let link of links) {
      console.log('Aktywny link dla konkretnych tagów', link);

      /* [DONE] add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };
  addClickListenersToTags();
}
