import { taxRate } from "../../../datalist";

export function calculateCartSubtotal(cartData: any) {
    const subtotal = cartData.reduce((acc: number, item: any) => {
        const { price } = item.products;
        return acc + price * item.quantity;
    }, 0);

    return subtotal;
}

export function calculateCartTotalDiscount(cartData: any) {
    const totalDiscount = cartData.reduce((acc: number, item: any) => {
        const { price, discount } = item.products;
        const discountAmount = (price * discount / 100) * item.quantity;
        return acc + discountAmount;
    }, 0);

    return totalDiscount;
}

export function calculateCartTotalAfterDiscount(cartData: any) {
    const total = cartData.reduce((acc: number, item: any) => {
        const { price, discount } = item.products;
        const discountedPrice = price - (price * discount / 100);
        return acc + (discountedPrice * item.quantity);
    }, 0);

    return total;
}

export function calculateNumOfCartItems(cartData: any) {
    let totalCartCount: number = 0;

    cartData.map((item: any) => {
        totalCartCount += item.quantity
    })

    return totalCartCount;
}

export function calculateTotalTax(cartSubTotal: number, totalShippingCost: number) {
    let totalTax: number = 0;
    totalTax = Number(((cartSubTotal + totalShippingCost) / 100) * taxRate)

    return totalTax;
}

export function calculateItemPriceAfterDiscount(price: number, discount: number) {
    let salePrice: number = 0;
    salePrice = price - ((price / 100) * discount)

    return salePrice;
}