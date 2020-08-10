const baseUrl = "https://api.football-data.org/v2/";
const apiToken = "20f47dc63eaa45cfb00831b1d64b0a30";

function status(response) {
  loader()
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    if (response.status === 403)
      M.toast({
        html: response.status + " Maklum API Gratisan",
        classes: "red",
      });
      
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
function json(response) {
  // Mengembalikan sebuah Promise berupa objek/array JavaScript
  // yang diubah dari teks JSON.

  return response.json();
}

function error(error) {
  // Parameter error berasal dari Promise.reject()
  loader()
  console.log("Error : " + error);
}
function loader(){
  const el = document.querySelector("#loaderToggle");
  if (el.classList.contains("active")) {
    el.classList.remove("active");
  }
  document.querySelector("#body-content").style.filter = "none";
  document.querySelector("footer").style.filter = "none";
}

function fetchAPI(endpoint) {
  const el = document.querySelector("#loaderToggle");
  if (!el.classList.contains("active")) {
    el.classList.add("active");
  }
  document.querySelector("#body-content").style.filter = "blur(3px)";
  document.querySelector("footer").style.filter = "blur(3px)";
  return fetch(baseUrl + endpoint, {
    headers: {
      "X-Auth-Token": apiToken,
    },
  })
    .then(status)
    .then(json);
}

const getCompetitions = () => {
  fetchAPI("competitions")
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      getCompetitionsTable(data.competitions);
      console.log(data);
    })
    .catch(error);
};

const getTeams = () => {
  fetchAPI("teams")
    .then(function (data) {
      getTeamsTable(data);
      console.log(data);
    })
    .catch(error);
};

const getStandings = (year) => {
  fetchAPI(`competitions/${year}/standings?standingType=TOTAL`)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      getStandingsTable(data);
      console.log(data);
    })
    .catch(error);
};

const getSchedule = (id, teamId) => {
  fetchAPI(`teams/${id}/matches?status=SCHEDULED`)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      if (data.matches.length < 1) {
        M.toast({
          html: "Tidak ada shedule saat ini",
          classes: "blue",
        });

        teamId.getElementsByClassName("btn")[1].style.background = "#dc3435";
      } else {
        getScheduleTable(data, teamId);
      }

      console.log(data);
    })
    .catch(error);
};

//   fetch("https://api.football-data.org/v2/competitions/2084", {
// headers: {
//   "X-Auth-Token": api_token,
// }})
// .then(status)
// .then(json)
// .then(function (data) {
//   // Objek/array JavaScript dari response.json() masuk lewat data.
//   console.log(data);
// })
// .catch(error);
