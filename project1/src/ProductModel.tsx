import React, { ChangeEvent, useState } from "react";
import { Product } from "./DashBoard";

interface ProductModelProps {
  closeModel(): void;
  addProduct(product: Product): void;
}
export const ProductModel: React.FC<ProductModelProps> = ({
  closeModel,
  addProduct,
}) => {
  const [product, setproduct] = useState(
    {
      productName: "",
      productQty: 0,
      email: "",
      category: '',
      discount: '',
      sizes: [],
    });

  const [formValid, setformValid] = useState(false);
  const [emailValid, setemailValid] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newproduct: any = { ...product }
    let propname = event.target.name
    newproduct[propname] = event.target.value;
    setproduct(newproduct);
    handleCheck(newproduct)
    checkemail()
  };

  const handleCheck = (prod: any) => {
    let invalid = false;
    // for (let a in prod) {
    //   if (a !== "sizes") {
    //     if (prod[a] === "") {
    //       invalid = true
    //     }
    //   } else {
    //     if (prod[a].length === 0) {
    //       invalid = true
    //     }
    //   }
    // }

    for (let a in prod) {
      if (a === "productName") {
        if (prod[a].length < 6) {
          invalid = true
        }
      } else if (a === "email") {
        if (checkemail()) {
          invalid = true
        }
      }
    }
    if (invalid) {
      setformValid(false)
    } else {
      setformValid(true)
    }
    console.log("invalid :", invalid)
  }
  const checkemail = () => {
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    if (!pattern.test(product['email'])) {
      setemailValid(false)
      return true
    } else {
      setemailValid(true)
      return false
    }
  }
  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let newProduct: any = { ...product }
    if (newProduct.sizes.indexOf(value) === -1) {
      newProduct.sizes.push(value)
    } else {
      newProduct.sizes.splice(newProduct.sizes.indexOf(value), 1)
    }
    console.log(product)
    setproduct(newProduct)
    handleCheck(newProduct)
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value
    let newProduct: any = { ...product }
    newProduct['category'] = value;
    setproduct(newProduct)
  }
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
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        value={product.productName}
                        onChange={handleChange}
                      />
                      {product.productName.length > 0 &&
                        product.productName.length < 6 &&
                        <p style={{ color: "red" }}>Should Be minimum 6 Characters</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">User Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={product.email}
                        onChange={handleChange}
                      />
                      {!emailValid &&
                        product.email.length > 0 && <p style={{ color: "red" }}>Enter Valid Email</p>}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Product Qty</label>
                      <input
                        type="number"
                        className="form-control"
                        name="productQty"
                        value={product.productQty}
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="mb-3">
                      <label className="form-label">Product Delivery Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="prodDate"
                        value={product.prodDate}
                        onChange={handleChange}
                      />
                    </div> */}

                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label">Product Size</label>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="Normal" onChange={(e) => { handleCheckChange(e) }} />
                        <label className="form-check-label">
                          Normal
  </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="XL" onChange={handleCheckChange} />
                        <label className="form-check-label">
                          XL
  </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="XXL" onChange={handleCheckChange} />
                        <label className="form-check-label">
                          XXL
  </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Product Category</label>
                      <select className="form-select" onChange={handleSelectChange}
                        name="category">
                        <option >Select Product Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Foods">Foods</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Discount Avalilability</label>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="discount" value="yes" onChange={handleChange} />
                        <label className="form-check-label" >
                          Yes
  </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="discount" value="no" onChange={handleChange} />
                        <label className="form-check-label" >
                          No
  </label>
                      </div>
                    </div>

                  </div>
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
                disabled={!formValid}
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
