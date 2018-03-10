l.jobs = new Object();
l.jobs.list = [{
    name: "Water collecting",
    id: "watercol",
    time: 1,
    get: [{id: "water", val: 1, updmul: function(){
        var val = 1;
        if (l.workshop.get("twinbuckets").bought){val+=1};
        if (l.workshop.get("ironbuckets").bought){val+=3};
        return val;
    }}], //want MUL and UPDMUL for multipliand update multiplier (see below)
    prereq: {explore: ["east"]},
    des: "Collect some water from the lake"
    },{
    name: "Woodcutting",
    id: "smalltreecut",
    time: 5,
    get: [{id: "wood", val: 3, updmul: function(){
        var val = 1;
        if (l.workshop.get("woodhatchet").bought){val+=0.2};
        if (l.workshop.get("ironaxes").bought){val+=2.1};
        val+=l.buildings.get("rangerstation").num;
        return val;
    }}],
    settime: function(){
        time = 5;
        if (l.workshop.get("lightsmallaxes").bought){time=3};
        this.time = time;
    },
    prereq: {explore: ["forest"]},
    des: "Cut down some of the small trees in the forest"
    },{
    name: "Larger woodcutting",
    id: "mediumtreecut",
    time: 60,
    get: [{id: "wood", val: 40, updmul: function(){
        var val = 1;
        if (l.workshop.get("woodhatchet").bought){val+=0.2};
        if (l.workshop.get("ironaxes").bought){val+=2};
        val+=l.buildings.get("rangerstation").num;
        return val;
    }}],
    settime: function(){
        time = 60;
        if (l.workshop.get("lightmediumaxes").bought){time=30};
        this.time = time;
    },
    prereq: {explore: ["deepforest"]},
    des: "Cut down some of the trees in the forest"
    },{
    name: "Big woodcutting",
    id: "bigtreecut",
    time: 300,
    get: [{id: "wood", val: 300, updmul: function(){
        var val = 1;
        val+=l.buildings.get("rangerstation").num;
        return val;
    }}],
    settime: function(){
        time = 300;
        if (l.workshop.get("lightbigaxes").bought){time=150};
        this.time = time;
    },
    prereq: {explore: ["jungle"]},
    des: "Cut down some of the big trees in the jungle"
    },{
    name: "Saw wooden planks",
    id: "makewoodenplank",
    time: 20,
    cost: [{id: "wood", val: 100}],
    get: [{id: "woodplank", val: 1}],
    prereq: {workshop: ["irontools"]},
    des: "Chop wood into wooden planks"
    },{
    name: "Spear making",
    id: "spearmaking",
    time: 20,
    cost: [{id: "wood", val: 1}],
    get: [{id: "spear", val: 1}],
    prereq: {explore: ["plains", "forest"]},
    des: "Make a spear for hunting"
    },{
    name: "Hunting",
    id: "hunting",
    time: 20,
    settime: function(){
        time = 20;
        if (l.workshop.get("lightspears").bought){time-=15};
        this.time = time;
    },
    cost: [{id: "spear", val: 1}],
    get: [{id: "rawmeat", val: 1, updmul: function(){
        var val = 1;
        if(l.workshop.get("ironspears").bought){val+=4};
        return val;
    }}],
    prereq: {explore: ["plainscen"]},
    des: "Go hunting on the plain"
    },{
    name: "Cooking",
    id: "cooking",
    time: 5,
    cost: [{id: "wood", val: 5},{id: "rawmeat", val: 1}],
    get: [{id: "cookedmeat", val: 1}],
    prereq: {explore: ["plainscen"]},
    des: "Cook a piece of meat"
    },{
    name: "Mining",
    id: "mining",
    time: 8,
    settime: function(){
        time = 8;
        if (l.workshop.get("coaltorches").bought){time-=1};
        if (l.workshop.get("torchholders").bought){time-=1};
        this.time = time;
    },
    get: [{id: "ore", val: 1, updmul: function(){
        var val = 1;
        if (l.workshop.get("ironpicks").bought){val+=0.2};
        if (l.workshop.get("torchholders").bought){val+=1};
        return val;
    }}],
    prereq: {
        explore: ["deepforest","mines"],
        workshop: ["woodpick"]
    },
    des: "Mine some ores"
    },{
    name: "Coal mining",
    id: "coalmining",
    time: 25,
    get: [{id: "coal", val: 1}],
    prereq: {
        explore: ["coalcave"],
        workshop: ["ironpicks"]
    },
    des: "Mine some coals"
    }
]

