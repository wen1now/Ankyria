l.aims = new Object();
l.aims.storytimer = [];


l.fadein = function(element,num){
    var op = 0;  // initial opacity
    l.aims.storytimer[num] = setInterval(function (){
        if (op >= 0.97){
            clearInterval(l.aims.storytimer[num]);
            element.style.opacity = 1;
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.05+0.03;
    }, 100);
}

l.aims.init_story = [
    "You wake up to an incessant beeping... it is coming from a bank of monitors",
    "Stumbling out of bed, you go to turn it off. As you do, you notice where you are-",
    "High up in orbit around a planet",
    "You find the source of the beeping; it's an extremely old, dust covered monitor",
    "Deciphering the flashing lights tells you that your orbit is decaying:",
    "The spaceship is going to crash land within the next few hours",
    "There's nothing you can do but hold on for the ride..."
]

l.aims.people_story = [
    'As you climb over the final hill, you find an inhabited settlement',
    'You walk over to investigate; their sentry sees you long before you arrive',
    'Although they appear uncivilised, they are undoubtedly a subspecies of <i>homo sapiens</i>',
    'The tallest of them - presumably their leader - steps forward and speaks haltingly:',
    '"I am Bob. We are on Ankyria"'
]

l.endstory = function(){
    l.playing = true;
}

l.tellstory = function(somearray){
    var x=document.getElementById("maingame");
    x.innerHTML
    x.innerHTML="<button id='skipstory' onclick='l.endstory()'>Skip>></button>";
    var a = 0;
    var displaynext = function(){
        x.innerHTML += "<div style='opacity:0;' id='storytelling"+a+"'>"+l.aims.init_story[a]+"</div>";
        l.fadein(document.getElementById("storytelling"+a),a);
        a++;
        if ((a<l.aims.init_story.length) && !(l.playing)){y=setTimeout(displaynext,5000)} else {
            document.getElementById("skipstory").innerHTML = "Continue>>";
            clearInterval(y)};
    };
    displaynext();
}

l.aims.initiate = function(){
    l.playing = false;
    l.tellstory(l.aims.init_story);
    var startgame = setInterval(function(){
        if (l.playing){
            l.tabs.list[0][0].settab();
            clearInterval(startgame);
            clearInterval(y);
            l.log("I've landed. It wasn't as rough as I thought. However, my supplies are limited. I need to find some water <i>fast</i>, before what I have runs out. Hopefully I can survive here...");
        }
    },30);
}






