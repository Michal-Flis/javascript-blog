{
'use strict';


const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthors: Handlebars.compile(document.querySelector('#template-author-article').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optAuthorListSelector = '.list.authors';

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
    }
  /*[IN PROGRESS] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  
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

  const generateTitleLinks = function(customSelector = ''){

  
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    }
    

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('articles', articles);
    let html = '';

    for(let article of articles){
    
      const articleId = article.getAttribute('id');

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      

      html = html + linkHTML;
     
    }
    titleList.innerHTML = html;
  
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
    const tagsWrapper = article.querySelector(optArticleTagSelector);
 
      /* make html variable with empty string */
    let html = '';
      /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
  
      /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
        /* generate HTML of the link */
      //const linkHTMLtag = '<li><a href="#' + tag + '"><span>' + articleTagsArray + '</span></a></li>';
      const linkHTMLData = {tagId: tag, tagTitle: tag};
      const tagHTML = templates.tagLink(linkHTMLData);
        /* add generated code to html variable */
      html = html + tagHTML;
  /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
  /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      }else {
        allTags[tag]++;
  }
  
      /* END LOOP: for each tag */
  }
      /* insert HTML of all the links into the tags wrapper */
  tagsWrapper.innerHTML = html;
 
    /* END LOOP: for every article: */
  } 
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');
  //console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  
  const allTagsData = {tags: []};
  for (let tag of allTags){
    allTagsData.tags.push({
      tag: tags,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParms)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

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
  const tagLinks = document.querySelectorAll(a[href="' + href + '"]);
    /* START LOOP: for each active tag link */
  for(let tagLink of tagLinks){
      /* remove class active */
  tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
    /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksActive = document.querySelectorAll(href);
  
    /* START LOOP: for each found tag link */
  for(let tagLinkActive of tagLinksActive){
      /* add class active */
  tagLinkActive.classList.add('active');
    /* END LOOP: for each found tag link */
  }
    /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
  for(let link of links){
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', titleClickHandler);
    /* END LOOP: for each link */
  }
  }
  
  addClickListenersToTags();

  function generateAuthors() {
    const allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for(let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const author = article.getAttribute('data-author');

      const linkHTMLData = {authorId: author, author: author};
      const authorHTML = templates.tagLink(linkHTMLData);
      
      html = html + authorHTML;

      if(!allAuthors[authors]){
        allAuthors[authors] = 1;
      }else {
        allAuthors[authors]++;
        }
      authorWrapper.innerHTML = html;
    }
    const authorWrapper = document.querySelector(optAuthorListSelector);
    const allAuthorsData = {authors: []};
  for (let author of allauthors){
    allAuthorsDatas.tags.push({
      author: author,
      count: allAuthors[author],
    });
  }
  authorWrapper.innerHTML = templates.tagCloudLink(allAuthorsData);
  console.log(allAuthorsData);
  }
  generateAuthors();

function authorClickHandler(event){
event.preventDefault();
const clickedElement = this;
const authorhref = clickedElement.getAttribute('href');
const author = authorhref.replace('#author-','');
const authorLinks = document.querySelectorAll('a.active[data-author=""]');
for(let authorLink of authorLinks){
  authorLink.classList.remove('active');
}
const articleAuthorList = document.querySelectorAll('a[data-author="' + author + '"');
for(let articleAuthor of articleAuthorList){
  articleAuthor.classList.add('active');
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