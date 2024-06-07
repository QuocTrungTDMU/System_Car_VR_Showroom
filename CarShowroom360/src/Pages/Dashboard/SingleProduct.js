import React from 'react';

const SingleProduct = ({ product, index, refetch }) => {
    return (

        <tr>
            <th>{index + 1}</th>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.minimumQuantity}</td>
            <td>{product.stock}</td>

        </tr>


    );
};

export default SingleProduct;