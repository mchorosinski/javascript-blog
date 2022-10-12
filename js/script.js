{

  'use strict';

  /**
   *  ! OPTIONS, SELECTORS & TEMPLATES:
   */

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  };

  const opts = {
    tagSizes: {
      count: '5',
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      article: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      authors: '.post-author',
      titles: '.post-title',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };

  /**
   *  ! START: TITLE CLICK HANDLER FUNCTION !
   */

  const titleClickHandler = function (event) {

    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
    //console.log('Argument "event" funkcji (in. handler) "titleClickHandler": ', event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    //console.log('clickedElement:', clickedElement);
    //console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */

    //! Gdy w zapisie argumentu nie ma spacji (a występuje np. kropka), wtedy jest to spójnik.
    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('Article Selector:', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(select.all.article);
    //console.log('targetArticle:', targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
    //console.log('Active article:', targetArticle);
  };

  /**
   *  ! END: TITLE CLICK HANDLER FUNCTION !
   */

  /**
   *  ! START: GENERATE TITLE LINKS FUNCTION !
   */

  const generateTitleLinks = function (customSelector = '') {

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(select.listOf.titles);

    function clearMessages () {
      titleList.innerHTML = '';
    }
    //console.log('titleList: ', titleList);
    clearMessages();

    /* [DONE] find all the articles and save them to variable: articles */

    const articles = document.querySelectorAll(select.all.article + customSelector);
    //console.log('Artykuły z "generateTitleLinks": ', articles);

    let html = '';

    for (let article of articles) {

      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');
      //console.log('ArticleID: ', articleId);

      /* [DONE] find the title element */

      const articleTitle = article.querySelector(select.article.titles).innerHTML;
      //console.log('Article Title: ', articleTitle);

      /* [DONE] create HTML of the link */

      //! Wykorzystanie szablonu:
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log('Link HTML: ', linkHTML);

      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }
    //console.log('Wyświetla zawartość zmiennej "html": ', html);

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    //console.log('Co zawiera stała "links": ', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  /**
   * ! END: GENERATE TITLE LINKS FUNCTION !
   */

  /**
   *  ! START:  CALCULATE TAGS PARAMS FUNCTION !
   */

  // Celem tej funkcji jest znalezienie skrajnych liczb (wystąpień tagów).
  // - by następnie stworzyć chmurę tagów.
  const calculateTagsParams = function (tags) {

    const params = {
      max: 0,
      min: 999999
    };
    //console.log('Największa i najmnniejsza liczba wystąpień tagów:', params);

    // Pętla będzie iterować przez cały obiekt, przekazany do funkcji jako argument "tags".
    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');

      // Wewnątrz tej pętli ustawiono wartości dla params.max – będzie to tags[tag],
      // ale tylko jeśli ta liczba jest większa niż dotychczasowa wartość params.max, czyli 0.
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      // Wewnątrz tej pętli ustawiono wartości dla params.min – będzie to tags[tag],
      // ale tylko jeśli ta liczba jest mniejsza niż dotychczasowa wartość params.min, czyli 999999.
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }

    return params;
  };

  /**
   *  ! END: CALCULATE TAGS PARAMS FUNCTION !
   */

  /**
   *  ! START: CALCULATE TAG CLASS FUNCTION !
   * @param {*} count
   * @param {*} params
   */

  const calculateTagClass = function (count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );

    //! Inny sposób (z przykładowymi wartościami) na powyższe obliczenie:

    /*
    classNumber = Math.floor( 0.5 * 5 + 1 );

    classNumber = Math.floor( 0.5 * opts.tagSizes.count + 1 );

    classNumber = Math.floor( ( 4 / 8 ) * opts.tagSizes.count + 1 );

    classNumber = Math.floor( ( (6 - 2) / (10 - 2) ) * opts.tagSizes.count + 1 );

    classNumber = Math.floor( ( (count - 2) / (10 - 2) ) * opts.tagSizes.count + 1 );

    classNumber = Math.floor( ( (count - 2) / (params.max - 2) ) * opts.tagSizes.count + 1 );

    classNumber = Math.floor( ( (count - params.min) / (params.max - 2) ) * opts.tagSizes.count + 1 );

    classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opts.tagSizes.count + 1 );
    */

    return opts.tagSizes.classPrefix + classNumber;

  };

  /**
   *  ! END: CALCULATE TAG CLASS FUNCTION !
   */

  /**
   *  ! START: GENERATE TAGS FUNCTION !
   */

  const generateTags = function () {

    /* [DONE] create a new variable allTags with an empty object */

    //! Nawiasy "{}" oznaczają obiekt, zaś "[]" tablicę.
    let allTags = {};
    //console.log('Empty table created');

    /* [DONE] START LOOP: for every article: */

    const articles = document.querySelectorAll(select.all.article);

    for (let article of articles) {

      //console.log('Article: ', article, select.all.article);

      /* [DONE] find tags wrapper */

      const tagsWrapper = article.querySelector(select.article.tags);
      //console.log('Tags Wrapper: ', tagsWrapper);

      /* [DONE] make html variable with empty string */

      let html = '';
      //console.log('Clean HTML done', html);

      /* [DONE] get tags from 'data-tags' attribute */

      const articleTags = article.getAttribute('data-tags');
      //console.log('Taken tags from the article: ', articleTags);

      /* [DONE] split tags into array */

      const articleTagsArray = articleTags.split(' ');
      //console.log('Tags spiltted but in an array: ', articleTagsArray);

      /* [DONE] START LOOP: for each tag */

      for (let tag of articleTagsArray) {
        //console.log('Tag separately: ', tag);

        /* [DONE] generate HTML of the link */

        //! Wykorzystanie szablonu:
        const linkHTMLData = {id: tag, tag: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        //! Generowane linki powinny mieć analaogiczną strukturę, tzn. wymagane w tym przypadku prefiksy np. "#tag-" i "#author-", a nie sam hash...
        //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        //console.log('Link HTML: ', linkHTML);

        /* [DONE] add generated code to html variable */

        html = html + linkHTML;
        //console.log('Wyświetla wygenerowany kod HTML', html);

        /* [DONE] check if this link is NOT already in allTags */

        //! Warunek (!) czytamy jako "jeśli allTags NIE MA klucza tag".
        if (!allTags[tag]) {

          /* [DONE] add generated code to allTags object */

          //! W obiekcie allTags nie mamy jeszcze danego tagu. Wtedy licznik wystąpień tego tagu ustawiamy na 1.
          allTags[tag] = 1;
        } else {
          //! Operator inkrementacji – znaki ++ zwiększają liczbę o 1.
          allTags[tag]++;
        }

        /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */

      tagsWrapper.innerHTML = html;
      //console.log('Insert html code into tagsWrapper: ', html);

      /* [DONE] END LOOP: for every article: */
    }

    /* [DONE] find list of tags in right column */

    // Gdy w HTML występuje zapis "list tags" w jednej linii -> const: .tags.list <- no space
    //! Bład 'Uncaught TypeError: Cannot set properties of null (setting 'innerHTML') może świadczyć o wybraniu złego selektora w kodzie HTML - tagList przyjmuje wartość NULL.
    const tagList = document.querySelector(select.listOf.tags);
    //console.table('Wyświetla zawartość tagList: ', tagList);

    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams:', tagsParams);

    /* [DONE] create variable for all links HTML code */

    let allTagsHTML = '';

    /* [DONE] START LOOP: for each tag in allTags: */

    for (let tag in allTags) {

      /* [DONE] generate code of a link and add it to allTagsHTML */

      //! Używamy tutaj operatora += do doklejania kolejnego linka do zmiennej allTagsHTML.
      //! W linku powinna znajdować się też liczba (w nawiasie) wystąpień danego tagu, czyli: allTags[tag]
      //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li> ';
      //console.table('All TAGS HTML: ', allTagsHTML);

      //! Kod HTML z policzoną wartością występowania tagów.
      //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-'+ tag +'">' + tag + ' (' + allTags[tag] + ')</a></li>';

      //! Kod HTML bez policzonej wartości występowania tagów.
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-'+ tag +'">' + tag + '</a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsHTML += tagLinkHTML;

      /* [DONE] END LOOP: for each tag in allTags: */

    }

    /*[DONE] add HTML from allTagsHTML to tagList */

    tagList.innerHTML = allTagsHTML;

  };

  generateTags();

  /**
   *  ! END: GENERATE TAGS FUNCTION !
   */

  /**
   *  ! START: TAG CLICK HANDLER FUNCTION !
   */

  const tagClickHandler = function (event) {

    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make a new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;
    //console.log('Link was clicked!');
    //console.log('Argument funkcji "tagClickHandler": done');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    //console.log({href});

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

    //! Powinien występować "replace" z unikalnym argumentem (np. #tag-), a nie sam hash.
    const tag = href.replace('#tag-', '');
    //console.log({tag});

    /* [DONE] find all tag links with class active */

    //! Metoda wyszukiwania aktywnych tagów powinna być analogiczna do tej przy autorach, tj. wcześniej wygenrować linki z prefiksem np. "#author-" czy "#tag-", a nie sam hash...
    const activeTag = document.querySelectorAll('a.active[href^="#tag-"]'); //! Łącznik ^= oznacza: "atrybut href zaczynający się od "#tag-"
    //console.log({activeTag});

    /* [DONE] START LOOP: for each active tag link */

    for (let tag of activeTag) {
      console.log('"Active tag" loop activated');

      /* [DONE] remove class active */

      tag.classList.remove('active');
      //console.log('Removed an active class from tag', tag);

      /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    //console.log({tagLinks});

    /* [DONE] START LOOP: for each found tag link */

    for (let tagLink of tagLinks) {
      console.log('"Tag link" loop activated');

      /* [DONE] add class active */

      tagLink.classList.add('active');
      //console.log('Added an active class to tagLink', tagLink);

      /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]'); //! Łącznik ~= oznacza: "znajdź elementy, które mają atrybut data-tags, który ma w sobie słowo 'tag' ".
  };

  /**
   *  ! END: TAG CLICK HANDLER FUNCTION !
   */

  /**
   *  ! START: ADD CLICK LISTENERS TO TAGS FUNCTION !
   */

  const addClickListenersToTags = function () {

    /* [DONE] find all links to tags */

    //! Metoda wyszukiwania linków powinna być analogiczna do tej przy autorach, tj. wcześniej wygenrować linki z prefiksem np. "#author-" czy "#tag-", a nie sam hash...
    const links = document.querySelectorAll(select.all.linksTo.tags); //! link (a), <selektor>[atrybut (href) "(^=) zaczynający się od" "#tag-"]</selektor>.

    /* [DONE] START LOOP: for each link */

    for (let link of links) {
      //console.log('Aktywny link dla konkretnych tagów', link);

      /* [DONE] add tagClickHandler as event listener for that link */

      link.addEventListener('click', tagClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  /**
   *  ! END: ADD CLICK LISTENERS TO FUNCTION !
   */

  /**
   *  ! START: CALCULATE AUTHORS PARAMS FUNCTION !
   */

  // Celem tej funkcji jest znalezienie skrajnych liczb (wystąpień autorów).

  const calculateAuthorsParams = function (authors) {

    const params = {
      max: 0,
      min: 999999
    };
    console.log('Największa i najmnniejsza liczba wystąpień autorów:', params);

    // Pętla będzie iterować przez cały obiekt, przekazany do funkcji jako argument "authors".
    for (let author in authors) {
      console.log(author + ' is used ' + authors[author] + ' times');

      // Wewnątrz tej pętli ustawiono wartości dla params.max – będzie to authors[author],
      // ale tylko jeśli ta liczba jest większa niż dotychczasowa wartość params.max, czyli 0.
      if(authors[author] > params.max){
        params.max = authors[author];
      }
      // Wewnątrz tej pętli ustawiono wartości dla params.min – będzie to authors[author],
      // ale tylko jeśli ta liczba jest mniejsza niż dotychczasowa wartość params.min, czyli 999999.
      if(authors[author] < params.min){
        params.min = authors[author];
      }
    }

    return params;
  };

  /**
   *  ! END: CALCULATE AUTHORS PARAMS FUNCTION !
   */

  /**
   *  ! START: GENERATE AUTHORS FUNCTION !
   */

  const generateAuthors = function () {

    /* [DONE] create a new variable allTags with an empty object */

    let allAuthors = {};
    //console.log('Empty table created');

    /* [DONE] START LOOP: for every article */

    const articles = document.querySelectorAll(select.all.article);

    for (let article of articles) {

      /* [DONE] find author's wrapper */

      const authorsWrapper = article.querySelector(select.article.authors);
      //console.log('Authors Wrapper: ', authorsWrapper);

      /* [DONE] make html variable with an empty string */

      //! Przyimek "by" -> przykładowy podpis pod tytułem artykułu: "by Kitty Toebean".
      let html = 'xyz ';
      //console.log('almost Clean HTML: done');

      /* [DONE] get authors' names from 'data-author' attribute */

      const authorName = article.getAttribute('data-author');
      //console.log('Pobrano imię i nazwisko autora: ', authorName);

      /* [DONE] generate HTML of the link */

      //! Wykorzystanie szablonu:
      const linkHTMLData = {id: authorName, author: authorName};
      const linkHTML = templates.authorLink(linkHTMLData);

      //! Generowane linki powinny mieć analaogiczną strukturę, tzn. wymagane w tym przypadku prefiksy np. "#author-" i "#tag-", a nie sam hash...
      //const linkHTML = '<a href="#author-' + authorName + '">' + authorName + '</a>';
      //console.log('Wygenerowano link HTML z imieniem i nazwiskiem autora', linkHTML);

      /* [DONE] add genrated code to html variable */

      html = html + linkHTML;
      //console.log('Wyświetla wygenerowany kod HTML', html);

      /* [DONE] check if this link is NOT already in allAuthors */

      //! Pojedyncze imię i nazwisko autora znajduje się w atrybucie 'data-author' (const authorName).
      //! Warunek (!) czytamy jako "jeśli allAuthors NIE MA klucza authorName".
      if (!allAuthors[authorName]) {

        /* [DONE] add generated code to allAuthors object */

        //! W obiekcie allAuthors nie mamy jeszcze danego autora. Wtedy licznik wystąpień tego autora ustawiamy na 1.
        allAuthors[authorName] = 1;
      } else {
        //! Operator inkrementacji – znaki ++ zwiększają liczbę o 1.
        allAuthors[authorName]++;
      }

      /* [DONE] insert HTML of all the links into the authors' wrapper */

      authorsWrapper.innerHTML = html;
      //console.log('Dodano kod html z linkiem ', html);

      /* END LOOP: for every article */
    }

    /* [DONE] find list of authors in right column */

    // Gdy w HTML występuje zapis "list authors" w linii -> const: .authors.list <- no space
    //! Bład 'Uncaught TypeError: Cannot set properties of null (setting 'innerHTML') może świadczyć o wybraniu złego selektora w kodzie HTML - AuthorsList przyjmuje wartość NULL.
    const authorsList = document.querySelector(select.listOf.authors);
    //console.table('Wyświetla zawartość authorsList: ', authorsList);

    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('tagsParams:', authorsParams);

    /* [DONE] create variable for all links HTML code */

    let allAuthorsHTML = '';

    /* [DONE] START LOOP: for each author in allAuthors: */

    for (let author in allAuthors) {

      /* [DONE] generate code of a link and add it to allAuthorsHTML */

      //! Używamy tutaj operatora += do doklejania kolejnego linka do zmiennej allAuthorsHTML.
      //! W linku powinna znajdować się też liczba (w nawiasie) wystąpień danego autora, czyli: allAuthors[author]

      //allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li> ';
      //console.table('All AUTHORS HTML: ', allAuthorsHTML);

      //! Kod HTML z policzoną wartością występowania autorów.
      const authorLinkHTML = '<li><a href="#author-'+ author +'">' + author + '</a> (' + allAuthors[author] + ')</li>';

      //! Kod HTML bez policzonej wartości występowania autorów oraz miejscem na klasę.
      //const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '" href="#authors-'+ author +'">' + author + '</a></li>';
      console.log('authorLinkHTML:', authorLinkHTML);

      allAuthorsHTML += authorLinkHTML;

      /* [DONE] END LOOP: for each author in allAuthors: */

    }

    authorsList.innerHTML = allAuthorsHTML;

  };

  generateAuthors();

  /**
   *  ! END: GENERATE AUTHORS FUNCTION !
   */

  /**
   *  ! START: AUTHOR CLICK HANDLER FUNCTION !
   */

  const authorClickHandler = function (event) {

    /* [DONE] prevent default action for this event */

    event.preventDefault();

    /* [DONE] make a new constant named "clickedElement and give it the value of "this" */

    const clickedElement = this;
    //console.log('Link was clicked!');

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    //console.log('Odczytano atrybut "href" klikniętego elementu: ', href);

    /* [DONE] make a new constant "author" and extract author's name from "href" constant */

    //! Powinien występować "replace" z unikalnym argumentem (np. #author-), a nie sam hash.
    const author = href.replace('#author-', '');
    //console.log('Odczytano imię i nazwisko autora ze stałej href i elementu "href" ', author);

    /* [DONE] find all authors' links with class active */

    //! Metoda wyszukiwania aktywnych autorów powinna być analogiczna do tej przy tagach, tj. wcześniej wygenrować linki z prefiksem np. "#tag-" czy "#author-", a nie sam hash...
    const activeAuthor = document.querySelectorAll('a.active[href^="#author-"]'); //! Łącznik ^= oznacza: "atrybut href zaczynający się od "#author-"
    console.log('Aktywny link z autorem zaczynający się od "#author-": ', activeAuthor);

    /**
     * NOT iN USE:
     *
     * //[DONE] START LOOP: for each active author's link (to remove class active)
     *
     * //for (let author of activeAuthor) {
     *  //console.log('"Active Link" loop activated - do usunięcia klasy "active"');
     *
     *  //[DONE] remove class active
     *
     *  //author.classList.remove('active');
     *  //console.log('Usunięto klasę "active" w linku z autorem ', author );
     *
     *  //[DONE] END LOOP: for each active author's link (to remove class active)
     * //}
     */

    /* [DONE] find all authors' links with "href" attribute equal to the "href" constant */

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('Wszystkie linki z atrybutem "href", który jest równy stałej "href" ', authorLinks);

    /**
     * NOT iN USE:
     *
     * //[DONE] START LOOP: for each found author's link (to add class active)
     *
     * //for (let authorLink of authorLinks) {
     *  //console.log('"Author Link" loop activated - do aktywowania klasy "active"');
     *
     *  //[DONE] add class active
     *
     *  //authorLink.classList.add('active');
     *  //console.log('Dodano klasę "active" do linka z autorem ', authorLink);
     *
     *  //[DONE] END LOOP: for each found author's link (to add class active)
     * //}
     */

    /* [DONE] execute function "generateTitleLinks" with article selector */

    generateTitleLinks('[data-author="' + author + '"]');
  };

  /**
   *  ! END: AUTHOR CLICK HANDLER FUNCTION !
   */

  /**
   *  ! START: ADD CLICK LISTENERS TO AUTHORS FUNCTION !
   */

  const addClickListenerstoAuthors = function () {

    /* [DONE] find all the links to authors */

    //! Metoda wyszukiwania linków powinna być analogiczna do tej przy tagach, tj. wcześniej wygenrować linki z prefiksem np. "#tag-" czy "#author-", a nie sam hash...
    const links = document.querySelectorAll(select.all.linksTo.authors); //! Łącznik ^= oznacza: "znajdź elementy, które mają atrybut "href", który z kolei rozpoczyna się od '#author-' ".
    //console.log('Znalezione linki z autorami zawierające "#author-": ', links);

    /* [DONE] START LOOP: for each link */

    for (let link of links) {
      //console.log('Aktywowano pętlę dla każdego linka');

      /* [DONE] add authorClickHandler as even listener for that link */

      link.addEventListener('click', authorClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  };

  addClickListenerstoAuthors();

  /**
   *  ! END: ADD CLICK LISTENERS TO AUTHORS FUNCTION !
   */

}
