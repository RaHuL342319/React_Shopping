import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
   if(category === "All Categories"){
    axios.get(`http://localhost:3000/getproducts/`).then((response) => {
        setProducts(response.data);
      });
   }else{
    axios.get(`http://localhost:3000/products/${category}`).then((response) => {
        setProducts(response.data);
      });
   }
  }, [category]);

  return (
    <div className="border border-danger">
      <h1>Products</h1>
      <p>This is the Products page</p>
      {console.log(products)}

      <div className="row">
        <div className="d-flex gap-2 flex-wrap mt-3 col border">
          {products.map((product) => (
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
                //   onClick={cartHandler}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
