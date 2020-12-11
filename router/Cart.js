module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = async function(item, id,QTY){
      
        var storedItem = this.items[id]
       
        if(!storedItem){
            storedItem = this.items[id] = {item:item, qty:0,price:0}
        }
         if(storedItem.item.stocks <= storedItem.qty){ 
            //  console.log(Number(QTY)+Number(storedItem.qty))
            //  console.log(storedItem.item.stocks)            
            return 
        }
        if((Number(QTY)+ Number(storedItem.qty)) > storedItem.item.stocks){
            return
        }
        storedItem.qty+=Number(QTY)
        storedItem.price = storedItem.item.price * (storedItem.qty)
        this.totalQty+=Number(QTY)
        this.totalPrice += storedItem.item.price *Number(QTY)
    }

    this.removeOne = async function(id){
        this.items[id].qty--;
        this.items[id].price-= this.items[id].item.price
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price

        if(this.items[id].qty<=0){
            delete this.items[id]
        }
    }

    this.addOne = async function(id){
        //  if(items.item.stocks <= storedItem.qty){
        //     console.log("hello")
        //     return
        // }
        if(this.items[id].qty == this.items[id].item.stocks){
            return
        }
        return this.items[id].qty++;
        return this.items[id].price += this.items[id].item.price
        return this.totalQty++;
        return this.totalPrice += this.items[id].item.price
    }

    this.removeAll = async function(id){
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
         return delete this.items[id]
    }
    this.generateArray = function(){
        var arr = []
        for(var id in this.items){
            arr.push(this.items[id])
        }
        return arr;
    }

}