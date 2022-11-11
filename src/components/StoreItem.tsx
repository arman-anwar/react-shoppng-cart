import { useEffect, useState } from "react"
import { Button, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../features/cartReducer"
import { RootState } from "../features/store"
import { Product } from "../types"
import { formatCurrency } from "../utilities/formatCurrency"

const StoreItem = (product: Product) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems)

  const quantity = cartItems.find(item => item.product.id === product.id)?.quantity || 0;

  return (
    <Card className="h-100">

      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{product.name}</span>
          <span className="ms-2 text-muted">{formatCurrency(product.price)}</span>
        </Card.Title>
        <div>
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => dispatch(increaseCartQuantity(product))}>
              Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => dispatch(decreaseCartQuantity(product))}>-</Button>
                <div>
                  <span className="fs-3">{quantity + ''}</span>
                </div>
                <Button onClick={() => dispatch(increaseCartQuantity(product))}>+</Button>
              </div>
              <Button
                onClick={() => dispatch(removeFromCart(product))}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}


export default StoreItem
