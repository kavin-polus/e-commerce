import React from "react";
import MenuBar from "../NavBar/MenuBar";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleProductHomeClick = (event) => {
      event.preventDefault();
      navigate("/product")
  }

  return (
    <>
   
      <main className=" flex items-center justify-center">
        <section className="container mx-auto py-20 px-4" id="cart">
        
          <div className="cart-wrapper space-y-4">
            <article className="flex space-x-4">
              <div className="cart-image w-full">
                <img
                  src="https://i.ibb.co.com/qRV6Ctg/product-image-2.png"
                  alt="product"
                 className="h-auto object-cover"
                />
              </div>
              <div className="wrapper-content flex flex-col justify-center space-y-6">
                <div className="wrapper-inform space-y-3">
                 
                  <h1 className="text-2xl font-bold">Nike Air Motion Max</h1>
                  <p className="text-base">
                    The combine of breathable mesh without seams for wonderful
                    traditional and modern style to add the perfect amount of
                    flash to make you shine.
                  </p>
                </div>
                <div className="wrapper-detail flex flex-col md:flex-row justify-between items-center">
                  <div className="price">
                    <span className="text-base font-medium">Price:</span>
                    <h3 className="text-lg font-semibold">$199.00</h3>
                  </div>
                </div>
                <div className="wrapper-action space-x-4">
                  <button onClick={handleProductHomeClick}
                    className="btn bg-gray-800 text-white py-2 px-6 rounded-lg opacity-50"
                    
                  >
                    Buy Now
                  </button>
                  
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
