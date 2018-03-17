//shuttlestuff and resourcestuff
//RESOURCE STUFF FIRST!
l.res = new Object();
l.res.list = [{
    id: "water",
    des: "Good old H20",
    col: "blue",
    vis: true,
    num: 100,
    capped: true,
    basecap: 1000
    },{
    id: "wood",
    des: "Sturdy beam of wood",
    capped: true,
    basecap: 100
    },{
    name: "Wooden planks",
    id: "woodplank",
    des: "Sturdy building material",
    shortname: "W planks"
    },{
    id: "rawmeat",
    name: "Raw meat",
    des: "A chunk of raw meat",
    capped: true
    },{
    id: "cookedmeat",
    name: "Cooked meat",
    des: "Cooked meat, ready to eat",
    capped: true,
    shortname: "C meat"
    },{
    id: "spear",
    des: "Spear for hunting animals"
    },{
    id: "ore",
    des: "Some kind of ore, no idea what it is",
    capped: true
    },{
    id: "coal",
    des: "Coal, kind of a fuel",
    capped: true
    },{
    id: "graphite",
    des: "Graphite is extremely soft, unpurified carbon",
    capped: true
    },{
    id: "carbon",
    des: "Pure carbon. Extremely useful",
    capped: true
    },{
    id: "iron",
    des: "Sturdy building material",
    capped: true
    },{
    id: "steel",
    des: "Extremely strong, lightweight metal"
    }
]

l.res.setup = function(){
    for (var i in this.list){
        if (!this.list[i].name){this.list[i].name=this.list[i].id.charAt(0).toUpperCase() + this.list[i].id.slice(1);}
        if (!this.list[i].col){this.list[i].col="#000000"}
        if (this.list[i].vis===undefined){this.list[i].vis=false}
        if (this.list[i].num===undefined){this.list[i].num = 0}
        if (this.list[i].ed===undefined){this.list[i].ed = false}
        if (this.list[i].capped===undefined){this.list[i].capped = false}
        if (this.list[i].shortname===undefined){this.list[i].shortname = this.list[i].name}
        if (this.list[i].basecap===undefined){this.list[i].basecap = 0}
        if (this.list[i].capped){
            if (this.list[i].setcap===undefined){
                this.list[i].setcap = function(){
                    cap = this.basecap;
                    for (var j in l.buildings.list){
                        if (l.buildings.list[j].get){
                            for (var k in l.buildings.list[j].get){
                                if (l.buildings.list[j].get[k].id == this.id+"Cap"){
                                    cap += l.buildings.list[j].get[k].val*l.buildings.list[j].num;
                                }
                            }
                        }
                    }
                    this.cap = cap;
                    //add stuff here for buildings which add cap, etc.
                }
            }
        } else {
            this.list[i].setcap = function(){return;}
        }
        this.list[i].checkvis = function(){
            if (this.num>0){this.vis = true};
        }
        this.list[i].quickvis=false;
        this.list[i].togquickvis = function(){
            this.quickvis = !this.quickvis;
        }
        this.list[i].setgain = function(){
            var gain = 0; oldgain = this.gain;
            for (var j in l.buildings.list){
                if (l.buildings.list[j].get){
                    for (var k in l.buildings.list[j].get){
                        if (l.buildings.list[j].get[k].id == this.id){
                            gain += l.buildings.list[j].get[k].val*l.buildings.list[j].numon;
                        }
                    }
                }
                if (l.buildings.list[j].change){
                    for (var k in l.buildings.list[j].change){
                        if (l.buildings.list[j].change[k].id == this.id){
                            gain -= l.buildings.list[j].change[k].val*l.buildings.list[j].numon;
                        }
                    }
                }
            }
            this.gain = gain;
            if (gain!=oldgain && l.tabs.curtab=="shuttle"){
                l[l.tabs.curtab].draw();
            }
        }
        this.list[i].get = function(amount){
            if (this.capped && (amount>0)){
                if (this.num<this.cap){
                    this.num += amount;
                    if (this.num>this.cap){
                        this.num = this.cap;
                    }
                }
            } else {
                this.num += amount;
                if (this.num<0){this.num = 0};
            }
        }
    }
}

