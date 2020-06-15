// HTMLize individual result from received data
// this one function is how the solution formatted all functions, as variables. Kind of curious why.
const renderSearchResult = (result) => {
  return `
  <div>
  <h3><a href="${result.html_url}">${result.name}</a></h3>
  <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
  <p><a href="${result.owner.url}">${result.owner.login}</a></p>
  <p><img src="${result.owner.avatar_url}" width="25px"></p>
  </div>
  <hr>
  `
};

// collect individual HTMLized results
function renderSearchResults(data) {
  return data.items.map( result => renderSearchResult(result))
};

// grab search string from field
// send request for data
// pass received data into renderSearchResults
// provide data retreival failure action
function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, data => {
    $('#results').html(renderSearchResults(data))
  }).fail(error => {
    displayError()
  })
};



function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.");
  // document.getElementById("errors").innerHTML = "I'm sorry, there's been an error. Please try again.";
};

// HTMLize individual commit result from data received
function renderCommit(commit) {
  return `<li><h4>${commit.sha}</h4>
  <p>${commit.commit.author.name}</p>
  <p>${commit.author.login}</p>
  <p><img src="${commit.author.avatar_url}" width="25px"></p>
  </li>`
};
// collect individual HTMLized commits
function renderCommits(data) {
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
};

// use data from link to request data, pass data into renderCommits, provide fail action
function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
};

$(document).ready(function (){
  
  // so, why is this even here? 
  
});

/* function searchRepositories() {
  // const searchString = document.getElementById("searchTerms").value;
  const searchString = $("#searchTerms").val();
  const searchRepoAPI = `https://api.github.com/search/repositories?q=${searchString}`;
  
  $.get(searchRepoAPI, function(data) {
    $('#results').html(renderSearchResults(data))
  }).fail(function(error) {
    displayError();
  });
  
} */

/* function renderSearchResults(data) {
  data.items.map(function (result) {
    renderSearchResult(result);
  });
}; */

/* function renderSearchResult(result) {
  return `
  <div>
  <h2><a href="${result.html_url}">${result.name}</a></h2>
  <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
  <p>${result.description}</p>
  </div>
  <hr>
  `
}; */