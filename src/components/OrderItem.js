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

    const calculatedPrice = (price.price * totalQty).toFixed(2)

    return (
        <tr>
            <td> {label.label} </td>
            <td>{totalQty}</td>
            <td>${calculatedPrice}</td>
        </tr>
    )
}

export default OrderItem