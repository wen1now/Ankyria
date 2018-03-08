l.workshop = new Object();

l.workshop.list = [{
    name: "Twin buckets",
    id: "twinbuckets",
    time: 20,
    cost: [{id: "wood", val: 20},{id: "water", val: 10}],
    prereq: {explore: ["forest"]},
    des: "Put buckets on logs. Now you can carry more at once.",
    log: "It was tough work; now I can carry more water at once."
    },{
    name: "Walking stick",
    id: "walkingstick",
    time: 40,
    cost: [{id: "wood", val: 150}],
    prereq: {explore: ["forest"]},
    des: "Try to chop wood into the perfect walking stick.",
    log: "Well, I used up a lot of wood until I finally made the perfect walking stick."
    },{
    name: "Wooden pickaxe",
    id: "woodpick",
    time: 150,
    cost: [{id: "wood", val: 350}],
    prereq: {explore: ["deepforest","deepdesert"]},
    des: "Make a pickaxe to mine some of those ores from the mine",
    log: "Time to get mining!"
    },{
    name: "Wooden hatchet",
    id: "woodhatchet",
    time: 200,
    cost: [{id: "wood", val: 300}],
    prereq: {explore: ["deepforest"]},
    des: "Make a wooden hatchet to make the going just that little bit easier",
    log: "This hatchet is great! I can now clear paths in no time"
    },{
    name: "Lightweight spears",
    id: "lightspears",
    time: 200,
    cost: [{id: "wood", val: 300}],
    prereq: {explore: ["deepforest"]},
    des: "Make lightweight spears for larger hunting bonuses",
    log: "Hunting will be faster and better"
    },{
    name: "Leaf collecter",
    id: "leafcol",
    time: 100,
    cost: [{id: "wood", val: 500}],
    prereq: {explore: ["deepforest"]},
    des: "Leaves make building rain collecters faster and improves collection area",
    log: "I'll just go gather some leaves for my rain collecter..."
    },{
    name: "Meatball sandwich",
    id: "meatballmain",
    time: 200,
    cost: [{id: "cookedmeat", val: 50}],
    prereq: {res: ["cookedmeat"]},
    des: "Invent the meatball sandwich! This gives great energy over long distances",
    log: "This sandwich will allow me to cut down on time and water for long-distance journeys"
    },{
    name: "Meatball snack",
    id: "meatballsnack",
    time: 200,
    cost: [{id: "cookedmeat", val: 100}, {id: "water", val: 3500}],
    prereq: {res: ["cookedmeat"]},
    des: "Invent the meatball snack! This gives jobs greater energy boosts",
    log: "Jobs now give greater rewards, yay!"
    },{
    name: "Salami burger",
    id: "salamimain",
    time: 800,
    cost: [{id: "cookedmeat", val: 150}],
    prereq: {workshop: ["meatballsnack","meatballmain"]},
    des: "Invent the salami burger! This gives massive energy over increased distances",
    log: "Wow, these are tasty! I'm sure I can last longer on these"
    },{
    name: "Salami bite",
    id: "salamisnack",
    time: 800,
    cost: [{id: "cookedmeat", val: 200}, {id: "water", val: 8500}],
    prereq: {workshop: ["meatballsnack","meatballmain"]},
    des: "Invent salami bites! These morsels can give massive energy",
    log: "Jobs now give even greater rewards, yay!"
    },{
    name: "Plain sheds",
    id: "plainsheds",
    time: 300,
    cost: [{id: "wood", val: 1000},{id: "water", val: 3000}],
    prereq: {explore: ["plainscen"]},
    des: "Build larger sheds on the plains instead of at home",
    log: "Hiked out and set up a work area for making sheds"
    },{
    name: "Smelter piping",
    id: "smelterpipes",
    time: 300,
    cost: [{id: "wood", val: 1000}],
    prereq: {res: ["ore"]},
    des: "Build crude piping for smelters, thus improving smelter efficiency",
    log: "Upgraded smelters"
    },{
    name: "Iron sheds",
    id: "ironsheds",
    time: 300,
    cost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Infuse some iron into those sheds to bump up storage amount (sheds will not cost iron)",
    log: "Infusation successful; sheds are now iron-inforced"
    },{
    name: "Iron tipped axes",
    id: "ironaxes",
    time: 300,
    cost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Infuse axes with iron; this will make axes last longer and be stronger",
    log: "Infusation successful; axes will be more or less triple speed"
    },{
    name: "Iron buckets",
    id: "ironbuckets",
    time: 300,
    cost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Make buckets out of iron; this will make them larger and carry more",
    log: "Bucketation successful; buckets will carry bundles more water"
    },{
    name: "Iron pickaxes",
    id: "ironpicks",
    time: 300,
    cost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Infuse pickaxes with iron; this will allow them to be sturdier and stronger",
    log: "Infusation successful; pickaxes are stronger than ever before - but they don't seem to give much more iron"
    },{
    name: "Iron tools",
    id: "irontools",
    time: 300,
    cost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Infuse workshop tools with iron; make tools faster",
    log: "Infusation successful; workshop times are faster"
    },{
    name: "Iron hammers",
    id: "ironhammers",
    time: 300,
    cost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Infuse building tools with iron; make building buildings faster",
    log: "Infusation successful; buildins times are faster"
    },{
    name: "Iron stick",
    id: "ironstick",
    time: 300,
    cost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Make an iron stick to walk further, faster",
    log: "Building successful; I can now walk faster"
    },{
    name: "Iron tipped spears",
    id: "ironspears",
    time: 300,
    cost: [{id: "iron", val: 10}],
    prereq: {res: ["iron"]},
    des: "Make iron spears to take down bigger game",
    log: "Iron tipped spears are ready!"
    },{
    name: "Iron bowls",
    id: "ironbowls",
    time: 1000,
    cost: [{id: "iron", val: 50}],
    prereq: {minres: [{id: "iron", val:30}]},
    des: "Infuse bowls with iron to give an additive boost to rain collectors",
    log: "Water bowls are now help rain collectors collect water"
    },{
    name: "Iron/wood jets",
    id: "ironwoodjets",
    time: 1200,
    cost: [{id: "iron", val: 80}],
    prereq: {minres: [{id: "iron", val:50}]},
    des: "Add a network of iron and wood pipes to connect all water things together",
    log: "Connected bowls, rain collectors, waterstreams and wood farms"
    },{
    name: "Fish traps",
    id: "fishtraps",
    time: 300,
    cost: [{id: "rawmeat", val: 30}],
    prereq: {explore: ["nearlake"]},
    des: "Bait fishies with meat to get more meat",
    log: "Rigged up the lake with fish nets! Now traps gives more meat"
    },{
    name: "Coal bonfires",
    id: "coalbonfires",
    time: 300,
    cost: [{id: "iron", val: 20}],
    prereq: {explore: ["coalcave"]},
    des: "Extract coal from bonfires with new iron pokers",
    log: "Now smelters are providing a feeble coal boost"
    },{
    name: "Coal torches",
    id: "coaltorches",
    time: 200,
    cost: [{id: "coal", val: 50}],
    prereq: {explore: ["coalcave"]},
    des: "Coal torches last longer than before",
    log: "Yay! Now I waste way less time making torches, which means more time for mining"
    },{
    id: "torchholders",
    time: 250,
    cost: [{id: "coal", val: 50},{id: "wood", val: 1000}],
    prereq: {workshop: ["coaltorches"]},
    des: "Torch holders free both hands for mining",
    log: "Yes, now mining will be faster and more productive"
    },{
    name: "Graphite smelters",
    id: "graphitesmelters",
    time: 1000,
    cost: [{id: "iron", val: 20}],
    prereq: {minres: [{id: "iron", val:10}]},
    des: "Teach your smelters to extract graphite",
    log: "Now I should also be gaining graphite..."
    },{
    name: "Reinforced sheds",
    id: "woodplanksheds",
    time: 500,
    cost: [{id: "woodplank", val: 20}],
    prereq: {res: ["woodplank"]},
    des: "Use wooden planks to gain extra space for sheds",
    log: "Sheds have been further reinforced."
    },{
    name: "Boats",
    id: "researchboats",
    type: "research",
    time: 20000,
    prereq: {res: ["woodplank"]},
    des: "Research boats for enhanced fishing techniques",
    log: "Yay I can construct boats now!"
    }
]

