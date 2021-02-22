import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import ProductStyles from "./styles/ProductStyles";
import formatMoney from "../utils/formatMoney";
import * as actions from "../actions/cart";
import { DetailsStyles, ProductsList } from "./styles/ProductListStyles";


function Product({ products }) {
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();

  let items = [];

  for (let i = 0; i < products.length; i++) {
    items.push(
      <ProductStyles key={products[i].id}>
        <div className="image">
          <h3>
            <Link
              href={{
                pathname: "product",
                query: { id: products[i].id },
              }}
            >
              <a>{products[i].title}</a>
            </Link>
          </h3>
          {products[i].image && (
            <Image
              src={products[i].image}
              alt={products[i].title}
              width={100}
              height={100}
              layout="fixed"
            />
          )}
        </div>
        <DetailsStyles>
          <p>{products[i].description}</p>
          <p>{formatMoney(products[i].price)}</p>
        </DetailsStyles>

        <div className="button-list">
          {user.role === "farmer" && (
            <>
              <Link
                href={{
                  pathname: "update",
                  query: { id: products[i].id },
                }}
              >
                <a>Edit</a>
              </Link>
              <DeleteButton id={products[i].id} />
            </>
          )}
          {user.role === "restaurant" && (
            <button
              className="shopping-cart-icon"
              type="button"
              id={products[i].id}
              onClick={() =>
                dispatch(
                  actions.addToCart({
                    product: products[i].title,
                    id: [i],
                    price: products[i].price,
                    description: products[i].description,
                    image: products[i].image,
                  })
                )
              }
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          )}
        </div>
      </ProductStyles>
    );
  }
  return <ProductsList>{items}</ProductsList>;
}

export default Product;
