{
'use strict';


const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthors: Handlebars.compile(document.querySelector('#template-author-article').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
const titleClickHandler = function(event){
  event.preventDefault();
const clickedElement = this;
console.log('Link was clicked!');
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
    }
  /*[IN PROGRESS] add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('article.active');
  console.log(activeArticles);
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}
  

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = 'post-author',
    optTagsListSelector = '.tags.list';

  function generateTitleLinks(customSelector = ''){

  
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    function clearMessages(){
      document.getElementById('messages').innerHTML = '';
    }
    console.log(clearMessages);

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);
    let html = '';

    for(let article of articles){
    
      const articleId = article.getAttribute('id');

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      

      html = html + linkHTML;
      console.log(html);
    }
    titleList.innerHTML = html;
  }
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  
  
  generateTitleLinks();

  function calculateTagClass(count,params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return optCloudClassPrefix + classNumber;
  
  
  }

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
    /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
  for (let article of articles){

      /* find tags wrapper */
  const tagsWrapper = article.querySelector(optArticleTagsSelector);
  console.log(tagsWrapper);
      /* make html variable with empty string */
  let html = '';
      /* get tags from data-tags attribute */
  const articleTags = article.getAttribute('data-tags');
  console.log(articleTags);
      /* split tags into array */
  const articleTagsArray = articleTags.split(' ');
  
      /* START LOOP: for each tag */
  for(let tag of articleTagsArray){
        /* generate HTML of the link */
  const linkHTMLtag = '<li><a href="#' + tag + '"><span>' + articleTagsArray + '</span></a></li>';
        /* add generated code to html variable */
  html = html + linkHTMLtag
  /* [NEW] check if this link is NOT already in allTags */
  if(!allTags[tag]){
  /* [NEW] add generated code to allTags array */
    allTags[tag] = 1;
  }else {
    allTags[tag]++;
  }
  }
      /* END LOOP: for each tag */
  }
      /* insert HTML of all the links into the tags wrapper */
  tagsWrapper.innerHTML = html;
  console.log(html);
    /* END LOOP: for every article: */
  
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  //console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';
  for (let tag of allTags){
    allTagsHTML += tag + '(' +allTags[tag] +')';
  }
  tagList.innerHTML = allTagsHTML;
  }

 generateTags();


  function tagClickHandler(event){
    /* prevent default action for this event */
  event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
    /* find all tag links with class active */
  const activeTags = document.querySelectorAll(href);
    /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){
      /* remove class active */
  activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
    /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(href);
  console.log(tagLinks);
    /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks){
      /* add class active */
  tagLinks.classList.add('active');
    /* END LOOP: for each found tag link */
  }
    /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  tagClickHandler();
  
  function addClickListenersToTags(){
    /* find all links to tags */
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
  for(let lingTag of linkTags){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', titleClickHandler);
    /* END LOOP: for each link */
  }
  }
  
  addClickListenersToTags();

  function generateAuthors() {
    let allTags = {};
    const articles = document.querySelectorAll('article');
    const authorSideBarWrapper = document.querySelector(optAuthorsListSelector);
    for(let article of articles) {
      const articleAttributeBy = article.getAttribute('data-author');
      const articleAttribute = articleAttributeBy.replace('by', '');
      if(!allTags[articleAttribute]) {
        allTags[articleAttribute] = 1;
      }
      else {
        allTags[articleAttribute]++;
      }
      const linkHTML = {id: articleAttributeBy};
      const html = templates.articleAuthors(linkHTML);
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      authorWrapper.insertAdjacentHTML('beforeend',html);
    }
    for (let authorWrap in allTags) {
      const allTagsData = {tags: []};
      allTagsData.tags.push({
        tag: authorWrap,
        count: allTags[authorWrap],
      });
      authorSideBarWrapper.innerHTML += templates.authorCloudLink(allTagsData);
    }
  }
  generateAuthors();

function authorClickHandler(){
event.preventDefault();
const clickedElement = this;
const href = clickedElement.getAttribute('href');
const author = href.replace('#author-','');
const activeAuthors = document.querySelectorAll(href); 
for(let activeAuthor of activeAuthors){
  activeAuthor.classList.remove('active');
}
const authorLinks = document.querySelectorAll(href);
for(let authorLink of authorLinks){
  authorLink.classList.add('active');
}
generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
}