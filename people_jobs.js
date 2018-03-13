l.people_jobs = new Object();
l.jobs.list = [{
    name: "Water collecting",
    id: "watercol",
    time: 1,
    get: [{id: "water", val: 1, updmul: function(){
        var val = 1;
        if (l.workshop.get("twinbuckets").bought){val=2};
        if (l.workshop.get("ironbuckets").bought){val=10};
        return val;
    }}], //want MUL and UPDMUL for multipliand update multiplier (see below)
    prereq: {explore: ["east"]},
    des: "Collect some water from the lake"
    }/*,{

    }*/
]

l.people_jobs.setup = function(){
    for (var i in this.list){
        if (this.list[i].name === undefined){this.list[i].name = this.list[i].id};
        if (this.list[i].cost === undefined){this.list[i].cost = []};
        if (this.list[i].type === undefined){this.list[i].type = "normal"};
        if (this.list[i].vis === undefined){this.list[i].vis = false};
        this.list[i].checkprereq = function(){
            var unlocked = true;
            if (this.prereq.explore){
                for (var j in this.prereq.explore){
                    if (!l.explore.get(this.prereq.explore[j]).bought){unlocked = false}
                }
            }
            if (this.prereq.workshop){
                for (var j in this.prereq.workshop){
                    if (!l.workshop.get(this.prereq.workshop[j]).bought){unlocked = false}
                }
            }
            if (unlocked){this.vis = true};
        }
        this.list[i].setvals = function(){
            this.allmul = this.getallmul();
            for (var j in this.get){
                this.get[j].mul = this.get[j].updmul();
                this.get[j].val = this.get[j].baseval*this.get[j].mul*l.jobs.globalgetboost*this.allmul;
            }
            for (var j in this.cost){
                this.cost[j].mul = this.cost[j].updmul();
                this.cost[j].val = this.cost[j].baseval*this.cost[j].mul*this.allmul;
            }
        }
        for (var j in this.list[i].get){
            this.list[i].get[j].mul = 1;
            this.list[i].get[j].baseval = this.list[i].get[j].val;
            this.list[i].get[j].name = l.res.get(this.list[i].get[j].id).name;
            if (this.list[i].get[j].updmul === undefined){this.list[i].get[j].updmul = function(){return 1}}
        }
        for (var j in this.list[i].cost){
            this.list[i].cost[j].mul = 1;
            this.list[i].cost[j].baseval = this.list[i].cost[j].val;
            this.list[i].cost[j].name = l.res.get(this.list[i].cost[j].id).name;
            if (this.list[i].cost[j].updmul === undefined){this.list[i].cost[j].updmul = function(){return 1}}
        }
        this.list[i].allmul = 1;
        if (this.list[i].getallmul === undefined){
            this.list[i].getallmul = function(){return 1}
        }
    }
}

l.people_jobs.updateallcost = function(){
    for (var i in this.list){
        this.list[i].setvals();
    }
}

l.people_jobs.setalltime = function(){
    for (var i in this.list){
        if (this.list[i].settime){this.list[i].settime()}
    }
}

l.people_jobs.updateallprereq = function(){
    for (var i in this.list){
        this.list[i].checkprereq();
    }
}

l.people_jobs.get = function(id){
    for (var i in this.list){
        if (this.list[i].id == id){return this.list[i]}
    }
    return undefined;
}

l.people_jobs.globalgetboost = 1;

l.people_jobs.getglobalgetboost = function(){
    gb = 1;//have some faith (in the) stuff here
    return gb;
}

l.people_jobs.setallglobalboosts = function(){
    this.globalgetboost = this.getglobalgetboost();
}

/*Snacking doesn't seem all that good right now
l.jobs.eatsnack = function(){
    if (l.res.get("cookedmeat").num>=10){
        l.res.get("cookedmeat").num-=10;
        l.jobs.time-=l.jobs.timeboost;
    }
}*/

l.people_jobs.updateall = function(){
    l.jobs.setallglobalboosts();
    l.jobs.updateallcost();
    l.jobs.updateallprereq();
    l.jobs.setalltime();
    l.jobs.settimeboost();
}
/* FIX THIS UP A LOT
//draw the jobs section
l.people_jobs.draw = function(){
    l.people_jobs.updateall();
    x = document.getElementById("maingame");
    x.innerHTML = "";
    for (var i in this.list){
        if (this.list[i].vis){
            x.innerHTML += "<div class='jobitem' id='jobitem"+this.list[i].id+"' onclick = 'l.jobs.setjob(\""+this.list[i].id+"\")'></div>";
            y = document.getElementById("jobitem"+this.list[i].id);
            y.innerHTML += "<div class='jobitemtitle'>"+this.list[i].name+"</div>";
            y.innerHTML += "<div class='jobitemtime'>Time: "+this.list[i].time+"</div>";
            costgrid = "";
            for (var j in this.list[i].cost){
                costgrid += "<div class='jobitemcostitem'>"+this.list[i].cost[j].name+": "+l.display(this.list[i].cost[j].val)+"</div>";
            }
            getgrid = "";
            for (var j in this.list[i].get){
                getgrid += "<div class='jobitemgetitem'>"+this.list[i].get[j].name+": "+l.display(this.list[i].get[j].val)+"</div>";
            }
            //console.log(getgrid);
            y.innerHTML += "<div class='jobitembox jobitemgetgrid'><div class='jobitemlistcaption'>Get:</div>"+getgrid+"</div>";
            if (costgrid!==""){y.innerHTML += "<div class='jobitembox jobitemcostgrid'><div class='jobitemlistcaption'>Cost:</div>"+costgrid+"</div>";}
            y.innerHTML += "<div class='jobitemdes'>"+this.list[i].des+"</div>";
        }
    }
}
*/




