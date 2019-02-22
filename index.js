function searchRepositories() {
  const searchTerm = $('#searchTerms').val();
  const searchURL = `https://api.github.com/search/repositories?q=${searchTerm}`;

  $.get(searchURL, function (response) {
    const resultsHTML = displayRepositories(response);
    $('#results').html(resultsHTML);
  }).fail(function (error) {
    displayError();
  })
}

function displayError(){
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function displayRepositories(response) {
  var repos = response.items;
  const repoList = `${repos.map(
    repo =>
      'Repo Name: ' + repo.name + '</br>' +
      'Description: ' + repo.description + '</br>' +
      '<a href="' + repo.html_url + '">' + repo.html_url +'</a></br>' +
      'Owner Login: ' + repo.owner.login + '</br>' +
      'Owner Profile Page: <a href="' + repo.owner.html_url + '">' + repo.owner.html_url + '</a></br>' +
      '<a href="#" data-repository="' + repo.name + '" data-owner="' + repo.owner.login + '" onclick="showCommits(this)">Show Commits</a></br>' +
      '---------------------------------------<br>'
  ).join('')}`;
  return repoList;
}

function showCommits(repo) {
  const repository = repo.dataset.repository;
  const username = repo.dataset.owner;
  const searchCommitURL = 'https://api.github.com/repos/' + username +'/' + repository + '/commits'

  $.get(searchCommitURL, function (response) {
    const resultsCommitsHTML = displayCommits(response);
    $('#details').html(resultsCommitsHTML);
  }).fail(function (error) {
    displayError();
  })
}

function displayCommits(response){
  var commits = response;
  const commitsList = `${commits.map(
    commit =>
    'Author: ' + commit.commit.author['name'] + '/<br>' +
    'Login: ' + commit.author.login + '/<br>' +
    'SHA: ' + commit.sha + '/<br>' +
    '---------------------------------------<br>'
  ).join('')}`;
  return commitsList;
}

//list the SHA, the author, the author's login, and the author's avatar as an image.


$(document).ready(function (){
	});
