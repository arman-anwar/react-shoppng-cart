import { Button, Form, Stack } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import CartItemComponent from "./CartItemComponent"
import storeItems from "../data/items.json"
import { useSelector } from "react-redux"
import { RootState } from "../features/store"
import { useEffect, useState } from "react"
import { PricingRule } from "../types"

const ShoppingCart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)

  const [parsingRules, setRules] = useState<PricingRule[]>([])
  const [textval, setTextVal] = useState('')

  useEffect(() => {
    let rule: PricingRule[] = [
      { "price": 0.434, "product": storeItems[0], "quantity": 3, "ruleId": 1 },
      { "price": 0.225, "product": storeItems[1], "quantity": 2, "ruleId": 2 },
    ]
    setRules(rule)
    setTextVal(JSON.stringify(rule))
  }, [])

  const handleChange = (val: string) => {
    setTextVal(val)
  }

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const newRules = () => {
    // setRules(val)
    if (isJsonString(textval)) {
      let ruless: PricingRule[] = []
      console.log('valid', textval)
      ruless = JSON.parse(textval)
      setRules(ruless)
    } else {
      alert('Invalid json')
    }
  }

  const calculateTotal = () => {
    // console.log('parsingRules', parsingRules)
    let result = cartItems.reduce((total, cartItem) => {
      const item = storeItems.find(i => i.id === cartItem.product.id)
      let tprice = item?.price || 0
      let pRule = parsingRules.find(a => a.product.id === cartItem.product.id)
      if (pRule && cartItem.quantity >= pRule.quantity) {
        tprice = pRule.price
      }
      return total + (tprice) * cartItem.quantity
    }, 0)
    return formatCurrency(result)
  }

  return (
    <>
      <h4>Pricing discount rules (JSON) </h4>
      <Stack gap={3}>
        {/* {pricingRules.map(item => (
          <RuleItem key={item.product.id} {...item} />          
        ))} */}
        <div className="ms-auto fw-bold fs-5">
          <Form.Control as="textarea" cols={200} rows={6} name="rules" value={textval} onChange={e => handleChange(e.target.value)} />
          <Button className="w-100" onClick={() => newRules()}>
            Update Rules
          </Button>
        </div>
      </Stack>
      <div className="mt-5">
        <h2>Cart</h2>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItemComponent key={item.cartItemId} {...item} />
          ))}
          {cartItems.length > 0  && (
            <div className="d-flex align-items-center hstack gap-5 minBreakpoint-xs">
            <div className="me-auto mt-4 ">
              <span>Total Price (After applying discount rules):</span>
            </div>
            <div>
              <div>{calculateTotal()}</div>
            </div>
          </div>
          )}
          
        </Stack>
      </div>
    </>
  )
}

export default ShoppingCart