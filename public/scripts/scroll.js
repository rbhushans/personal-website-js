let homeElements = document.querySelectorAll(".home-section");
let projElements = document.querySelectorAll('.project-card');
let expeElements = document.querySelectorAll('.exp-work')
function fadeIn() {
    for (var i = 0; i < homeElements.length; i++) {
        var elem = homeElements[i]
        var dist = elem.getBoundingClientRect().top - window.innerHeight + 300;
        if (dist < 0) {
            elem.className = "home-section show";
        } else {
            elem.className = "home-section hide";
        }
    }
    for(var i = 1; i < projElements.length; i++){
        var elem = projElements[i]
        var dist = elem.getBoundingClientRect().top - window.innerHeight + 150;
        if (dist < 0) {
            elem.className = "project-card show";
        } else {
            elem.className = "project-card hide";
        }
    }
    for(var i = 1; i < expeElements.length; i++){
        var elem = expeElements[i]
        var dist = elem.getBoundingClientRect().top - window.innerHeight + 50;
        if (dist < 0) {
            elem.className = "exp-work show";
        } else {
            elem.className = "exp-work hide";
        }
    }
}
window.addEventListener('scroll', fadeIn ); 

document.body.addEventListener('click', function(e) {
    setTimeout(function(){
        if(e.target.id == 'menu-pic'){
            return;
        }
        let menu = document.getElementById("fake-checkbox")
        if(e.target.id == 'fake-checkbox') {
            if(menu.checked){
                menu.checked = true;
            }
            return;
        }
        if(menu.checked){
            menu.checked = false;
        }
    }, 50);
})

function scroll(container, top, target, i) {
    i++; 
    if (i > 30) {
        return;
    }
    container.scrollTop = top + (target - top) / 30 * i;
    setTimeout(function(){ scroll(container, top, target, i); }, 15);
}

let arrow = document.getElementById("arrow")
if(arrow != null){
    arrow.addEventListener('click', function(){
        let target = document.getElementById("home-about");
        var scrollContainer = document.getElementById("home-about");
        do {
            scrollContainer = scrollContainer.parentNode;
            if (!scrollContainer) return;
            scrollContainer.scrollTop += 1;
        } while (scrollContainer.scrollTop == 0);
    
        var targetY = 0;
        do { 
            if (target == scrollContainer) break;
            targetY += target.offsetTop;
        } while (target = target.offsetParent);
        scroll(scrollContainer, scrollContainer.scrollTop, targetY-200, 0);
    })
}





