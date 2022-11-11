export interface Product {
    id: number
    name: string
    price: number
}

export interface CartItem {
    cartItemId: number
    product: Product
    quantity: number
}

export interface PricingRule {
    ruleId?: number
    product: Product
    quantity: number
    price: number
}
