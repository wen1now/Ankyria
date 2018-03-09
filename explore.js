l.explore = new Object();
l.explore.list = [{
    name: "Shuttle",
    id: "shuttle",
    pos: [0,0],
    bought: true,
    vis: true,
    des: "Home sweet home"
    },{
    name: "North",
    id: "north",
    pos: [0,2],
    time: 5,
    visprereq: {explore: ["shuttle"]},
    des: "Explore the area around you to the north.",
    log: "After going to the north I discovered a large, sweeping plain. Will explore more later"
    },{
    name: "South",
    id: "south",
    pos: [0,-2],
    time: 5,
    visprereq: {explore: ["shuttle"]},
    des: "Explore the area around you to the south",
    log: "It looks like a desert down there... there won't be much water, unfortunately"
    },{
    name: "East",
    id: "east",
    pos: [2,0],
    time: 5,
    visprereq: {explore: ["shuttle"]},
    des: "Explore the area around you to the east",
    log: "Hiked to the east, found a lake! Plenty of water now."
    },{
    name: "West",
    id: "west",
    pos: [-2,0],
    time: 5,
    visprereq: {explore: ["shuttle"]},
    des: "Explore the area around you to the west",
    log: "Went to the west, didn't find much. It appears there's a desert down south and a forest to the west."
    },{
    id: "forest",
    pos: [-4,-1],
    time: 20,
    visprereq: {explore: ["west"]},
    des: "Go exploring in the forest",
    log: "I found a bunch of trees to chop down. Well, what did I expect from a forest."
    },{
    name: "Deep forest",
    id: "deepforest",
    pos: [-7,-2],
    time: 50,
    visprereq: {explore: ["forest"]},
    cost: [{id: "water", val: 100}],
    des: "Explore deeper in the forest",
    log: "I found even more trees to chop down. Well, what did I expect from more forest?"
    },{
    id: "jungle",
    pos: [-11,-3],
    time: 400,
    visprereq: {explore: ["deepforest"]},
    cost: [{id: "water", val: 800}],
    des: "Go exploring in the jungle",
    log: "Out here, there are some massive trees that I could use for wood."
    },{
    name: "Plains",
    id: "plains",
    pos: [1,4],
    time: 25,
    cost: [{id: "water", val: 100}],
    visprereq: {explore: ["north"]},
    des: "A massive plain lies this way, stretching to the horizon",
    log: "The plain extends onwards... I'm out of water and have to go back. Maybe next time."
    },{
    name: "More plains",
    id: "plainscen",
    pos: [3,7],
    time: 125,
    cost: [{id: "water", val: 800}],
    get: [{id: "rawmeat", val: 2}],
    visprereq: {explore: ["plains"]},
    des: "There are some weird animals on the horizon. Perhaps you could hunt them...?",
    log: "I caught some weird animal. The meat seems edible-ish."
    },{
    name: "North western plain",
    id: "plainsnw",
    pos: [-1,11],
    time: 400,
    cost: [{id: "water", val: 1200}],
    visprereq: {explore: ["plainscen"]},
    des: "See if there's an end to this unending plain.",
    log: "Ah-ha! The plain gives way to... sea. Tough luck, time for me to go back."
    },{
    id: "desert",
    pos: [-1,-4],
    time: 20,
    cost: [{id: "water", val: 250}],
    get: [{id: "water", val: 20}],
    visprereq: {explore: ["south"]},
    des: "Go exploring in the desert",
    log: "Nothing to see in the desert except cactus and an oasis, got some water back."
    },{
    name: "Deep desert",
    id: "deepdesert",
    pos: [0,-7],
    time: 200,
    cost: [{id: "water", val: 2000}],
    visprereq: {explore: ["desert"]},
    des: "Go exploring deep into the desert",
    log: "There's a lot of shiny stuff in the ground around here."
    },{
    id: "mines",
    pos: [1,-10],
    time: 200,
    cost: [{id: "water", val: 2500}],
    visprereq: {workshop: ["woodpick"]},
    des: "Set up a mine here in the shiny stuff",
    log: "Ready to mine!"
    },{
    name: "Mountains",
    id: "mountains1",
    pos: [-5,-5],
    time: 500,
    cost: [{id: "water", val: 2000}],
    visprereq: {explore: ["desert","deepforest"]},
    des: "Go exploring the mountains",
    log: "Climbed a mountain. There are so many more though!"
    },{
    name: "Mountains",
    id: "mountains2",
    pos: [-6,-6],
    time: 800,
    cost: [{id: "water", val: 2200}],
    visprereq: {explore: ["mountains1"]},
    des: "Go exploring the mountain chain",
    log: "Climbed another few mountains. The going is getting rough, heading back."
    },{
    name: "Mountains",
    id: "mountains3",
    pos: [-5,-7],
    time: 1000,
    cost: [{id: "water", val: 2500}],
    visprereq: {explore: ["mountains2"]},
    des: "Go exploring the mountain range",
    log: "Climbed another few mountains. Found a massive cave. I can see lots of black on the walls but it's too dark"
    },{
    name: "Caves",
    id: "coalcave",
    pos: [-6,-8],
    time: 500,
    cost: [{id: "water", val: 2000}],
    visprereq: {explore: ["mountains3"]},
    des: "Explore the caves a bit more",
    log: "WOAH, there's coal! I'd better get ready to mine this coal"
    },{
    name: "Mountains",
    id: "mountains4",
    pos: [-6,-8],
    time: 1250,
    cost: [{id: "water", val: 3000}],
    visprereq: {explore: ["mountains3"]},
    des: "Go exploring the mountains",
    log: "Climbed another bunch of mountains."
    },{
    name: "Mountains",
    id: "mountains5",
    pos: [-7,-10],
    time: 1600,
    cost: [{id: "water", val: 3400}],
    visprereq: {explore: ["mountains4"]},
    des: "Go exploring the mountains",
    log: "Climbed another bunch of mountains; seems to be nothing much ahead except taller and taller mountains"
    },{
    name: "Mountains",
    id: "mountains6",
    pos: [-7,-12],
    time: 2000,
    cost: [{id: "water", val: 4000}],
    visprereq: {explore: ["mountains5"]},
    des: "Go exploring the mountains",
    log: "Climbed a massive mountain today. The path is so well worn from me travelling so much"
    },{
    name: "Mountains",
    id: "mountains7",
    pos: [-8,-11],
    time: 2800,
    cost: [{id: "water", val: 5000}],
    visprereq: {explore: ["mountains6"]},
    des: "Go exploring the mountains",
    log: "Another mountain, another day"
    },{
    name: "Mountains",
    id: "mountains8",
    pos: [-8,-12],
    time: 3200,
    cost: [{id: "water", val: 6000}],
    visprereq: {explore: ["mountains7"]},
    des: "Go exploring the mountains",
    log: "Found another cave today"
    },{
    name: "Caves",
    id: "lavacave1",
    pos: [-9,-12],
    time: 1000,
    cost: [{id: "water", val: 2000}],
    visprereq: {explore: ["mountains8"]},
    des: "Go exploring into the cave system",
    log: "The cave goes on and on..."
    },{
    name: "Caves",
    id: "lavacave2",
    pos: [-9,-12],
    time: 1200,
    cost: [{id: "water", val: 3000}],
    visprereq: {explore: ["mountains8"]},
    des: "Go exploring deep into the cave system",
    log: "WOAH, found a lava pool here! The heat here is blistering."
    },{
    name: "Fishery",
    id: "nearlake",
    pos: [3,1],
    time: 5,
    visprereq: {explore: ["east"], res: ["iron"]},
    des: "Search for fishing places around the lake",
    log: "Found a fishing place! Time to set up"
    }
]

