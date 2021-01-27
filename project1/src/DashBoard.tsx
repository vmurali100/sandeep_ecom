import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAction, deleteProduct, getAllProducts, updateProduct } from "./actions/ProductActions";
import { EditComponent } from "./EditComponent";
import { ProductModel } from "./ProductModel";
import { Products } from "./Products";
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
  const allProducts = useSelector((state: RootStore) => state.products)
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
