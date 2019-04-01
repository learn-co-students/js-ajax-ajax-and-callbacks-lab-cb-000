// <!-- Create a "Search Repositories" link that calls a searchRepositories function on click, takes the value of a searchTerms text input, and queries the GitHub repository search API. -->
$(document).ready(function (){

});


function searchRepositories() {
    const searchTerms = $('#searchTerms').val()
    $.ajax({
        type: 'GET',
        url: `https://api.github.com/search/repositories?q=${searchTerms}`,
        success: function(data) {
            const $data = $('data');
            console.log('success', data);
            displayResults(data);
        }
    });
}

function displayError() {
 $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
// let $results = $('#results')
// let results = document.getElementById('results')
// Display the collection of repositories inside the results div. Include repository name, description, and a link to the HTML URL. Also include repository owner login, repository owner avatar as an image, and a link to the owner's profile page. Hint: Pay close attention to the structure of the search results!
function displayResults(data) {
    // debugger
    // results.innerHTML =  ""
    // $('#results').clearQueue();
    $('#results').html("");
    data.items.map(obj => {
        $('#results').append(`<div>
        <h2><a href="${obj.html_url}"${obj.name}</a></h2> 
        <p><img src="${obj.owner.avatar_url}" alt="User Image"></p>
        <p><a href='#' data-repository="${obj.name}" data-owner="${obj.owner.login}" onclick="showCommits(this)">Show Commits</a></p> 
        <p> <li>${obj.description}</p>
        </div>`)
        // return results.innerHTML += `<li><h2>${obj.name}</h2> by ${obj.owner.login}</li>`
    })
}

function renderCommit (commit) {
    return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
  }
  
function renderCommits (data) {
    let result = data.map((commit)=>renderCommit(commit)).join('')
    return `<ul>${result}</ul>`
  }

//   displayError = () => $('#errors').html("I'm sorry, there's been an error. Please try again.")

// Add a "Show Commits" link to each repository result that will call a showCommits function that gets the repository's commits from the GitHub API and display them in the details div. For each commit, list the SHA, the author, the author's login, and the author's avatar as an image.
function showCommits(element) {
    $.get(`https://api.github.com/repos/${element.dataset.owner}/${element.dataset.repository}/commits`, data => {
      $('#details').html(renderCommits(data))
    }).fail(error => {
      displayError()
    })
  }

//   Handle errors on each API call. If $.get fails, call a function displayError and display "I'm sorry, there's been an error. Please try again." in the errors div. Hint: You can test your error callbacks by turning off Wi-Fi or temporarily changing the URL you use in the $.get request.