l.explore.setup = function(){
    for (var i in this.list){
        if (!this.list[i].name){this.list[i].name=this.list[i].id.charAt(0).toUpperCase() + this.list[i].id.slice(1);};
        if (this.list[i].bought==undefined){this.list[i].bought = false;};
        if (this.list[i].cost==undefined){this.list[i].cost = [];};
        if (this.list[i].vis==undefined){this.list[i].vis = false;};
        if (this.list[i].visprereq==undefined){this.list[i].visprereq = {explore: []};};
        if (this.list[i].prereq==undefined){this.list[i].prereq = this.list[i].visprereq.explore;};
        if (this.list[i].connect==undefined){this.list[i].connect = this.list[i].visprereq.explore;};
        this.list[i].basetime = this.list[i].time;
        if (this.list[i].settime == undefined){
            this.list[i].settime = function(){
                this.time = this.basetime/l.explore.globalspeedboost;
            }
        }
        this.list[i].calccosts = function(){
            for (var j in this.cost){
                this.cost[j].mul = this.cost[j].getmul();
                if (this.cost[j].id == "water"){
                    this.cost[j].val = this.cost[j].baseval * this.cost[j].mul * l.explore.globalwatercostpercentage;
                } else {
                    this.cost[j].val = this.cost[j].baseval * this.cost[j].mul;
                }
            }
        }
        if (this.list[i].cost){
            for (var j in this.list[i].cost){
                this.list[i].cost[j].baseval = this.list[i].cost[j].val;
                this.list[i].cost[j].name = l.res.get(this.list[i].cost[j].id).name;
                this.list[i].cost[j].col = l.res.get(this.list[i].cost[j].id).col;
                if (this.list[i].cost[j].mul==undefined){this.list[i].cost[j].mul = 1};
                if (this.list[i].cost[j].getmul==undefined){
                    this.list[i].cost[j].getmul = function(){return 1}
                }
            }
        }
        if (this.list[i].get){
            for (var j in this.list[i].get){
                this.list[i].get[j].name = l.res.get(this.list[i].get[j].id).name;
                this.list[i].get[j].col = l.res.get(this.list[i].get[j].id).col;
                if (this.list[i].get[j].mul==undefined){this.list[i].get[j].mul = 1};
            }
        }
        this.list[i].checkprereq = function(){
            if (!this.vis){
                var allgood = true;
                if (this.visprereq.explore){
                    for (var j in this.visprereq.explore){
                        if (l.explore.get(this.visprereq.explore[j]).bought==false){
                            allgood = false;
                        }
                    }
                }
                if (this.visprereq.res){
                    for (var j in this.visprereq.res){
                        if (l.res.get(this.visprereq.res[j]).num==0){
                            allgood = false;
                        }
                    }
                }
                if (this.visprereq.workshop){
                    for (var j in this.visprereq.workshop){
                        if (!l.workshop.get(this.visprereq.workshop[j]).bought){
                            allgood = false;
                        }
                    }
                }
                if (allgood){this.vis = true;};
            }
        }
        this.list[i].buy = function(){
            l.explore.curbuy = this.id;
        }
    }
}

