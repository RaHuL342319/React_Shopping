import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems, removeCartItem } from "../store/feature/cartSlice";

const CartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cartItems);

  const removeProduct = (id) => {
    dispatch(removeCartItem(id));
  };

  const clearCart = () => {
    dispatch(clearCartItems());
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, curr) => acc + curr.price, 0);
  };

  return (
    <div className="bg-info-subtle ">
      <table className="table table-hover">
        <thead className="text-center">
          <tr className="bg-primary">
            <th>Title</th>
            <th>Price</th>
            <th>Preview</th>
            <th>
              <button className="btn btn-danger" onClick={clearCart}>
                <span className="bi bi-trash"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Empty Cart Message */}
          {cartItems.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center p-5 text-center">
              Your cart is currently empty.
            </div>
          ) : (
            cartItems.map((cartItem) => (
              <tr key={cartItem.id} className="text-center">
                <td>{cartItem.title}</td>
                <td>{cartItem.price}</td>
                <td>
                  <img src={cartItem.image} alt="" height={40} width={40} />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeProduct(cartItem.id)}
                  >
                    <span className="bi bi-trash"></span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Total Cart Amount */}
      {cartItems.length > 0 && (
        <div className="d-flex justify-content-end p-2">
          <span className="fs-4">Total: $ {calculateTotal()}</span>
        </div>
      )}
    </div>
  );
};

export default CartItems;
