function OrderItem({ skuId, totalQty, skus })
{
    const label = skus.find((item) =>
    {
        if (item.id == skuId)
        {
            return item
        }
    })

    const price = skus.find((item) =>
    {
        if (item.id == skuId)
        {
            return item
        }
    })

    return (
        <tr>
            <td> {label.label} </td>
            <td>{totalQty}</td>
            <td>{price.price}</td>
        </tr>
    )
}

export default OrderItem