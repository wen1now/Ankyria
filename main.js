/*Stuffs:
NAME: what the USER sees
ID: what the game uses, THIS is the important one
vis: visible, store as BOOLEAN
bought: USE on basically every UPGRADE, EXPLORE etc.
-----------------------------------------------------
Other important messages go here

-----------------------------------------------------
TODO:
- Jobs; make the game semi-playable at least
- Add resource stuff, automatic resource adding and stuff
*/

//--------------------------------------------------
l.draw = function(){//basically load the game to look like what it's supposed to,
                    //with the log and tabs and stuff.
    var x;
    x=document.getElementById("gameContainer");
    x.innerHTML = "<div id='topbar'></div><div id='logCont'><div id='logHead'>Log</div><div id='log'></div></div> <div id='middle'><div id='tabbar'></div><div id='maingame'></div></div><div id='sidebar'></div>";
    x.innerHTML += "<div id='exportbox' class='exportbox'><div>Copy the following text:</div><textarea id='exporttext'></textarea><button onclick='l.export()' class='closepopup'>X</button></div>";
    x.innerHTML += "<div id='importbox' class='exportbox'><div>Paste into the following box</div><textarea id='importtext'></textarea><button onclick='l.import()'>Import</button><button onclick='l.importtoggle()' class='closepopup'>X</button></div>";
    x.innerHTML += "<div id='tooltip'></div>"
    l.logstuff.update();
    l.tabs.draw();
    l.calendar.draw();
    l.options.icodraw();
    var y;
    y = document.getElementById('topbar');
    y.innerHTML += "<div id='notenoughwarning' opacity>Not enough resources for your current job!</div>";
    document.getElementById("notenoughwarning").style.opacity = "0";
}

//--------------------------------------------------
//tab-related stuff, e.g. initialise the tab things
l.tabs = new Object();
l.tabs.list = [[{
    name: "Shuttle",
    des: "Go back to your shuttle landing site. View resources here",
    link: "shuttle",
    vis: true
    },{
    name: "Exploration",
    des: "Explore your surroundings.",
    link: "explore",
    vis: true
    },{
    name: "Jobs",
    des: "Mostly gather resources for yourself to use",
    link: "jobs",
    checkprereq: function(){
        if (l.explore.get("east").bought){this.vis = true}
    }
    },{
    name: "Workshop",
    des: "Build yourself some tools to use",
    link: "workshop",
    checkprereq: function(){
        if (l.explore.get("forest").bought){this.vis = true}
    }
    },{
    name: "Buildings",
    des: "Build yourself some buildings",
    link: "buildings",
    checkprereq: function(){
        if (l.explore.get("forest").bought){this.vis = true}
    }
    }]
]

l.tabs.setup = function(){
    for (var i in this.list){
        for (var j in this.list[i]){
            if (this.list[i][j].vis === undefined){this.list[i][j].vis = false};
            this.list[i][j].settab = function(){
                if (l.playing){
                    l.tabs.curtab = this.link;
                    l[this.link].draw();
                }
            }
        }
    }
}

l.tabs.metatabs = new Object();
l.tabs.metalist = [
    {
    name: "General",
    des: "Generalities",
    link: "shuttle",
    vis: true
    },{
    name: "Population",
    des: "Popularities",
    link: "population",
    vis: false
    }
]

l.tabs.metatabs.setup = function(){
    for (var i in this.metalist){
        if (this.metalist[i].vis === undefined){this.metalist[i].vis = false};
        this.metalist[i].settab = function(){
            if (l.playing){
                document.getElementById("maingame").innerHTML = "";
            }
        }
    }
}

