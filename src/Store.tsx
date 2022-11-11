import { Col, Container, Row } from "react-bootstrap"
import ShoppingCart from "./components/ShoppingCart"
import StoreItem from "./components/StoreItem"
import storeItems from "./data/items.json"

const Store = () => {

  return (
    <>
      <Container className="mb-4 mt-5">
        <Row>
          <Col xs={6}>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={4} className="g-3">
              {storeItems.map(item => (
                <Col key={item.id}>
                  <StoreItem {...item} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col>
            <ShoppingCart />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Store



