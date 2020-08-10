const getFav = ()=>{
    
    dbGetAllTeam().then(data => {
        allFav.innerHTML = '';   
        console.log(data)
       
        data.forEach(data => {
            const elm_id = data.name.split(' ').join('');
            allFav.innerHTML +=/*html*/`
            <div id="${data.name.split(' ').join('')}">
                <div class="team-box">
                <div class="nav-box-wrap">
                    <div class="center-align teams-title">
                            ${data.name}
                    </div>
                    <div class="red white-text add-fav waves-effect" id="add${elm_id}">
                        Hapus
                    </div>
                </div>
                    <div class="img-wrap">
                    <img src="${data.crestUrl}" onerror="this.src='assets/images/logo-web-dimar.png'" alt="DImar">
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
                    
                    dbDeleteTeam(data.teamId).then(()=>{
                        M.toast({
                            html: "Berhasil dihapus",
                            classes: "green",
                          });
                          getFav();
                    })
                })
            },100)

        })


    })
}
