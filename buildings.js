l.buildings = new Object();

l.buildings.list = [{
    name: "Rain collecter",
    id: "raincol",
    time: 10,
    settimemul: function(){
        var time = 1;
        if (l.workshop.get("leafcol").bought){
            time += 1;
        }
        this.timemul = time;
    },
    basecost: [{id: "wood", val: 40}],
    prereq: {explore: ["forest"]},
    des: "When it rains, collect some water",
    ratio: 1.1,
    get: [{
            id: "water", val: 0.1, getmul: function(){
            m = 1;
            if (l.workshop.get("leafcol").bought){m+=2}
            if (l.workshop.get("leafcol2").bought){m+=4}
            if (l.workshop.get("ironbowls").bought){m+=l.buildings.get("waterbowl").num*0.1}
            if (l.workshop.get("ironwoodjets").bought){m += l.buildings.get("waterbowl").num*0.2}
            return m;
            }
        },{
            id: "waterCap", val: 30, getmul: function(){
            m = 0;
            if (l.workshop.get("leafcol2").bought){m=1}
            return m;
    }}]
    },{
    name: "Water bowl",
    id: "waterbowl",
    time: 5,
    basecost: [{id: "wood", val: 10}],
    prereq: {explore: ["forest"]},
    des: "Gain storage for water",
    ratio: 1.25,
    get: [{id: "waterCap", val: 100, getmul: function(){
        m = 1;
            if (l.workshop.get("leafcol2").bought){m += 0.2}
        if (l.workshop.get("ironwoodjets").bought){m += l.buildings.get("raincol").num*0.1}
        return m;
    }}]
    },{
    id: "shed",
    time: 25,
    basecost: [{id: "wood", val: 50}],
    prereq: {explore: ["deepforest"]},
    des: "Storage shed for resources",
    ratio: 1.3,
    get: [
        {id: "woodCap", val: 100},
        {id: "rawmeatCap", val: 10},
        {id: "cookedmeatCap", val: 5},
        {id: "oreCap", val: 10},
        {id: "coalCap", val: 10},
        {id: "ironCap", val: 5},
        {id: "graphiteCap", val: 1}
    ],
    getallgetmul: function(){
        m = 1;
        if (l.workshop.get("plainsheds").bought){m += 0.5}
        if (l.workshop.get("ironsheds").bought){m += 1}
        if (l.workshop.get("woodplanksheds").bought){m += 0.5}
        if (l.workshop.get("steelsheds").bought){m += 5}
        return m;
    }
    },{
    name: "Wood farm",
    id: "woodfarm",
    time: 20,
    basecost: [{id: "wood", val: 60}],
    prereq: {explore: ["jungle"]},
    des: "Build a farm to farm wood",
    ratio: 1.2,
    get: [{id: "wood", val: 0.05, getmul: function(){
        m = 1;
        fsboost = 0.1;
        if (l.workshop.get("condensedfertiliser").bought){fsboost+=0.4}
        m += l.buildings.get("fertilisestation").num * fsboost;
        if (l.workshop.get("ironwoodjets").bought){m += l.buildings.get("waterbowl").num*l.buildings.get("raincol").num*0.01}
        return m;
    }}]
    },{
    name: "Traps",
    id: "trap",
    time: 10,
    basecost: [{id: "wood", val: 20}],
    prereq: {explore: ["plainscen"]},
    des: "Traps animals to collect raw meat",
    ratio: 1.3,
    get: [{id: "rawmeat", val: 0.001, getmul: function(){
        m = 1;
        m += l.buildings.get("fertilisestation").num * 0.01;
        if (l.workshop.get("fishtraps").bought){m += 1}
        return m;
    }}]
    },{
    id: "bonfire",
    time: 10,
    basecost: [{id: "wood", val: 100}],
    prereq: {explore: ["plainscen"]},
    des: "Roast animal meat automatically",
    convert: true,
    ratio: 1.5,
    change: [{id: "rawmeat", val: 0.01}, {id: "wood", val: 0.1}],
    get: [{id: "cookedmeat", val: 0.01},{id: "coal", val: 0.0001, getmul: function(){
        m = 0;
        if (l.workshop.get("coalbonfires").bought){m += 1}
        return m;
    }}]
    },{
    name: "Fertiliser station",
    id: "fertilisestation",
    time: 30,
    basecost: [{id: "wood", val: 20},{id: "cookedmeat", val: 5}],
    prereq: {explore: ["jungle"], res: ["cookedmeat"]},
    des: "Build a fertiliser station. These boost effects of some other buildings (notably wood farms)",
    ratio: 1.2
    },{
    name: "Waterstream",
    id: "waterstream",
    time: 20,
    basecost: [{id: "wood", val: 100}],
    prereq: {res: ["ore"]},
    des: "Divert water into a rock surface, thus hammering away at it and extracting ores",
    convert: true,
    ratio: 1.2,
    change: [{id: "water", val: 1}],
    get: [{id: "ore", val: 0.02}],
    getallmul: function(){
        var m = 1;
        if (l.workshop.get("ironwoodjets").bought){m += l.buildings.get("waterbowl").num*l.buildings.get("raincol").num*0.005}
        return m;
    }
    },{
    id: "smelter",
    time: 30,
    basecost: [{id: "wood", val: 500}],
    prereq: {res: ["ore"]},
    des: "Convert ores to the minerals",
    convert: true,
    ratio: 1.2,
    change: [{id: "wood", val: 1}, {id: "ore", val: 1}],
    get: [{id: "iron", val: 0.01, getmul: function(){
        var mul = 1;
        if (l.workshop.get("smelterpipes").bought){mul += 2}
        return mul;
    }},{id: "graphite", val: 0.01,
    getmul: function(){
        var m = 0;
        if (l.workshop.get("graphitesmelters").bought){m += 1}
        return m;
    }}]
    },{
    name: "Carbon storage",
    id: "carbonstorage",
    time: 100,
    basecost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "One of the only storages possible for pure carbon",
    ratio: 1.1,
    get: [{id: "carbonCap", val: 1}]
    },{
    name: "Carbon purifier",
    id: "carboner",
    time: 100,
    basecost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Smelt almost anything carbon-based to pure carbon",
    convert: true,
    ratio: 1.1,
    change: [{id: "coal", val:0.01},{id: "graphite",val: 0.1}],
    get: [{id: "carbon", val: 0.01}]
    },{
    name: "Ranger station",
    id: "rangerstation",
    time: 40,
    basecost: [{id: "wood", val: 200},{id: "iron", val: 20}],
    prereq: {res: ["iron"]},
    des: "Stock up a station far out in the forests to provide a variety of benefits",
    ratio: 1.5,
    get: [
        {id: "wood", val: 0.2},
        {id: "water", val: 0.3},
        {id: "rawmeat", val: 0.0005},
        {id: "waterCap", val: 50},
        {id: "woodCap", val: 50},
        {id: "ironCap", val: 10},
        {id: "graphiteCap", val: 1}
    ],
    getallgetmul: function(){
        m = 1;
        if (l.workshop.get("woodplanksheds").bought){m += 1}
        return m;
    }
    },{
    id: "plankstorage",
    time: 10,
    basecost: [{id: "woodplank", val: 25}],
    prereq: {workshop: ["woodplanksheds"]},
    des: "Build a basic storage using wooden planks, for wood",
    addRatio: 0.3,
    get: [
        {id: "waterCap", val: 50},
        {id: "woodCap", val: 300},
        {id: "ironCap", val: 5},
        {id: "oreCap", val: 5},
        {id: "rawmeatCap", val: 5},
        {id: "cookedmeatCap", val: 5},
        {id: "coalCap", val: 5}
    ],
    getallgetmul: function(){
        m = 1;
        if (l.workshop.get("plainsheds").bought){m += 1}
        if (l.workshop.get("ironsheds").bought){m += 1}
        if (l.workshop.get("steelsheds").bought){m += 5}
        return m;
    }
    },{
    id: "furnace",
    time: 60,
    basecost: [{id: "iron", val: 25}],
    prereq: {explore: ["lavacave2"]},
    des: "Craft steel from iron and coal",
    convert: true,
    ratio: 1.2,
    change: [{id: "iron", val: 0.1}, {id: "carbon", val: 0.01}],
    get: [{id: "steel", val: 0.001}]
    }
];