l.explore.unlockall = function(){
    for (var i in this.list){
        this.list[i].vis = true;
    }
}

l.explore.updateall = function(){
    l.explore.setglobals();
    l.explore.calcallcosts();
    l.explore.checkallprereq();
    l.explore.setalltimes();
}

l.explore.calcallcosts = function(){
    for (var i in this.list){
        this.list[i].calccosts();
    }
}

l.explore.checkallprereq = function(){
    for (var i in this.list){
        this.list[i].checkprereq();
    }
}

l.explore.setalltimes = function(){
    for (var i in this.list){
        this.list[i].settime();
    }
}

l.explore.explore=function(id){
    x = l.explore.get(id);
    if (!x.bought){
        l.jobs.cur = l.explore.get(id);
        l.jobs.time = l.explore.get(id).time;
        l.jobs.cur.type = "explore";
        l.explore.cur = id;
    }
    l.topbarjoblooks();
}

l.explore.explored = function(id){
    l.explore.get(id).bought = true;
    l.jobs.cur = null;
    var item = l.explore.get(id);
    if (item.log){
        l.log(item.log);
    } else {
        l.log("I explored "+item.name+" today.");
    };
    l[l.tabs.curtab].draw();
    l.topbarjoblooks();
    l.updateall();
}

//set size of the thing
l.explore.setsize = function(){
    var minx, miny, maxx, maxy;
    minx = miny = maxx = maxy = 0;
    for (var i in this.list){
        if (this.list[i].vis){
            if (this.list[i].pos[0]>maxx){maxx=this.list[i].pos[0]};
            if (this.list[i].pos[0]<minx){minx=this.list[i].pos[0]};
            if (this.list[i].pos[1]>maxy){maxy=this.list[i].pos[1]};
            if (this.list[i].pos[1]<miny){miny=this.list[i].pos[1]};
        }
    }
    this.size = [minx, miny, maxx, maxy];
}

