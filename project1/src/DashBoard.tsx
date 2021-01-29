import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction, deleteProduct, getAllProducts, searchProduct, updateProduct } from "./actions/ProductActions";
import { EditComponent } from "./EditComponent";
import { ProductModel } from "./ProductModel";
import { Products } from "./Products";
import { Search } from "./Search";
import { RootStore } from './store/store'

export interface Product {
  productName: string;
  productQty: number;
  category: string;
  discount: string;
  sizes: string[];
  email: string;
  prodDate?: Date;
  id?: number
}
export interface Size {
  type: string;
  checked: boolean
}
export const DashBoard: React.FC<any> = () => {
  const allProducts = useSelector((state: RootStore) => state.products);
  const [showModal, setshowModal] = useState(false);
  const [selectedProduct, setselectedProduct] = useState({
    productName: "",
    productQty: 0,
    email: "",
    category: '',
    discount: '',
    sizes: [],
  })
  const [selectedSizes, setselectedSizes] = useState([
    {
      type: 'Normal',
      checked: false
    },
    {
      type: 'XL',
      checked: false

    },
    {
      type: 'XXL',
      checked: false

    }
  ])
  // const [allProducts, setallProducts] = useState([]);
  const [showEdit, setshowEdit] = useState(false);
  const [index, setindex] = useState(0)
  const [sizes, setsizes] = useState([
    {
      type: 'Normal',
      checked: false
    },
    {
      type: 'XL',
      checked: false

    },
    {
      type: 'XXL',
      checked: false

    }
  ])
  const [discounts, setdiscounts] = useState([
    {
      type: "yes",
      checked: false
    },
    {
      type: "no",
      checked: false
    }
  ])
  const [product, setproduct] = useState({
    productName: "",
    productQty: 0,
    email: "",
    category: '',
    discount: '',
    sizes: [],
  })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

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
    // let products: any = [...allProducts]
    // products.push(product);
    // setallProducts(products)
    handleModalClose();
    dispatch(addProductAction(product))
  };

  const handleEdit = (i: number) => {
    setshowEdit(true)
    setindex(i)
    let selectedProduct: any = allProducts[i]
    let allSizes = [...sizes]
    sizes.forEach((size) => {
      size.checked = false
      selectedProduct['sizes'].forEach((s: any) => {
        if (size.type == s) {
          size.checked = true
        }
      })
    })
    setsizes(allSizes)
    let allDiscounts = [...discounts]
    allDiscounts.forEach((discount) => {
      if (discount.type === selectedProduct.discount) {
        discount.checked = true
      }
    })
    setdiscounts(allDiscounts)
    setselectedSizes(allSizes)
    setselectedProduct(selectedProduct)
  }
  const hanldeDelete = (i: number) => {
    console.log(allProducts[i])
    let newProducts: any = [...allProducts];

    dispatch(deleteProduct(newProducts[i].id))
    // console.log("hanldeDelete called " + i)
    // let newProducts = [...allProducts];
    // newProducts.splice(i, 1);
    // setallProducts(newProducts)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newProduct: any = { ...selectedProduct }
    newProduct[e.target.name] = e.target.value
    setselectedProduct(newProduct)
  }

  const handleCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newProduct: any = { ...product }
    newProduct[e.target.name] = e.target.value
    setproduct(newProduct);
    let allDiscounts = [...discounts]
    allDiscounts.forEach(discount => {
      if (e.target.value === discount.type) {
        discount.checked = true
      } else {
        discount.checked = false
      }
    })
    setdiscounts(allDiscounts)
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let newProduct: any = { ...selectedProduct }
    newProduct[e.target.name] = e.target.value
    setselectedProduct(newProduct)

  }

  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    let newSizes = [...sizes];
    let selectedProd = { ...selectedProduct }
    newSizes.forEach((size) => {
      if (size.type == val) {
        if (size.checked) {
          size.checked = false
        } else {
          size.checked = true
        }
      }

    })
    setsizes(newSizes)
  }
  const handleUpdate = () => {
    let newProducts: any = [...allProducts]
    newProducts[index] = selectedProduct;
    let selectedSizes: string[] = []
    sizes.forEach((size: Size) => {
      if (size.checked) {
        selectedSizes.push(size.type)
      }
    })
    discounts.forEach(discount => {
      if (discount.checked) {
        newProducts[index].discount = discount.type
      }
    })
    newProducts[index].sizes = selectedSizes;
    dispatch(updateProduct(newProducts[index]))
    setshowEdit(false)
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    let val = e.target.value
    let defaultProducts = [...allProducts];
    let filteredProducts: any = []
    if (val.length == 0) {
      dispatch(getAllProducts())
    } else {
      // filtering Logic Comes Here
      // for (let a in selectedProduct) {
      //   if (a !== "sizes") {

      //     // filteredProducts = defaultProducts.filter((prod: any) => prod.productName.toLowerCase().indexOf(val.toLowerCase()) > -1)
      //   }
      // }
      filteredProducts = defaultProducts.filter((prod: any) => {
        let check = false;
        for (let a in prod) {
          if (a !== "sizes" && a !== "id") {
            if (prod[a].indexOf(val) > -1) {
              check = true
            }
          } else if (a === "sizes") {
            // eslint-disable-next-line no-loop-func
            prod[a].forEach((pVal: string) => {
              if (pVal.indexOf(val) > -1) {
                check = true
              }
            })
          }
        }
        if (check) {
          return prod
        }
      })
      dispatch(searchProduct(filteredProducts))
    }
  }
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
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">
            <div className="col text-end">
              <Search handleSearch={handleSearch} />
            </div>
          </div>
        </div>
        <Products allProducts={allProducts} handleEdit={handleEdit} hanldeDelete={hanldeDelete} />
        {showEdit && <EditComponent
          product={selectedProduct}
          handleChange={handleChange}
          handleCheckChange={handleCheckChange}
          handleSelectChange={handleSelectChange}
          sizes={sizes}
          discounts={discounts}
          handleUpdate={handleUpdate}
          handleSizeChange={handleSizeChange}
        />}
        {showModal && (
          <ProductModel closeModel={handleModalClose} addProduct={addProduct} />
        )}
      </div>
    </div>
  );
};
