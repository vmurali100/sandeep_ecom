import React, { ChangeEvent } from 'react'

type SearchCompProps = {
    handleSearch(e: ChangeEvent): void
}
export const Search: React.FC<SearchCompProps> = ({ handleSearch }) => {
    return (
        <div>
            <form>
                <input
                    type="text"
                    className="form-control mt-3"
                    name="productName"
                    placeholder="Search ..."
                    onChange={(e) => { handleSearch(e) }}
                />
            </form>
        </div>
    )
}
