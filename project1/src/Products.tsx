import React, { useEffect, useState } from "react";
import { Product } from "./DashBoard";

type ProductsWithProps = {
  allProducts: Product[],
  handleEdit(i: number): void,
  hanldeDelete(i: number): void
  handleSort(sortName: string): void,
  tableHeaders: any[],

}

export const Products: React.FC<ProductsWithProps> = ({ tableHeaders, handleSort, allProducts, handleEdit, hanldeDelete }) => {
  const [allProductsDetails, setallProductsDetails] = useState([]);
  const [noofRecords, setnoofRecords] = useState(5)
  const [pages, setpages] = useState(0)

  useEffect(() => {
    const getProdInfo: any = allProducts
    console.log(getProdInfo)
    setallProductsDetails(getProdInfo)
  }, [allProducts])

  const goToPage = (num: any) => {
    console.log(" goToPage called", num)
    let startIndex = (num * 5) - noofRecords;
    let endIndex = noofRecords;
    let pagedData: any = [...allProducts].splice(startIndex, endIndex)
    setallProductsDetails(pagedData)

  }
  const handlePageNos = () => {
    return Math.round([...allProducts].length / noofRecords)
  }
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            {tableHeaders.map(header =>
              <th onClick={() => { handleSort(header.headerString) }}>{header.headerName} <i className="bi bi-arrow-up"></i>
              </th>
            )}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allProductsDetails.map((product, i) => {
            if (i < noofRecords) {
              return <tr key={i}>
                {Object.values(product).map((val: any, j) => <td key={j}>{val}</td>)}
                <td><button className="btn btn-warning" onClick={() => { handleEdit(i) }}>Edit</button></td>
                <td><button className="btn btn-danger" onClick={() => { hanldeDelete(i) }}>Delete</button></td>
              </tr>
            }
          })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <PageNation pages={handlePageNos()} goToPage={goToPage} />
      </nav>
    </div>
  );
};

type PageNationProps = {
  pages: number,
  goToPage(num: any): void
}

const PageNation: React.FC<PageNationProps> = ({ pages, goToPage }) => {
  let i = 0
  let nums = []
  while (i < pages) {
    nums.push(i)
    i++
  }
  return <ul className="pagination">
    <li className="page-item prev" ><a className="page-link" href="#" onClick={() => { goToPage(-1) }} >Previous</a></li>
    {nums.map((num) => {
      return <li className="page-item"><a className="page-link" href="#" onClick={() => { goToPage(num + 1) }}>{num + 1}</a></li>
    })}
    <li className="page-item"><a className="page-link" href="#" onClick={() => { goToPage(+1) }}>Next</a></li>
  </ul>
}