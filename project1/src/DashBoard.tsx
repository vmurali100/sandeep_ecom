import React, { useState } from "react";
import { ProductModel } from "./ProductModel";
import { Products } from "./Products";

export interface Product {
  productName: string;
  gender: string;
  subjett: string;
  state: string;
  age: number;
}
export const DashBoard: React.FC<any> = () => {
  const [showModal, setshowModal] = useState(false);

  const handleModal = () => {
    setshowModal(true);
  };

  const handleModalClose = () => {
    setshowModal(false);
  };
  const handleAddproduct = () => {
    handleModal();
    //Actions
  };

  const addProduct = (product: Product) => {
    handleModalClose();
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

        {showModal && (
          <ProductModel closeModel={handleModalClose} addProduct={addProduct} />
        )}
      </div>
    </div>
  );
};
