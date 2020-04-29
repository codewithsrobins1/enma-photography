const closetBtn = document.querySelector(".nav-links__explore");
const openNav = document.querySelector(".nav-open");


//Change Hero Image every 12 seconds
var heroImages = ['./imgs/landingHero1.jpg', 
'./imgs/landingHero2.jpg', 
'./imgs/landingHero3.jpg', 
'./imgs/landingHero4.jpg',
'./imgs/landingHero5.jpg'
]

let count = 0;
const background = document.getElementById("hero-image");
const imgTimer = setInterval(imgUpdate, 15000);

function imgUpdate(){
    background.src = heroImages[count];
    count++;
    if (count >= heroImages.length){
        count = 0;
    }
}

imgUpdate();


//Add Multiple Animations - Takes object we can add extra properties
const timeLine = new TimelineLite({
    paused: true,
    reversed: true
    }
);

//First Animation Sequence
timeLine.to(".header-hero__image", 1, {
    width: "60%",
    ease: Power2.easeOut  //ease out with a power of 2
})
    //Second Animation Sequence
    .to(".nav", 1, {
        height: "100%",
        ease: Power2.easeOut
    }, "-= 0.5"     // <-- Add string to start animation half way through the first one
)
        //Third Animation Sequence - Animate from to something  
        .fromTo(".nav-open", 0.5, {
            opacity: 0,
            x: 50,  //This translate from view
            ease: Power2.easeOut
        }, 
            {
                opacity: 1,
                x: 0,  //Bring content back into view
                onComplete: function () {
                    openNav.style.pointerEvents = "auto";
                }
            })
; 

//Start Nav Animation When Selecting Closet Nav Link - Call toggle function passing the TimelineLite
closetBtn.addEventListener("click", () => {
    //When Animation is Running, Will prevent stopping the animation
    if (timeLine.isActive()){
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
    toggleTween(timeLine)
});

//Function to Toggle Open and Close of Nav
function toggleTween(tween){
    //If reversed then tween play (which starts animation); else recall the animation if it is open
    tween.reversed() ? tween.play() : tween.reverse();
}







































// TweenLite.to(object,time, {animate}) - Define what to move, time of animation, different properties
//Example:
// const tween = TweenLite.to(".header-hero__image", 1, {
//     width: '40%'
// });