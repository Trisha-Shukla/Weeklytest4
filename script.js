let apikey = "https://openapi.programming-hero.com/api/phones?search=";
let showAll = document.querySelector(".show-all");
let showbuttonflag = false;
let searchValue = "13";

async function mobileSearch(search) {
  let searchResult = `${apikey}${search}`;
  //   console.log(searchResult);

  let response = await fetch(searchResult);
  let data = await response.json();
  // console.log(data.data);
  mobileView(data.data);
}

function mobileView(phones) {
  if (phones.length > 12 && !showbuttonflag) {
    document.querySelector(".show-cont").style.display = "flex";
    // phones=phones.slice(0,12);
    if (!showbuttonflag) {
      phones = phones.slice(0, 12);
    }
  } else {
    document.querySelector(".show-cont").style.display = "none";
  }

  document.querySelector(".mobile-gallery").innerHTML = "";
  phones.forEach((phone) => {
    document.querySelector(
      ".mobile-gallery"
    ).innerHTML += `<div class="mobile-detail">
            <img src="${phone.image}" alt="">
            <h3>${phone.phone_name}</h3>
            <p style="text-align:center;  font-size: 16px;">There are many variations of passages of available, but the majority have suffered

phone</p>
            <button onclick="showDetails('${phone.slug}')">Show Details</button>
        </div>`;
  });
  loading(false);
  // document.querySelector(".loading").display="none";
}
showAll.addEventListener("click", () => {
  showbuttonflag = true;
  searchValue = document.querySelector(".input-search").value;
  mobileSearch(searchValue);
});

function loading(isloading) {
  if (isloading) {
    document.querySelector(".loading").display = "block";
    document.querySelector(".show-details").display = "none";
  } else {
    document.querySelector(".loading").display = "none";
    document.querySelector(".show-details").display = "block";
  }
}
document.querySelector(".button-search").addEventListener("click", (e) => {
  e.preventDefault();
  loading(true);
  showbuttonflag = false;
  searchValue = document.querySelector(".input-search").value;
  mobileSearch(searchValue);
});
mobileSearch(searchValue);

async function showDetails(id) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();

  const phone = data.data;
  console.log(phone);
  document.querySelector(".show-details").style.display = "flex";
  document.querySelector("body").style.overflow = "hidden";
  document.querySelector(
    ".show-details"
  ).innerHTML = ` <div class="details-cont">
                <img src="${phone.image}" alt="">
                <h3>${phone.name}</h3>
                <h5 style=" font-size: 18px;">Brand:${phone.brand}</h5>
                <p style="text-align:center;  font-size: 16px;">Storage:${phone.mainFeatures.storage} <br>displaySize ${phone.mainFeatures.displaySize} chipSet: ${phone.mainFeatures.chipSet}  <br>memory: ${phone.mainFeatures.memory} <br>sensore: ${phone.mainFeatures.sensors} </p>

                <button class="close-button" onclick="closeButton()">Close</button>
            </div>`;
}

function closeButton() {
  document.querySelector(".show-details").style.display = "none";
  document.querySelector("body").style.overflow = "visible";
}
