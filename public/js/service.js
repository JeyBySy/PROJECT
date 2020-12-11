window.onload = function () {
    window.scrollTo(0, 0);
};

const offers = document.querySelectorAll('.card')
const btn_offer = document.getElementById('chooseCard')

btn_offer.addEventListener('click',()=>{
    console.log(offers)
})