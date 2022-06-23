import { useState } from "react"

function OrderItem({ skuId, totalQty, skus, orderPrice, nameId, names, deleteInput, orderId})
{

    const label = skus.find((item) =>
    {
        if (item.id == skuId)
        {
            return item
        }
    })

    const name = names.find((item) =>
    {
        if (item.id == nameId)
        {
            return item
        }
    })

    return (
        <tr>
            <td>{ name.name } </td>
            <td> {label.label} </td>
            <td>{totalQty}</td>
            <td>{ orderPrice } </td>
            <button onClick={ deleteInput } value={ orderId }>Delete</button>
        </tr>
    )
}

export default OrderItem