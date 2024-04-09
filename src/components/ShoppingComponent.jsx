import React, { useEffect, useState } from "react";

const ShoppingComponent = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    LoadCategories();
    LoadProducts();
  }, []);

  const LoadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        data.unshift("All Categories");
        
        setCategories(data);
      });
  };

  const LoadProducts = () => {
    fetch("http://localhost:3000/getproducts")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  };

  const cartHandler = (e) => {
    console.log(e.target.id);
    fetch(`http://localhost:3000/products/${e.target.id}`)
      .then((response) => response.json())
      .then((data) => {
        setCartItems([...cartItems, data]);
      });
  };

  const categoryHandler = (e) => {
    if (e.target.value === "All categories") {
     
      setFilteredProducts([...products]);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === e.target.value)
      );
    }
  };
  // console.log(cartItems);

  const removeProduct = (id) => {
      setCartItems(cartItems.filter((item) => item.id!== id));
  }
  return (
    <div className="bg-primary">
      <div className="bg-danger" style={{ height: "10vh" }}>
        <h1 className="text-center">Shopping</h1>
      </div>
      <div className="row">
      <div className="mt-3 col-3 border">
          <select className="form-select" onChange={categoryHandler}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="d-flex gap-2 flex-wrap mt-3 col-8 border">
          {filteredProducts.map((product) => (
            <div className="card p-4" style={{ width: "32%" }} key={product.id}>
              <div>
                <img
                  className="card-img-top"
                  src={product.image}
                  alt="Card image cap"
                  height={150}
                />
              </div>
              <div className="card-body" key={product.id}>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">$ {product.price}</p>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary"
                  id={product.id}
                  onClick={cartHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-4 mt-3 border">
          <div className="bg-danger text-center">
            <p>
              <span className="bi bi-cart"></span> Cart [
              {cartItems ? cartItems.length : 0}]
            </p>
          </div>
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
                      <button className="btn btn-danger" onClick={() => removeProduct(cartItem.id)}>
                        <span className="bi bi-trash"></span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingComponent;
