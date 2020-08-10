document.addEventListener("DOMContentLoaded", function () {
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              var sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };

    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  let page = window.location.hash.substr(1);
  loadPage(getPage(page));
  function getPage(page) {
    if (page == "" || page == "#") {
      page = "home";
    }

    return page;
  }

  function loadPage(page) {
    let standings = false;
    if(page.indexOf("standings")!== -1){
      standings = page.split("-");
      page = page.substring(0, page.indexOf('-'));
      // console.log(page);
    }
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      let content = document.querySelector("#body-content");
      
            
      if (this.readyState == 4) {
        switch (page) {
          case "matches":
            getDataMatches();
            break;
          case "competitions":
            getCompetitions();
            break;
          case "teams":
            getTeams();
            break;
          case standings[0]:
          getStandings(standings[1]);
            break;
          case "favorit":
            getFav();
            break;
        }

        

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };

    xhttp.open("GET", "assets/pages/" + page + ".html", true);
    xhttp.send();
  }
});