l.tabs.draw = function(){
    document.getElementById("tabbar").innerHTML = "<div class='tabbars' id='metatabbar'></div><div class='tabbars' id='normaltabbar'></div>";
    x=document.getElementById("metatabbar");
    if (l.tabs.metatabs.vis){
        for (var i in selected_list){
            if (selected_list[i].vis){
                x.innerHTML+="<div><button class='tabBut' onclick='l.tabs.list["+i+"].settab()'>"+this.list[i].name+"</button></div>";
            }
        }
    }
    x=document.getElementById("normaltabbar");
    x.innerHTML = "";
    meta_number = 0;//change this later
    selected_list = l.tabs.list[meta_number];
    for (var i in selected_list){
        if (selected_list[i].vis){
            x.innerHTML+="<div><button class='tabBut' onclick='l.tabs.list["+meta_number+"]["+i+"].settab()'>"+selected_list[i].name+"</button></div>";
        }
    }
}

l.tabs.checkprereq = function(){
    for (var i in this.list){
        for (var j in this.list[i]){
            if (this.list[i][j].checkprereq){this.list[i][j].checkprereq()} else {this.list[i][j].vis = true}
        }
    }
    l.tabs.draw();
}

//--------------------------------------------------
//log stuff and function
l.logstuff = new Object();
l.logstuff.logged = "";
l.logstuff.update = function(){
    document.getElementById("log").innerHTML=this.logged;
}

var stuffs;
l.log = function(stuffs){
    l.logstuff.logged = "<div class='logtimestamp'>"+l.calendar.timestamp() +"</div>" + stuffs + "<br>" + l.logstuff.logged;
    l.logstuff.update();
}

//--------------------------------------------------
//get stuff ready for user

l.displaysymbols = ["","K","M","G","T","P","E","Z","Y"];
l.display = function(input){
    if (typeof input !== "number"){return input;};
    var inputsign = 1;
    if (input==0){return 0;}
    if (input<1){
        if (input>=0.0005){
            return Math.floor(input*1000)/1000;
        } else {
            return "0.00..";
        }
    };
    var log1000 = Math.floor(Math.log10(input)/3);
    if (log1000>=0 && log1000<l.displaysymbols.length){
        var pow = 1000**log1000;
        var cut = Math.round(input*1000/pow)/1000;
        return cut*inputsign+l.displaysymbols[log1000];
    } else {
        var log10 = Math.floor(Math.log10(input));
        var pow = 10**log10;
        var cut = Math.round(input*10/pow)/10;
        return cut+'e+'+log10;
    } 
};


//--------------------------------------------------
//topbar stuff, jobs etc. etc.
l.topbarjoblooks = function(fromtick,onload){
    if (!document.getElementById("topbarjob")){document.getElementById("topbar").innerHTML += "<div id='topbarjob'></div><div id='topbarnextjob'></div>"}
    x = document.getElementById("topbarjob");
    if ((l.jobs.cur !== null && l.jobs.time == l.jobs.cur.time) || onload){
        if (l.jobs.cur.type == "normal"){
            x.innerHTML = l.jobs.cur.name;
        }
        if (l.jobs.cur.type == "explore"){
            x.innerHTML = "Exploring: "+l.jobs.cur.name;
        }
        if (l.jobs.cur.type == "workshop"){
            x.innerHTML = "Making: "+l.jobs.cur.name;
        }
        if (l.jobs.cur.type == "building"){
            x.innerHTML = "Building: "+l.jobs.cur.name;
        }
        if (!fromtick || !(l.jobs.cur.type == "normal")){
            l.timebar.restart(); //stop this running multiple times
        }
        x.innerHTML += "<div id='timebar'><div id='timedone'></div></div>";
    } else if (l.jobs.cur == null){
        document.getElementById("topbarjob").innerHTML = "";
    }
    x = document.getElementById("topbarnextjob");
    if (l.jobs.next != null){
        x.innerHTML = "Next job: "
        if (l.jobs.next.type == "normal"){
            x.innerHTML += l.jobs.next.name;
        }
        if (l.jobs.next.type == "explore"){
            x.innerHTML += "Exploring: "+l.jobs.next.name;
        }
        if (l.jobs.next.type == "workshop"){
            x.innerHTML += "Making: "+l.jobs.next.name;
        }
        if (l.jobs.next.type == "building"){
            x.innerHTML += "Building: "+l.jobs.next.name;
        }
        x.innerHTML += "<div id='canceljob' onclick='l.jobs.canceljob()'>Cancel current job</div>"
    } else {x.innerHTML = ""}
}

