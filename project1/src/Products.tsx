import React from "react";

export const Products = () => {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Handle</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
