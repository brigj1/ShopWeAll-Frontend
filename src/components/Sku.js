import { useState } from "react"

function Sku({ id, label, totalUnits, price, handleOrderItem })
{
    const [youPay, setYouPay] = useState("$0.00")

    //handles unit quantity change
    function handleUnitQtyChange(event)
    {
        if (event.target.value == 0 || event.target.value == "" || event.target.value == "NaN")
        {
            setYouPay("$0.00")
        }
        else
        {
            let qty = ( eval(event.target.value) )
            let total = (price * qty).toFixed(2)
            setYouPay(total)
            
            let orderObj = 
            {
                skuId: id,
                label: label,
                totalQty: qty,
                price: total
            }

            handleOrderItem(orderObj)
        }
    }

    //handles abs quantity change
    function handleAbsQtyChange(event)
    {
        if (event.target.value == 0 || event.target.value == "")
        {
            setYouPay("$0.00")
        }
        else
        {
            let total = (price * event.target.value).toFixed(2)
            setYouPay(total)

            let orderObj = 
            {
                skuId: id,
                label: label,
                totalQty: event.target.value,
                price: total
            }

            handleOrderItem(orderObj)
        }
    }

    return (
        <tr>
            <td>{ label }</td>
            <td>{totalUnits == 1000000 ? 
                    <div className="noInput"></div>
                    :
                    totalUnits
                }</td>
            <td>{ price }</td>
            <td>
                {totalUnits == 1000000 ? 
                    <div className="noInput"></div>
                    :
                    <input className="orderInput" onChange={ handleUnitQtyChange }></input>
                }
            </td>
            <td>
                {totalUnits == 1000000 ? 
                    <input className="orderInput" onChange={ handleAbsQtyChange }></input>
                    :
                    <div className="noInput"></div>
                }
                <p className="percentage">%</p>
            </td>
            <td>{youPay}</td>
        </tr>
    )
}

export default Sku