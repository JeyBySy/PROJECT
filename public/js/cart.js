module.exports = function Cart(oldCart){
    this.items = oldCart.items;
    this.total_qty = oldCart.total_qty;
    this.total_price= oldCart.total_price;

    this.add = function(item,id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, price:0,qty:0}
        }
        storedItem.qty++
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.total_qty++;
        this.total_price+= storedItem.price
    }
    this.generateArray = function(){
        var arr = [];
        for(var id in this.product){
            arr.push(this.product[id])            
        }
        return arr;
    }
}