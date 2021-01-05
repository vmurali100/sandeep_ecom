import React, { useState } from "react";
import { ProductModel } from "./ProductModel";
import { Products } from "./Products";

const handleAddproduct = () => {
  console.log("handleAddproduct called");
};

export const DashBoard: React.FC<any> = () => {
  const [showModal, setshowModal] = useState(false);

  const handleModal = () => {
    setshowModal(true);
  };

  const closeModel = () => {
    setshowModal(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col text-end">
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: "200px" }}
              onClick={handleAddproduct}
            >
              Add Product
            </button>
          </div>
        </div>
        <Products />
        <button type="button" className="btn btn-primary" onClick={handleModal}>
          Launch demo modal
        </button>
        {showModal && <ProductModel closeModel={closeModel} />}
      </div>
    </div>
  );
};