l.workshop.setup = function(){
    for (var i in this.list){
        if (!this.list[i].name){this.list[i].name=this.list[i].id.charAt(0).toUpperCase() + this.list[i].id.slice(1);};
        if (this.list[i].cost === undefined){this.list[i].cost = []};
        if (this.list[i].vis === undefined){this.list[i].vis = false};
        if (this.list[i].bought === undefined){this.list[i].bought = false};
        if (this.list[i].prereq === undefined)(this.list[i].prereq = []);
        if (this.list[i].type === undefined)(this.list[i].type = "craft");
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
            if (this.prereq.minres){
                for (var j in this.prereq.minres){
                    if (l.res.get(this.prereq.minres[j].id).num<this.prereq.minres[j].val){unlocked = false}
                }
            }
            if (this.prereq.workshop){
                for (var j in this.prereq.workshop){
                    if (!l.workshop.get(this.prereq.workshop[j]).bought){unlocked = false}
                }
            }
            if (unlocked){this.vis = true};
        }
        for (var j in this.list[i].cost){
            this.list[i].cost[j].mul = 1;
            this.list[i].cost[j].name = l.res.get(this.list[i].cost[j].id).name;
        }
    }
}

l.workshop.updateall = function(){
    l.workshop.updateallprereq();
    l.workshop.globalspeedboost = l.workshop.getspeedboost();
}

