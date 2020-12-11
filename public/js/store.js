window.onload = function () {
    window.scrollTo(0, 0);
};

const addToCart = document.querySelectorAll('.shop-item-button')



addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        var item = JSON.parse(btn.dataset.item)
        console.log(item)
        

        
    })
})