import { Button, Form, Stack } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import CartItemComponent from "./CartItemComponent"
import storeItems from "../data/items.json"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../features/store"
import { useEffect, useState } from "react"
import { PricingRule } from "../types"

const ShoppingCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)

  
  const [parsingRules, setRules] = useState<PricingRule[]>([])
  const [textval, setTextVal] = useState('')

  useEffect(() => {
    let rule: PricingRule[] = [
      { "price": 0.43, "product": storeItems[0], "quantity": 3, "ruleId": 1 },
      { "price": 0.225, "product": storeItems[1], "quantity": 2, "ruleId": 2 },
    ]
    setRules(rule)
    setTextVal(JSON.stringify(rule))
  }, [])

  const handleChange = (val: string) => {
    setTextVal(val)
  }

  const newRules = () => {
    // setRules(val)
    if (JSON.stringify(textval)) {
      let ruless: PricingRule[] = []
      console.log('valid', textval)
      ruless = JSON.parse(textval)
      setRules(ruless)
    }
  }


  const calculateTotal = () => {
   
    return formatCurrency(0)
  }

  return (
    <>
      <h4>Pricing Rules (JSON) </h4>
      <Stack gap={3}>
        {/* {pricingRules.map(item => (
          <RuleItem key={item.product.id} {...item} />          
        ))} */}
        <div className="ms-auto fw-bold fs-5">
          <Form.Control as="textarea" cols={200} rows={6} name="rules" value={textval} onChange={e => handleChange(e.target.value)} />
          <Button className="w-100" onClick={() => newRules()}>
            Rules Updated
          </Button>
        </div>
      </Stack>

      <h2>Cart</h2>
      <Stack gap={3}>
        {cartItems.map(item => (
          <CartItemComponent key={item.cartItemId} {...item} />
        ))}
        <div className="ms-auto fs-5">
          <span>          Total Price (After applying discount rules): &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          {calculateTotal()}
        </div>
      </Stack>
    </>
  )
}

export default ShoppingCart