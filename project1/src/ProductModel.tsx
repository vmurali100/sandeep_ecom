import React, { ChangeEvent, PropsWithChildren, useState } from "react";
import { Product } from "./DashBoard";

interface ProductModelProps {
  closeModel(): void;
  addProduct(product: Product): void;
}
export const ProductModel: React.FC<ProductModelProps> = ({
  closeModel,
  addProduct,
}) => {
  const [product, setproduct] = useState({ productName: "" });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let product: Product = {
      productName: "",
    };
    product.productName = event.target.value;
    setproduct(product);
  };
  return (
    <div>
      <div
        aria-labelledby="exampleModalLabel"
        style={{ display: "block !important" }}
      >
        <div className="productModal" onClick={closeModel}></div>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModel}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={product.productName}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  addProduct(product);
                }}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