l.buildings.setup = function(){
    for (var i in this.list){
        if (!this.list[i].name){this.list[i].name=this.list[i].id.charAt(0).toUpperCase() + this.list[i].id.slice(1)}
        if (this.list[i].cost === undefined){this.list[i].cost = []}
        if (this.list[i].vis === undefined){this.list[i].vis = false}
        if (this.list[i].num === undefined){this.list[i].num = 0}
        if (this.list[i].bought === undefined){this.list[i].bought = false}
        if (this.list[i].prereq === undefined){this.list[i].prereq = []}
        if (this.list[i].ratio === undefined){this.list[i].ratio = 2}
        if (this.list[i].convert === undefined){this.list[i].convert = false}
        if (this.list[i].numon === undefined){this.list[i].numon = this.list[i].num}
        this.list[i].basetime = this.list[i].time;
        this.list[i].timemul = 1;
        this.list[i].settime = function(){
            this.time = this.basetime/(this.timemul*l.buildings.globalspeedboost);
        }
        if (this.list[i].convert){
            this.list[i].turnon = function(number){
                this.numon += number;
                if (this.numon<0){this.numon = 0}
                if (this.numon>this.num){this.numon = this.num}
                l.updateall();
            }
            this.list[i].checktoturnoff = function(){
                abletorun = true;
                for (var i in this.change){
                    if (l.res.get(this.change[i].id).num<this.change[i].val*this.numon){
                        abletorun = false;
                        this.numon = 0;
                    }
                }
            }
        }
        this.list[i].checkprereq = function(){
            var unlocked = true;
            if (this.prereq.explore){
                for (var j in this.prereq.explore){
                    if (!l.explore.get(this.prereq.explore[j]).bought){unlocked = false}
                }
            }
            if (this.prereq.res){
                for (var j in this.prereq.res){
                    if (l.res.get(this.prereq.res[j]).num==0){unlocked = false}
                }
            }
            if (this.prereq.workshop){
                for (var j in this.prereq.workshop){
                    if (!l.workshop.get(this.prereq.workshop[j]).bought){unlocked = false}
                }
            }
            if (unlocked){this.vis = true};
        }
        this.list[i].updatecost = function(){
            this.updcostmultiplier();
            this.cost = [];
            for (j in this.basecost){
                var x = new Object();
                x.id = this.basecost[j].id;
                x.name = l.res.get(this.basecost[j].id).name;
                x.val = this.basecost[j].val*this.costmul;
                x.mul = 1;
                this.cost.push(x)
            }
        }
        this.list[i].costmul = 1;
        this.list[i].updcostmultiplier = function(){
            if (this.ratio){this.costmul = Math.pow(this.ratio,this.num)}
            if (this.addRatio){this.costmul = this.addRatio*this.num+1}
        }
        for (var j in this.list[i].get){
            this.list[i].get[j].baseval = this.list[i].get[j].val;
            this.list[i].get[j].mul = 1;
            if (this.list[i].get[j].getmul === undefined){
                this.list[i].get[j].getmul = function(){return 1}
            }
        }
        for (var j in this.list[i].change){
            this.list[i].change[j].baseval = this.list[i].change[j].val;
            this.list[i].change[j].mul = 1;
            if (this.list[i].change[j].getmul === undefined){
                this.list[i].change[j].getmul = function(){return 1}
            }
        }
        this.list[i].updgetmul = function(){
            this.allgetmul = this.getallgetmul();
            for (var j in this.get){
                this.get[j].mul = this.get[j].getmul();
                this.get[j].val = this.get[j].baseval*this.get[j].mul*this.allgetmul*this.allmul;
            }
        }
        this.list[i].timemul = 1;
        this.list[i].allgetmul = 1;
        if (this.list[i].getallgetmul === undefined){
            this.list[i].getallgetmul = function(){return 1}
        }
        this.list[i].allchangemul = 1;
        if (this.list[i].getallchangemul === undefined){
            this.list[i].getallchangemul = function(){return 1}
        }
        this.list[i].allmul = 1;
        if (this.list[i].getallmul === undefined){
            this.list[i].getallmul = function(){return 1}
        }
        this.list[i].updchangemul = function(){
            this.allchangemul = this.getallchangemul();
            for (var j in this.change){
                this.change[j].mul = this.change[j].getmul();
                this.change[j].val = this.change[j].baseval*this.change[j].mul*this.allchangemul*this.allmul;
            }
        }
    }
}

