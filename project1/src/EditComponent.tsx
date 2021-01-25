import React, { ChangeEvent } from 'react'
import { Product } from './DashBoard'

type EditComponentProps = {
    product: Product,
    handleChange(event: ChangeEvent): void,
    handleCheckChange(event: ChangeEvent): void,
    handleSelectChange(event: ChangeEvent): void,
    handleSizeChange(event: ChangeEvent): void
    handleUpdate(): void,
    sizes: any[],
    discounts: any[]
}

export const EditComponent: React.FC<EditComponentProps> = ({ product, handleChange, handleCheckChange, handleSelectChange, sizes, discounts, handleUpdate, handleSizeChange }) => {
    console.log(product)
    return (
        <div>
            <h2>Welcome to Edit Component</h2>
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
                                onChange={(e) => { handleChange(e) }}
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

                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label className="form-label">Product Size</label>
                            {sizes.map((size) => {
                                return <div className="form-check">
                                    <input className="form-check-input" checked={size.checked} type="checkbox" value={size.type} name={size.type} onChange={(e) => { handleSizeChange(e) }} />
                                    <label className="form-check-label">
                                        {size.type}
                                    </label>
                                </div>
                            })}

                        </div>

                        <div className="mb-3">
                            <label className="form-label">Product Category</label>
                            <select className="form-select" onChange={handleSelectChange}
                                name="category" value={product.category}>
                                <option >Select Product Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Foods">Foods</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Discount Avalilability</label>
                            {discounts.map((discount) => {
                                return <div className="form-check">
                                    <input className="form-check-input" type="radio" checked={discount.checked} name="discount" value={discount.type} onChange={handleCheckChange} />
                                    <label className="form-check-label" >
                                        {discount.type}
                                    </label>
                                </div>
                            })}

                        </div>
                        <button className="btn btn-primary" type="button" onClick={handleUpdate}>Update </button>
                    </div>
                </div>
            </form>

        </div>
    )
}
