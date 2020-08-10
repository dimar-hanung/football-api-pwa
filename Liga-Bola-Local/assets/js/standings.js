const getStandingsTable = (data) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    let content = document.querySelector("#body-content");

    if (this.readyState == 4) {
      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
        seasonYear.innerHTML = `${data.season.startDate} Hingga ${data.season.endDate}`;
        data.standings[0].table.forEach((data) => {
          standingsTable.innerHTML += /*html*/ `
            
            <td>${data.position}</td>
            <td class="club-logo"><div>
            <img src="${data.team.crestUrl !== null?data.team.crestUrl:"assets/images/logo-web-dimar.png"}" alt="Dimar Hanung" onerror="this.src='assets/images/logo-web-dimar.png'">
                <div class="center-align">${data.team.name}</div>
            </div></td>
            <td>${data.draw}</td>
            <td>${data.goalDifference}</td>
            <td>${data.goalsAgainst}</td>
            <td>${data.goalsFor}</td>
            <td>${data.lost}</td>
            <td>${data.playedGames}</td>
            <td>${data.points}</td>
            <td>${data.won}</td>
            
            `;
        });
      } else if (this.status == 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
      }
    }
  };

  xhttp.open("GET", "assets/pages/standings.html", true);
  xhttp.send();
};