l.buildings.updateall = function(){
    l.buildings.updgetchangemul();
    l.buildings.updateallcost();
    l.buildings.globalspeedboost = l.buildings.getspeedboost();
    l.buildings.updtimes();
}

l.buildings.updgetchangemul = function(){
    for (var i in this.list){
        this.list[i].allmul = this.list[i].getallmul();
        this.list[i].updgetmul();
        this.list[i].updchangemul();
    }
}

l.buildings.updtimes = function(){
    for (var i in this.list){
        if (this.list[i].settimemul){this.list[i].settimemul()}
        this.list[i].settime();
    }
}

l.buildings.turnoffs = function(){
    for (var i in this.list){
        if (this.list[i].convert){
            this.list[i].checktoturnoff();
        }
    }
}

l.buildings.get = function(name){
    for (var i in this.list){
        if (this.list[i].id == name){return this.list[i];}
    }
    return undefined;
}

l.buildings.updateallprereq = function(){
    for (var i in this.list){
        this.list[i].checkprereq();
    }
}

l.buildings.updateallcost = function(){
    for (var i in this.list){
        this.list[i].updatecost();
    }
}

l.buildings.cur = null;
l.buildings.do = function(id){
    x = this.get(id);
    l.jobs.queuejob(x,"building");
    l.topbarjoblooks();
}

