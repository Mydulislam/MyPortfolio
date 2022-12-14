//Preloader js 
window.addEventListener("load",function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function(){
        document.querySelector(".preloader").style.display = "none";
    },1000)
})


//Portfolio Item Filter
const filterContainer = document.querySelector(".portfolio-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    totalPortfolioItem = portfolioItems.length; 


    for(let i = 0; i<totalFilterBtn; i++){
        filterBtns[i].addEventListener("click", function(){
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add("active");

            const filterValue = this.getAttribute("data-filter");
            for(let k=0; k<totalPortfolioItem; k++){
                if(filterValue === portfolioItems[k].getAttribute("data-category")){
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                }
                else{
                    portfolioItems[k].classList.remove("show");
                    portfolioItems[k].classList.add("hide");
                }
                if(filterValue === "all"){
                    portfolioItems[k].classList.remove("hide");
                    portfolioItems[k].classList.add("show");
                }
            }
        })
    }

    //Portfolio Lightbox

    const lightbox = document.querySelector(".lightbox"),
          lightboxImg = lightbox.querySelector(".lightbox-img"),
          lightboxClose = lightbox.querySelector(".light-close"),
          lightboxText = lightbox.querySelector(".caption-text"),
          lightboxCounter = lightbox.querySelector(".caption-counter");
    let itemIndex = 0;

    for(let i=0; i<totalPortfolioItem; i++){
        portfolioItems[i].addEventListener("click", function(){
            itemIndex = i;
            changeItem();
            toggleLightbox();
        })
    }

     function nextItem(){
        if(itemIndex === totalPortfolioItem-1){
            itemIndex = 0;
        }
        else{
            itemIndex++;
        }
        changeItem()
    }

    function prevItem(){
        if(itemIndex === 0){
            itemIndex = totalPortfolioItem-1;
        }
        else{
            itemIndex--;
        }
        changeItem()
    }
    function toggleLightbox(){
        lightbox.classList.toggle("open");
    }

    function changeItem(){
        imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
        lightboxImg.src = imgSrc;
        lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
        lightboxCounter.innerHTML = (itemIndex+1) + " of " + totalPortfolioItem;
    }

    //Close Lightbox portfolioimg (X) Button click

    lightbox.addEventListener("click",function(event){
        if(event.target === lightboxClose || event.target === lightbox){
            toggleLightbox();
        }
    })

    //Aside Navbar show js responsive click

    const nav = document.querySelector(".nav"),
          navList = nav.querySelectorAll("li"),
          totalNavList = navList.length,
          allSection = document.querySelectorAll(".section");
          totalSectionLength = allSection.length;


    for (let i = 0; i<totalNavList; i++) {
        const a = navList[i].querySelector("a");
        a.addEventListener("click",function(){

            // remove back-secton class
                removeBackSectionClass();

            for(j=0; j<totalNavList; j++){
                if(navList[j].querySelector("a").classList.contains("active")){
                    // add back-section class
                    addBackSectionClass(j);
                }
                navList[j].querySelector("a").classList.remove("active");
            }

            this.classList.add("active");
            showSection(this);
        })
    }

    //remove back section function
        function removeBackSectionClass(){
            for(let i=0; i<totalSectionLength; i++){
                allSection[i].classList.remove("back-section");
            }
        }
        //add back section function
        function addBackSectionClass(num){
            allSection[num].classList.add("back-section");
        }

        function showSection(element) {
            for(let i=0; i<totalSectionLength; i++){
                allSection[i].classList.remove("active")
            }
            const href = element.getAttribute("href").split("#");
                  target = href[1];
            document.querySelector("#"+target).classList.add("active");
        }
    
        function updateNav(element){
            for(i=0; i<totalNavList; i++){
                navList[i].querySelector("a").classList.remove("active");
                const agerTarget = target;
                if(agerTarget === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
                    navList[i].querySelector("a").classList.add("active"); 
                }
            }
            // console.log(target);
        }

        //click hire me button in (About sectionn) and show contact section
        document.querySelector(".hire-me").addEventListener("click",function(){
            const sectionIndex = this.getAttribute("data-section-index");
            //console.log(sectionIndex);
            showSection(this);
            updateNav(this);
            removeBackSectionClass();
            addBackSectionClass(sectionIndex);
        })

       //click fa fa bars button and show aside menu
       const asideNavBtn = document.querySelector(".toggle-btn"),
             aside = document.querySelector(".aside");
   
   asideNavBtn.addEventListener("click",() =>{
     asideSectionTogglerBtn();
   })
   
   function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    asideNavBtn.classList.toggle("open");

    for(let i=0; i<totalSectionLength; i++){ //click and section left:270px;
        allSection[i].classList.toggle("open")
    }
   }