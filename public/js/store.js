// window.onload = function () {
//     window.scrollTo(0, 0);
 
// };
// const addToCart = document.querySelectorAll('.shop-item-button')

// addToCart.forEach((btn)=>{
//     btn.addEventListener('click',(e)=>{
//         var item = JSON.parse(btn.dataset.item)
//         console.log(item) 
//     })
// })
// const sort = document.getElementById('active').onclick = ()=>{
//   var x = document.getElementById('active').value
//     // var e = document.getElementById("active");
//     // var text = e.options[e.selectedIndex].text;
//     // if(text == "Cleaning Equipment"){
//     window.location.href='/store/'+x
//     // }   
//     // console.log(document.getElementById('active').value)
// }
// // const search = document.getElementById('searchID').onclick = ()=>{
// //     var e = document.getElementById("searchID");
// //     var text = e.options[e.textContent].text;
// //     if(text == "as"){
// //     window.location.href='/cart'
// //     }   
// // }
const search = document.getElementById('searchID')

search.addEventListener("keydown", (event) => {
//    console.log(`key=${event.key},code=${event.code}`);
   if(`${event.key}`== 'Enter'){
     window.location.href=`/store/search/${search.value}`
      
   }
    
})
const sort = document.getElementById('active')

sort.addEventListener('close', (event) => {
//    console.log(`key=${event.key},code=${event.code}`);
   if(`${event.key}`== 'Enter'){
     window.location.href=`/store/${sort.value}`
   }  
})
