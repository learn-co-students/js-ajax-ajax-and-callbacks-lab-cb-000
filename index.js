$(document).ready(function (){
});
function searchRepositories() {
  var searchTerms = document.getElementById('searchTerms').value
  var url = "https://api.github.com/search/repositories?q=" + searchTerms
  $.get(url, function(data){
    var src = document.getElementById("repo-template").innerHTML
    const template = Handlebars.compile(src)
    const repoList = template(data.items)
    $("#results").html(repoList)
  }).fail(error => displayError());
}
function displayError(error) {
  $("#errors").html("I'm sorry, there's been an error. Please try again")
}

function showCommits(el) {
  var url ="https://api.github.com/repos/"+ el.dataset.owner + "/"+ el.dataset.repository + "/commits"
  $.get(url, function(data) {
    var src = document.getElementById("commits-template").innerHTML
    const template = Handlebars.compile(src)
    const commitsList = template(data)
//    var list = `<ul>${data.map(item => '<li>' + item.commit.author.name + '<br>' + item.sha + '<img src="' + item.committer.avatar_url + '" width="32" height= "25"></li>').join('')}</ul>`
    $("#details").html(commitsList)
  });
}
