export function calculateTotal(cart:any[]) {
    return cart.reduce(
        (sum,item)=>sum+item.product.price*item.quantity,
        0
    );
}