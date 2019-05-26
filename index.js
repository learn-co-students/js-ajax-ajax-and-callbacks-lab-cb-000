function displayError() {
  $("#errors").html('<strong>I'm sorry, there's been an error. Please try again.</strong>');
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').value.split(' ').join('+');
  $(document).ready(function (){
    $.get('https://api.github.com/search/repositories?q=' + searchTerms, function(response) {
      $("#results").html('<ul>');
      $.each(response.items, function(idx, item) {
        $("#results").html('<li><a href="' + item.html_url + '">' + item.name + '</a> - Description: ' + item.description + ' - Owner: <a href="https://github.com/' + item.owner.login + '">' + item.owner.login + '<img height="32" width="32" src="' + item.owner.avatar_url + '"></a> - <a href="#" onclick="showCommits(this)" data-repository="' + item.name + '" data-username="' + item.owner.login + '">Show Commits</a></li>');
      });
      $("#results").html('</ul>');
    }).fail(displayError);
  });
}

function showCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  $.get('https://api.github.com/repos/' + username + '/' + name + '/commits', function(commits) {
    $("#details").html('<ul>');
    $.each(commits, function(idx, commit) {
      $("#details").html('<li>SHA: ' + commit.sha + '- Author: ' + commit.author.login + ' - Avatar: <img height="32" width="32" src="' + commit.author.avatar_url + '"></li>');
    });
    $("#details").html('</ul>');
  }).fail(displayError);
}
