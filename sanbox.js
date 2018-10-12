let renderSearchResult = result => {
  return `
    <div>
      <h2>${result.name}</h2>
      <img src="${result.owner.avatar_url}" style="height: 100px; width: 100px"><br>
      <small>${result.description}</small><br>
      <a href="${result.html_url}">${result.html_url}</a><br>
      <a href="${result.owner.url}">${result.owner.login}</a><br>
      <a href="#" onclick="showCommits(result)">Show Commits</a>
    </div>
  `
}

let renderSearchResults = data => data.items.map(result => renderSearchResult(result));