l.buildings.finished = function(id){
    item = l.buildings.get(id);
    if (item.numon==item.num){
        item.numon++;
    }
    item.num++;
    item.updatecost();
    l.jobs.cur = null;
    if (item.log){
        l.log(item.log);
    } else {
        l.log("Built a "+item.name.charAt(0).toLowerCase() + item.name.slice(1));
    }
    l.updateall();
}

l.buildings.globalspeedboost = 1;
l.buildings.getspeedboost = function(){
    var sb = 1;
    if (l.workshop.get("woodtools").bought){sb=1.1};
    if (l.workshop.get("woodtools2").bought){sb=1.2};
    if (l.workshop.get("irontools").bought){sb=1.4};
    if (l.workshop.get("ironhammers").bought){sb=3};
    return sb;
}

l.buildingdrawtooltip = function(index){
    var x = document.getElementById("buildingcontainer"+index);
    var stats = x.getBoundingClientRect();
    var top = stats.top;
    var left = stats.left+stats.width+5;
    l.drawtooltip(top,left,"building",l.buildings.list[index].id);
    //console.log('here')
}

//draw the buildings
l.buildings.draw = function(){
    l.buildings.updateallprereq();
    x = document.getElementById("maingame");
    x.innerHTML = "";
    for (var i in this.list){
        if (this.list[i].vis){
            x.innerHTML += "<div id='buildingcontainer"+i+"' class='buildingcontainer' onmouseleave='l.hidetooltip()' onmouseenter='l.buildingdrawtooltip("+i+")'><div class='buildingitem' id='building"+this.list[i].id+"' onclick = 'l.buildings.do(\""+this.list[i].id+"\")'></div></div>";
            if (this.list[i].convert){
                toadd = "<div class='convertbuttons'><button onclick='l.buildings.list["+i+"].turnon(1)' class='buildingAmount'>[+]</button><button onclick='l.buildings.list["+i+"].turnon(-1)' class='buildingAmount'>[-]</button><div>";
                document.getElementById("buildingcontainer"+i).innerHTML += toadd;
                adder = l.display(this.list[i].numon)+"/";
            } else {adder=""};
            y = document.getElementById("building"+this.list[i].id);
            y.innerHTML += "<div class='buildingitemtitle'>"+this.list[i].name+"  ("+adder+l.display(this.list[i].num)+")</div>";
            y.innerHTML += "<div class='buildingitemtime'>Time: "+l.display(this.list[i].time)+"</div>";
            costgrid = "";
            for (var j in this.list[i].cost){
                costgrid += "<div class='jobitemcostitem'>"+this.list[i].cost[j].name+": "+l.display(this.list[i].cost[j].val*this.list[i].cost[j].mul)+"</div>";
            }
            if (costgrid!==""){y.innerHTML += "<div class='buildingitembox buildingitemcostgrid'><div class='buildingitemlistcaption'>Cost:</div>"+costgrid+"</div>";}
            y.innerHTML += "<div class='buildingitemdes'>"+this.list[i].des+"</div>";
        }
    }
}