l.jobs.setup = function(){
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

l.jobs.updateallcost = function(){
    for (var i in this.list){
        this.list[i].setvals();
    }
}

l.jobs.setalltime = function(){
    for (var i in this.list){
        if (this.list[i].settime){this.list[i].settime()}
    }
}

l.jobs.updateallprereq = function(){
    for (var i in this.list){
        this.list[i].checkprereq();
    }
}

l.jobs.get = function(id){
    for (var i in this.list){
        if (this.list[i].id == id){return this.list[i]}
    }
    return undefined;
}

l.jobs.cur = null;
l.jobs.next = null;

l.jobs.queuejob = function(job,jobtype){
    if (l.jobs.cur!=null){
        l.jobs.next = new Object();
        l.jobs.next.id = job.id;
        l.jobs.next.type = jobtype;
        l.jobs.next.name = job.name;
    } else {
        l.jobs.cur = job;
        l.jobs.cur.type = jobtype;
        l.jobs.time = job.time;
    }
}

l.jobs.setjob = function(jobid){
    x=this.get(jobid);
    l.jobs.queuejob(x,"normal");
    l.topbarjoblooks();
}

//do the job
l.jobs.do = function(timelapsed){
    x = this.cur;
    if (timelapsed==undefined){
        timelapsed = 1;
    }
    if (x){
        this.time-=timelapsed;
        abletodo = true;
        for (var i in x.cost){
            if (l.res.get(x.cost[i].id).num<x.cost[i].val){abletodo = false}
        }
        if (!(abletodo)){document.getElementById('notenoughwarning').style.opacity = '1'}
        else {document.getElementById('notenoughwarning').style.opacity = '0'}
    } else {document.getElementById('notenoughwarning').style.opacity = '0'}
    if (l.jobs.time<=0.5 && x){
        abletodo = true;
        for (var i in x.cost){
            if (l.res.get(x.cost[i].id).num<x.cost[i].val){abletodo = false}
        }
        if (abletodo){
            if (x.type !== "building"){for (var i in x.get){l.res.get(x.get[i].id).get(x.get[i].val)}}
            for (var i in x.cost){l.res.get(x.cost[i].id).num-=x.cost[i].val;}
            if (x.type=="explore"){l.explore.explored(x.id)}
            else if (x.type=="workshop"){l.workshop.finished(x.id)}
            else if (x.type=="building"){l.buildings.finished(x.id)}
            if (l.jobs.next!=null){
                l.jobs.canceljob();
            } else if (x.type == "normal") {
                l.jobs.next = l.jobs.cur;
                l.jobs.canceljob();
            }
            if (!(x.type == "normal")){
                l[l.tabs.curtab].draw();
            } 
            l.topbarjoblooks();
        } else {
            l.jobs.time = 1;
            l.topbarjoblooks();
        }
    }
}

l.jobs.canceljob = function(){
    l.jobs.cur = l.get(l.jobs.next.id);
    l.jobs.cur.type = l.jobs.next.type;
    l.jobs.time = l.jobs.cur.time;
    l.jobs.next = null;
    l.topbarjoblooks();
}

l.jobs.globalgetboost = 1;

l.jobs.getglobalgetboost = function(){
    gb = 1;
    if (l.workshop.get("meatballsnack").bought){gb+=0.5};
    if (l.workshop.get("salamisnack").bought){gb+=0.5};
    return gb;
}

l.jobs.setallglobalboosts = function(){
    this.globalgetboost = this.getglobalgetboost();
}

l.jobs.timeboost = 10
l.jobs.settimeboost = function(){
    tb = 1
    if (l.workshop.get("meatballmain").bought){tb+=0.2};
    if (l.workshop.get("meatballsnack").bought){tb+=0.2};
    if (l.workshop.get("salamimain").bought){tb+=0.2};
    if (l.workshop.get("salamisnack").bought){tb+=0.2};
    l.jobs.timeboost = 10*tb;
}

l.jobs.eatsnack = function(){
    if (l.res.get("cookedmeat").num>=10){
        l.res.get("cookedmeat").num-=10;
        l.jobs.time-=l.jobs.timeboost;
    }
}

l.jobs.updateall = function(){
    l.jobs.setallglobalboosts();
    l.jobs.updateallcost();
    l.jobs.updateallprereq();
    l.jobs.setalltime();
    l.jobs.settimeboost();
}

//draw the jobs section
l.jobs.draw = function(){
    l.jobs.updateall();
    x = document.getElementById("maingame");
    x.innerHTML = "";
    if (l.workshop.get("meatballmain").bought){
        x.innerHTML += "<div id='eatsnack' onclick='l.jobs.eatsnack()'>Eat snack</div>";
    }
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





