import React from "react";

const CartDetails = () => {
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <td>Title</td>
            <td>Price</td>
            <td>Preview</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem) => (
            <tr key={cartItem.id}>
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartDetails;