l.explore.ctop = function(x){//ctop is coordinates to position, eg. INPUT: [0,0] OUTPUT [325,400]
    return [24*(x[0]-this.size[0])+24, 24*(this.size[3]-x[1])+24]
}

l.explore.draw = function(){
    document.getElementById("maingame").innerHTML = "<div id='explorebox'></div>";
    l.explore.drawinside();
}

l.explore.drawinside = function(){
    x = document.getElementById("explorebox");
    x.innerHTML = "";
    l.explore.checkallprereq();
    l.explore.setsize();
    for (var i in this.list){
        if (this.list[i].vis){
            var pos = l.explore.ctop(this.list[i].pos);
            x.innerHTML+="<div class='exploreico' id='exploreplace"+this.list[i].id+"' style='left:"+pos[0]+"px; top:"+pos[1]+"px' onclick='l.explore.explore(\""+this.list[i].id+"\")'></div>";
            y = document.getElementById("exploreplace"+this.list[i].id);
            if (this.list[i].bought){
                y.innerHTML = "<div class='exploretooltip'><div class='explorelocname'>"+this.list[i].name+"</div><div class='explored'>Explored</div><div>"+this.list[i].des+"</div></div>";
                y.innerHTML += "<object data='icons/"+this.list[i].id+".ico' width='16px' height='16px'></object>";
                y.className += " explorebought";
            } else {
                costgrid = "";
                for (var j in this.list[i].cost){
                    costgrid += "<div class='exploreitemcostitem'>"+this.list[i].cost[j].name+": "+l.display(this.list[i].cost[j].val)+"</div>";
                }
                y.innerHTML = "<div class='exploretooltip'><div class='explorelocname'>"+this.list[i].name+"</div><div class='exploretime'>Time: "+l.display(this.list[i].time)+"</div>"+costgrid+this.list[i].des+"</div></div>";
            }
        }
    }
}

l.explore.get = function(name){
    for (var i in this.list){
        if (this.list[i].id == name){
            return this.list[i];
        }
    }
    return undefined;
}

l.explore.globalspeedboost = 1;
l.explore.globalwatercostpercentage = 1;

l.explore.calcglobalwatercost = function(){
    var gc = 1;
    //do stuff here
    if (l.workshop.get("woodhatchet").bought){gc+=0.1};
    if (l.workshop.get("meatballmain").bought){gc+=0.2};
    if (l.workshop.get("meatballsnack").bought){gc+=0.2};
    if (l.workshop.get("salamimain").bought){gc+=0.2};
    if (l.workshop.get("salamisnack").bought){gc+=0.2};
    return gc;
}

l.explore.calcglobalspeedboost = function(){
    var sb = 1;
    //do stuff here
    if (l.workshop.get("walkingstick").bought){sb+=0.5};
    if (l.workshop.get("walkingstick2").bought){sb+=0.5};
    if (l.workshop.get("walkingstick3").bought){sb+=0.5};
    if (l.workshop.get("walkingstick4").bought){sb+=0.5};
    if (l.workshop.get("woodhatchet").bought){sb+=0.5};
    if (l.workshop.get("meatballmain").bought){sb+=0.3};
    if (l.workshop.get("salamimain").bought){sb+=0.5};
    if (l.workshop.get("ironstick").bought){sb+=1};
    return sb;
}

l.explore.setglobals = function(){
    this.globalspeedboost = this.calcglobalspeedboost();
    this.globalwatercostpercentage = 1/this.calcglobalwatercost();
}