l.res.checkallvis = function(){
    for (var i in this.list){
        this.list[i].checkvis();
    }
}

l.res.setallgain = function(){
    for (var i in this.list){
        this.list[i].setgain();
    }
}

l.res.setallcaps = function(){
    for (var i in this.list){
        if (this.list[i].capped){
            this.list[i].setcap();
        }
    }
}

l.res.getresources = function(tick){
    for (var i in this.list){
        l.buildings.turnoffs();
        this.list[i].setgain();
        this.list[i].setcap();
        this.list[i].get(this.list[i].gain);
    }
}

l.res.get = function(id){
    for (var i in this.list){
        if (this.list[i].id == id){return this.list[i]}
    }
    return undefined;
}

l.res.update = function(){
    l.res.checkallvis();
    for (var i in l.res.list){
        if (l.res.list[i].vis){
            try {
                document.getElementById("shuttleNumof"+l.res.list[i].id).innerHTML = l.display(l.res.list[i].num);
            } catch(err){l.shuttle.draw()};
        }
    }
}

l.sidebarUpdate = function(){
    l.res.checkallvis();
    for (var i in l.res.list){
        if (l.res.list[i].vis){
            try {
                document.getElementById("sidebarNumof"+l.res.list[i].id).innerHTML = l.display(l.res.list[i].num);
            } catch(err){l.sidebarDraw()};
        }
    }
}

//==============================================
//shuttlestuff
l.shuttle = new Object();
l.shuttle.draw = function(){
    document.getElementById("maingame").innerHTML = "<div id='shuttleReslist'><div id='shuttleReslistTitle'>Resources:</div></div>";
    x = document.getElementById("shuttleReslist");
    for (var i in l.res.list){
        if (l.res.list[i].vis){
            toadd = "<div class='shuttleReslistItem'>";
            toadd += "<div class='shuttleReslistName'>"+l.res.list[i].name+": </div>";
            toadd += "<div class='shuttleReslistNum' id='shuttleNumof"+l.res.list[i].id+"'>"+l.display(l.res.list[i].num)+"</div>";
            if (l.res.list[i].capped){
                toadd += "<div class='shuttleReslistCap' id='shuttleCapof"+l.res.list[i].id+"'>/ "+l.display(l.res.list[i].cap)+"</div>";
            } else {toadd += "<div class='shuttleReslistCap'></div>"}
            if (l.res.list[i].gain>0){sign = "+"} else {sign=""}
            toadd += "<div class='shuttleReslistGain' id='shuttleGainof"+l.res.list[i].id+"'>"+sign+" "+l.display(l.res.list[i].gain)+"</div>";
            toadd += "<div class='shuttleReslistGainTime'>/sec</div>";
            toadd += "</div>";
            x.innerHTML+=toadd;
        }
    }
}

l.sidebarDraw = function(){
    document.getElementById("sidebar").innerHTML = "<div id='sidebarReslist'></div>";
    x = document.getElementById("sidebarReslist");
    for (var i in l.res.list){
        if (l.res.list[i].vis){
            if (l.res.list[i].capped){
            x.innerHTML+="<div class='sidebarReslistItem'><div class='sidebarReslistName'>"+l.res.list[i].shortname+": </div><div class='sidebarReslistNum' id='sidebarNumof"+l.res.list[i].id+"'>"+l.display(l.res.list[i].num)+"</div><div class='sidebarReslistCap' id='sidebarCapof"+l.res.list[i].id+"'>/ "+l.display(l.res.list[i].cap)+"</div></div>";
            } else {
            x.innerHTML+="<div class='sidebarReslistItem'><div class='sidebarReslistName'>"+l.res.list[i].shortname+": </div><div class='sidebarReslistNum' id='sidebarNumof"+l.res.list[i].id+"'>"+l.display(l.res.list[i].num)+"</div></div>";
            }
        }
    }
}







