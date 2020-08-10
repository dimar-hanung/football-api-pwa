const getScheduleTable = (data,teamId) => {
    
    teamId.style.width = "100%";
    let output = '';
    data.matches.forEach((match,i) => {
        output+=/*html*/`
        <div class="desc-wrap">
            <div>
                <b>Match</b> ${i + 1}
            </div>
            <div>
                <b>Start Date: </b> ${match.season.startDate}
            </div>
            <div>
                <b>End Date : </b> ${match.season.endDate}
            </div>
            <div>
                <b>Group : </b> ${match.group}
            </div>
            <hr/>
        </div>
        
        `
    });
    document.getElementById("desc"+teamId.id).innerHTML = output

    document.getElementById("desc"+teamId.id).style.display='block';
    teamId.getElementsByClassName("btn-wrap")[0].innerHTML += /*html*/`<a class="btn waves-effect" onclick = "closeSchedule('${teamId.id}');this.outerHTML =''">close</a>`
    

  };
  
  const closeSchedule = (teamId) =>{
    document.getElementById("desc"+teamId).style.display='none';
    document.getElementById(teamId).style.width = "25%"
  }