//timebar
l.timebar = new Object();

l.timebar.restart = function(w,redraw){
    l.timebar.job = l.jobs.cur.id;
    var finaltime = l.jobs.cur.time*40;
    if (!w){
        var width = 0;
    } else {
        var width = Math.round(finaltime-(finaltime * parseFloat(w)/100));
    }
    if (redraw){
        l.topbarjoblooks(true,true);
    }
    clearInterval(l.timebar.timer);
    l.timebar.timer = setInterval(frame, 25);
    function frame() {
        if (width == finaltime) {
            clearInterval(l.timebar.timer);
        } else {
            width++;
            try {document.getElementById("timedone").style.width = 100 - 100 * width/finaltime + "%";} catch(err){};
        }
    }
}

l.get = function(id){
    x = l.jobs.get(id);
    if (x){return x}
    x = l.workshop.get(id);
    if (x){return x}
    x = l.buildings.get(id);
    if (x){return x}
    x = l.explore.get(id);
    if (x){return x}
}

l.drawtooltip = function(top,left,type,id){
    var x = document.getElementById("tooltip");
    //console.log(top);  
    x.style.top = top+'px';
    x.style.left = left+'px';
    var tooltip = "";
    var temp = "";
    if (type=="building"){
        var t = l.buildings.get(id);
        tooltip += "<big>"+t.name+"</big>";
        for (var j in t.get){
            var cap = ""
            if (t.get[j].id.slice(-3)=="Cap"){
                cap = "cap";
                current = t.get[j].id.slice(0,-3)
            } else {current = t.get[j].id}
            var amount = t.get[j].val;
            if (l.res.get(current).vis && amount>0){
                temp += "<div>"+current+cap+": "+l.display(amount)+"</div>"
            }
        }
        if (temp !== ""){
            tooltip += "<div><b>Get</b></div>";
            tooltip += temp;
        }
        temp = "";
        if (t.convert){
            for (var j in t.change){
                var current = t.change[j].id;
                var amount = t.change[j].val;
                if (l.res.get(current).vis && amount>0){
                    temp += "<div>"+current+": -"+l.display(amount)+"</div>"
                }
            }
        }
        if (temp !== ""){
            tooltip += "<div><b>Convert</b></div>";
            tooltip += temp;
        }
        if (t.num==0){tooltip = "<big>"+t.name+"</big>"}
    }
    x.innerHTML = tooltip;
    x.style.visibility = "visible";
}

l.hidetooltip = function(){
    document.getElementById("tooltip").style.visibility = "hidden";
}

//--------------------------------------------------
//temporary stuff that gets tested now
l.start = function(){
    l.res.setup();
    l.explore.setup();
    l.jobs.setup();
    l.tabs.setup();
    l.calendar.setup();
    l.workshop.setup();
    l.buildings.setup();
    l.draw();
    l.hidetooltip();
    l.load();
    if (!(localStorage.getItem("__save"))){
        l.aims.initiate();
    } else {
        l.playing = true;
        l.tabs.list[0][0].settab();
    }
    l.updateall();
    setInterval(function(){l.tick()}, 1000);
};

l.tick = function(){
    if (l.playing){
        l.jobs.do();
        l.topbarjoblooks(true);
        l.calendar.tick();
        l.res.getresources();
        if (l.tabs.curtab == "shuttle"){
            l.res.update();
        }
        l.sidebarUpdate();
        if (l.calendar.hour==0){
            l.updateall();
            l.save();
        }
    }
}

//-----------------------------------------------
//Update everything, from requirements to enhancements
l.updateall = function(){
    l.explore.updateall();
    l.jobs.updateall();
    l.calendar.update();
    l.workshop.updateall();
    l.res.setallgain();
    l.res.setallcaps();
    if ((l.tabs.curtab !== undefined) && (l.tabs.curtab !== "explore")){
        l[l.tabs.curtab].draw();
    }
    l.buildings.updateall();
    l.tabs.checkprereq();
    l.sidebarDraw();
}

l.dev = function(){
    l.explore.unlockall();
}



















