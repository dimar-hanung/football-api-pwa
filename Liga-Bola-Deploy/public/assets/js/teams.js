const getTeamsTable = (data) => {
    
   data.teams.forEach(data => {
    const elm_id = data.name.split(' ').join('');
    allTeams.innerHTML +=/*html*/`
    <div id="${data.name.split(' ').join('')}">
        <div class="team-box">
        <div class="nav-box-wrap">
            <div class="center-align teams-title">
                    ${data.name}
            </div>
            <div class="teal white-text add-fav waves-effect" id="add${elm_id}">
                ADD
            </div>
        </div>
            <div class="img-wrap">
            <img src="${data.crestUrl?data.crestUrl:"assets/images/logo-web-dimar.png"}" onerror="this.src='assets/images/logo-web-dimar.png'" alt="DImar">
            </div>
            
            
            <div class="btn-wrap">
                <a href="#" class="btn waves-effect">
                    Detail
                </a>
                <a href="#teams-${data.name.toLowerCase().split(' ').join('-')}" onclick="getSchedule(${data.id},${elm_id})" class="btn waves-effect">
                    Schedule
                </a>
            </div>
            <div id="desc${elm_id}">
                
            </div>
        </div>
    </div>
    
    `
    setTimeout(()=>{
        document.getElementById(`add${elm_id}`).addEventListener('click',function(e){
            insertTeam(data)
        })
    },100)
    

   });
   function insertTeam(data) {
       console.log(data)
    data.teamId = data.id

    dbInsertTeam(data).then(() => {
        M.toast({
            html: "Berhasil ditambahkan ke favorit",
            classes: "green",
          });
    })
}

};
