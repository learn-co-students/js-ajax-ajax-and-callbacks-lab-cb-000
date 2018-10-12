
function renderSearchResults(data) {
  let src = document.getElementById('display-search-results').innerHTML;
  let template = Handlebars.compile(src);
  let results = template(data)
  document.getElementById('results').innerHTML = results;
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.getJSON(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(renderSearchResults(data.items))
  }).fail(error => {
    displayError(error);
  })
}

function showCommits(element) {
  const username = element.dataset.owner;
  const repo = element.dataset.repository;
  $.getJSON(`https://api.github.com/repos/${username}/${repo}/commits`, data => {
    $('#details').html(renderDetails(data))
  }).fail(error =>{
    displayError(error);
  })
}


function renderDetails(data){
  console.log(data)
  let src = document.getElementById('display-details').innerHTML;
  let template = Handlebars.compile(src);
  let details = template(data);
  document.getElementById('details').innerHTML = details;
}

function displayError(error ) {
  const genericMessage = "I'm sorry, there's been an error. Please try again.";
  const errorDetail = error;
  let src = document.getElementById('error-template').innerHTML;
  let template = Handlebars.compile(src);
  let message = template({genericMessage, errorDetail});
  document.getElementById('errors').innerHTML = message;
}


$(document).ready(function (){
});
