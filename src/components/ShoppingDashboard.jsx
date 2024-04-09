import React,{useState, useEffect} from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Products from "./Products";
import { useSelector } from "react-redux";

const ShoppingDashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [email, setEmail] = useState();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All Categories");
  const navigate = useNavigate();
  
  const cartItems = useSelector((store) => store.cart.cartItems);

  // Remove the unnecessary console.log
  // console.log(cartItems); // Removed

  useEffect(() => {
    if (cookies["email"] === undefined) {
      navigate("/login");
    } else {
      setEmail(cookies["email"]);
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        const data = response.data;
        data.unshift({ _id: 1, category: "All Categories" }); // Prepend "All Categories"
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Implement more robust error handling here (e.g., display error message)
      }
    };

    fetchCategories(); // Immediately call the function
  }, []);

  const handleSignOut = () => {
    removeCookie("email");
    navigate("/login");
  };

  return (
    <div>
      <h1>Shopping Dashboard</h1>
      <h4>
        Login user: {email} -{" "}
        <button className="btn btn-link" onClick={handleSignOut}>
          SignOut
        </button>
      </h4>

      {/* Consider using a separate function for the dropdown if needed */}
      <div className="row d-flex justify-content-between bg-info ">
        <div className="col-3">
          <select
            name=""
            id=""
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option value={item.category} key={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3 border">
          <Link to="/cart" className="text-center">
            <p>
              <span className="bi bi-cart"></span> Cart [
                {cartItems.length}
              ]
            </p>
          </Link>
        </div>
      </div>

      <Products category={category} />

    
    </div>
  );
};

export default ShoppingDashboard;
