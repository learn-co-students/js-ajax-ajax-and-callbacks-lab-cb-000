$(document).ready(function (){
});

function displayError() {
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').val();
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    let src = document.getElementById('repository-template').innerHTML;
    const template = Handlebars.compile(src);
    const repoList = template(data.items);
    console.log(data)
    $("#results").html(repoList)
  }).fail(error => displayError());
}

function showCommits(el) {
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, function(data) {
    let src = document.getElementById('commits-template').innerHTML;
    const template = Handlebars.compile(src);
    const commitsList = template(data);
    $("#details").html(commitsList)
  }).fail(error => displayError());
}
