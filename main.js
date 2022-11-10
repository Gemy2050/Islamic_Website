// Explore Button
let exploreBtn = document.querySelector(".title .btn");
let hadithSection = document.querySelector(".hadith");
exploreBtn.onclick = () => {
  hadithSection.scrollIntoView({ behavior: "smooth" });
};
// Handle Navbar
let fixedNav = document.querySelector(".header");
window.addEventListener("scroll", (e) => {
  window.scrollY > 100
    ? fixedNav.classList.add("active")
    : fixedNav.classList.remove("active");
});
// Hadith Changer
let hadithContainer = document.querySelector(".hadithContainer .hadith"),
  next = document.querySelector(".buttons .next"),
  prev = document.querySelector(".buttons .prev"),
  number = document.querySelector(".buttons .number");
let hadithIndex = 0;

next.onclick = function () {
  hadithIndex == 499 ? (hadithIndex = 0) : hadithIndex++;
  getHadith();
};
prev.onclick = function () {
  hadithIndex == 0 ? (hadithIndex = 499) : hadithIndex--;
  getHadith();
};

function getHadith() {
  fetch("https://ahadith-api.herokuapp.com/api/ahadith/all/ar-tashkeel")
    .then((res) => res.json())
    .then((data) => {
      let hadiths = data.AllChapters;
      hadiths.length = 500;
      hadithContainer.innerText = hadiths[hadithIndex].Ar_Text;
      number.innerHTML = `${hadiths[hadithIndex].Hadith_ID} / ${hadiths.length}`;
    });
}
getHadith();

// Sections Links
let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".header ul li");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    document.querySelector(".header ul li.active").classList.remove("active");
    e.target.classList.add("active");
    sections.forEach((section)=> {
      if(section.classList.contains(e.target.dataset.filter)) {
        section.scrollIntoView({behavior: "smooth",})
      }
    })
  });
});

// Surah Api
let surahsContainer = document.querySelector(".surahsContainer");
function getSurahs() {

  // Fetch Surahs
  fetch("http://api.alquran.cloud/v1/meta")
  .then((res) => res.json())
  .then((data) => {
    let surahs = data.data.surahs.references;
    for(let i=0; i < 114; i++) {
      surahsContainer.innerHTML += `
        <div class="surah">
          <p>${surahs[i].name}</p>
          <p>${surahs[i].englishName}</p>
        </div>
      `;
    }
    let surahsTitle = document.querySelectorAll(".surah");
    let popup = document.querySelector(".surah-popup");
    let ayatContainer = document.querySelector(".surah-popup .ayat");
    let closeIcon = document.querySelector(".surah-popup .close ");

    surahsTitle.forEach((title, index) => {
      title.addEventListener("click", (e)=> {
        fetch(`http://api.alquran.cloud/v1/surah/${index+1}`)
        .then((res)=> res.json())
        .then((data)=> {
          let ayatText = data.data.ayahs;
          ayatContainer.innerHTML = '';
          ayatText.forEach((aya) => {
            ayatContainer.innerHTML += `
            <p>${aya.text} (${aya.numberInSurah})</p>
            `;
          })
          popup.appendChild(ayatContainer);
          popup.classList.add("active");
          closeIcon.addEventListener("click", () =>popup.classList.remove("active"));
        })
      });
    })
  })
  
}
getSurahs();

// Pray Time
let cards = document.querySelector(".pray .cards");

function getPrayTime() {

  fetch("http://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8")
  .then((res) => res.json())
  .then((data) => {

    let prays = data.data.timings;
    for(let pray in prays) {
      cards.innerHTML += `
        <div class="card">
            <div class="circle">
              ${prays[pray]}
            </div>
            <p>${pray}</p>
          </div>
      `;
    }
    
  })

}
getPrayTime();

// Scroll to Top Button
function scrollTop() {

  let btn = document.querySelector(".scroll-btn");
  btn.onclick = ()=> {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  
  window.onscroll = ()=> {
    if(window.scrollY >= hadithSection.offsetTop) {
      btn.style.right = '15px';
    } else 
      btn.style.right = "-100%";
  }

}
scrollTop();

// handle bars click
let bars = document.querySelector(".header .bars");
let ul = document.querySelector(".header ul");
console.log(bars);
bars.onclick = function() {

  ul.classList.toggle("active");
  this.classList.toggle("active");

}