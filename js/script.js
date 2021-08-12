{
'use strict';


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
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks(){

  
    const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
    console.log(titleList);
    function clearMessages(){
      document.getElementById('messages').innerHTML = '';
    }
    console.log(clearMessages);

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles){
    
      const articleId = article.getAttribute('id');

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

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


  function generateTags(){
    /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
  for (let article of articles){

      /* find tags wrapper */
  const tagsWrapper = article.querySelector(optArticleTagsSelector).innerHTML = '';
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
  }
      /* END LOOP: for each tag */
  }
      /* insert HTML of all the links into the tags wrapper */
  tagsWrapper.innerHTML = html
    /* END LOOP: for every article: */
  }
  
  generateTags();
}