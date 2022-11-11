import { Button, Stack } from "react-bootstrap"
import { useDispatch } from "react-redux"
import storeItems from "../data/items.json"
import { removeFromCart } from "../features/cartReducer"
import { CartItem } from "../types"
import { formatCurrency } from "../utilities/formatCurrency"

const CartItemComponent = ({ cartItemId, quantity, product }: CartItem) => {
  const dispatch = useDispatch();
  const item = storeItems.find(i => i.id === product.id)
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">

      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>(Original Item Price)
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => dispatch(removeFromCart(product))}
      >
        &times;
      </Button>
    </Stack>
  )
}

export default CartItemComponent