l.workshop.get = function(name){
    for (var i in this.list){
        if (this.list[i].id == name){return this.list[i];}
    }
    return undefined;
}

l.workshop.updateallprereq = function(){
    for (var i in this.list){
        this.list[i].checkprereq();
    }
}

l.workshop.cur = null;
l.workshop.do = function(id){
    l.workshop.globalspeedboost = l.workshop.getspeedboost();
    x = this.get(id);
    x.time /= l.workshop.globalspeedboost;
    if (!x.bought){
        l.jobs.cur = x;
        l.jobs.time = x.time;
        l.jobs.cur.type = "workshop";
        this.cur = id;
    }
    l.topbarjoblooks();
}

l.workshop.finished = function(id){
    item = l.workshop.get(id);
    item.bought = true;
    l.jobs.cur = null;
    //unnecessary? l.explore.calcglobalspeedboost();
    if (item.log){
        l.log(item.log);
    } else {
        l.log("I researched "+item.name+" today.");
    }
    l.updateall();
}

l.workshop.globalspeedboost = 1;
l.workshop.getspeedboost = function(){
    var sb = 1;
    if (l.workshop.get("irontools").bought){sb+=1};
    return sb;
}

//draw the workshop
l.workshop.draw = function(){
    l.workshop.updateallprereq();
    x = document.getElementById("maingame");
    x.innerHTML = "";
    for (var i in this.list){
        if ((this.list[i].vis) && !(this.list[i].bought)){
            x.innerHTML += "<div class='workshopitem' id='workshop"+this.list[i].id+"' onclick = 'l.workshop.do(\""+this.list[i].id+"\")'></div>";
            y = document.getElementById("workshop"+this.list[i].id);
            y.innerHTML += "<div class='workshopitemtitle'>"+this.list[i].name+"</div>";
            y.innerHTML += "<div class='workshopitemtime'>Time: "+l.display(this.list[i].time/l.workshop.globalspeedboost)+"</div>";
            costgrid = "";
            for (var j in this.list[i].cost){
                costgrid += "<div class='jobitemcostitem'>"+this.list[i].cost[j].name+": "+(this.list[i].cost[j].val*this.list[i].cost[j].mul)+"</div>";
            }
            if (costgrid!==""){y.innerHTML += "<div class='workshopitembox workshopitemcostgrid'><div class='workshopitemlistcaption'>Cost:</div>"+costgrid+"</div>";}
            y.innerHTML += "<div class='workshopitemdes'>"+this.list[i].des+"</div>";
        }
    }
}









