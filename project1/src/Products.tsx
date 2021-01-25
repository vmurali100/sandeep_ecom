import React from "react";
import { Product } from "./DashBoard";

type ProductsWithProps = {
  allProducts: Product[],
  handleEdit(i: number): void,
  hanldeDelete(i: number): void
}

export const Products: React.FC<ProductsWithProps> = ({ allProducts, handleEdit, hanldeDelete }) => {
  console.log(allProducts)
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Procut Qty</th>
            <th>Email</th>
            <th>Procuct Catagory</th>
            <th>Discount</th>
            <th>Sizes</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((product, i) => <tr key={i}>
            {Object.values(product).map((val, j) => <td key={j}>{val}</td>)}
            <td><button className="btn btn-warning" onClick={() => { handleEdit(i) }}>Edit</button></td>
            <td><button className="btn btn-danger" onClick={() => { hanldeDelete(i) }}>Delete</button></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};
