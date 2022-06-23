import Sku from "./Sku"
import OrderItem from "./OrderItem"
import { useState } from "react"

function Home( { names, orders, skus, handleAddOrderItem } ) {

    //finds the shopper name
    const shopperName = names.map(name_obj => 
    {
        if (name_obj.name === 'Billy')
        {
            return name_obj.name
        }
    })

    const shopYear = orders.map((item) =>
    {
        if (item.year == '2022')
        {
            return item.year
        }
    })

    const shopMonth = orders.map((item) =>
    {
        if (item.month == '06')
        {
            return item.month
        }
    })

    const shopDay = orders.map((item) =>
    {
        if (item.day == '25')
        {
            return item.day
        }
    })

    //get Billy name id
    const nameId = names.map((item) =>
    {
        if (item.name === 'Billy')
        {
            return item.id
        }
    })

    //list of orders
    const [orderItem, setOrderItem] = useState("")
    const handleOrderItem = (order) =>
    {
        setOrderItem(order)
    }

    const shoppingList = orders.map((item) =>
    {
        return (
            <OrderItem skuId={ item.sku_id } totalQty={ item.quantity } skus={ skus }/>
        )
    })

    //adds input to orders
    function submitInputs()
    {
        let submitOrderObj = 
        {
            sku_id: parseInt(orderItem.skuId),
            quantity: parseFloat(orderItem.totalQty),
            name_id: parseInt(nameId[0]),
            year: parseInt(shopYear[0]),
            month: parseInt(shopMonth[0]),
            day: parseInt(shopDay[0])
        }

        //finding whether post or patch
        const filteredOrders = orders.filter((item) =>
        {
            if (item.name_id == nameId[0] && item.year == shopYear[0] && item.month == shopMonth[0] && item.day == shopDay[0] && item.sku_id == orderItem.skuId)
            {
                return (item)
            }
        })

        const filteredOrderId = filteredOrders.map((item) =>
        {
            return item.id
        })

        if (filteredOrders == "")
        {
            fetch("http://localhost:9292/orders", 
            {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitOrderObj)
            })
            .then(resp => resp.json())
            .then(data => handleAddOrderItem(data)) 
        }
        else
        {
            fetch(`http://localhost:9292/orders/${filteredOrderId[0]}`,
            {
                method: "PATCH",
                headers:
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submitOrderObj)
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
        }
    }

    //list of skus
    const skuList = skus.map((item) =>
    {
        return (
            <Sku id={item.id} label={ item.label } totalUnits={ item.unit_count } price={ item.price } handleOrderItem={ handleOrderItem } />
        )
    })

    return (
        <div>
            <div className="shoppingInfoContainer">
                <h2>{ shopperName[0]}</h2>
                <h2>{ shopYear[0] }-{ shopMonth[0] }-{ shopDay[0] } </h2>
                <h2>Store: Costco</h2>
            </div>
            <div className="orderInputContainer">
                <h3>Name: Billy</h3>
                <div className="orderInputs">
                    <table class="orderInputTable">
                        <thead>
                            <th scope="col">Label</th>
                            <th scope="col">Total Units</th>
                            <th scope="col">Price</th>
                            <th scope="col">Unit Qty</th>
                            <th scope="col">Abs Qty</th>
                            <th scope="col">You pay:</th>
                        </thead>
                        <tbody>
                            { skuList }
                        </tbody>
                    </table>
                    <button onClick={submitInputs}>Submit</button>
                </div>
            </div>
            <div className="shoppingListContainer">
                <h3>Orders</h3>
                <table className="shoppingListLines">
                    <thead>
                        <th scope="col">Label</th>
                        <th scope="col">Total Qty</th>
                        <th scope="col">Price</th>
                    </thead>
                    <tbody>
                        { shoppingList }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home