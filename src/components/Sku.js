import { useState } from "react"

function Sku({ id, label, totalUnits, price, handleOrderItem })
{
    //const [youPay, setYouPay] = useState("$0.00")
    const [youPay, setYouPay] = useState(0)

    //handles unit quantity change
    function handleUnitQtyChange(event)
    {
        if (event.target.value == 0 || event.target.value == "" || event.target.value == "NaN")
        {
            setYouPay(0)
        }
        else
        {
            let qty = ( eval(event.target.value) )
            let total = (parseFloat(price * qty / totalUnits)).toFixed(2)
            setYouPay(total)
            
            let orderObj = 
            {
                skuId: id,
                label: label,
                totalQty: qty/totalUnits,
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
            setYouPay(0)
        }
        else
        {
            let total = (parseFloat(price * event.target.value / 100)).toFixed(2)
            setYouPay(total)

            let orderObj = 
            {
                skuId: id,
                label: label,
                totalQty: event.target.value/100,
                price: total
            }

            handleOrderItem(orderObj)
        }
    }

    return (
        <tr>
            <td>{ label }</td>
            <td>{totalUnits == 1_000_000 ? 
                    <div className="noInput"></div>
                    :
                    totalUnits
                }</td>
            <td>${ price }</td>
            <td>
                {totalUnits == 1_000_000 ? 
                    <div className="noInput"></div>
                    :
                    <input className="orderInput" onChange={ handleUnitQtyChange }></input>
                }
            </td>
            <td>
                {totalUnits == 1_000_000 ? 
                    <input className="orderInput" onChange={ handleAbsQtyChange }></input>
                    :
                    <div className="noInput"></div>
                }
                <p className="percentage">%</p>
            </td>
            <td>${youPay}</td>
        </tr>
    )
}

export default Sku