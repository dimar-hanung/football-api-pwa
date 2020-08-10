const getCompetitionsTable = (data) =>{
    let i =0;
    console.log(data)
    data.forEach(data => {
        // console.log(data.name);
        i++;
        competitionsTable.innerHTML += /*html*/`
        
        <tr>
            <td>${i}</td>
            <td><a href="#standings-${data.id}" onclick="getStandings(${data.id})" >${data.name}</a></td>
            <td>${data.area.name}</td>
            ${data.currentSeason!== null?"<td>"+data.currentSeason.startDate + "=>" + data.currentSeason.endDate:"<td class='red white-text center-align'>Belum Tersedia"}</td>
        </tr>

        `
    });


}

