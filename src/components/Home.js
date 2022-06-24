import Sku from "./Sku"
import OrderItem from "./OrderItem"
import Name from "./Name"
import { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown";

function Home( { names, orders, skus, handleAddOrderItem, handleUpdateOrderItem } ) {

    //finds the shopper name
    const shopperName = names.map(name_obj => 
    {
        if (name_obj.name === 'Billy')
        {
            return name_obj.name
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

    //get shop year
    const shopYear = orders.map((item) =>
    {
        if (item.year == '2022')
        {
            return item.year
        }
    })

    //get shop month
    const shopMonth = orders.map((item) =>
    {
        if (item.month == '06')
        {
            return item.month
        }
    })

    //get shop day
    const shopDay = orders.map((item) =>
    {
        if (item.day == '25')
        {
            return item.day
        }
    })

    //get name and nameId from drop down 
    const [chosenName, setChosenName] = useState("Name")
    const [chosenNameId, setChosenNameId] = useState("")
    function changeName(nameObj)
    {
        setChosenName(nameObj.name)
        setChosenNameId(nameObj.nameId)
    }

    //populate drop down with names
    const nameList = names.map((item) =>
    {
        return (
            <Name nameId={ item.id } name={ item.name } changeName={ changeName }/>
        )
    })

    //list of orders for dom
    const [orderItem, setOrderItem] = useState("")
    const [domItems, setDomItems] = useState([])

    const handleOrderItem = (order) =>
    {
        setOrderItem(order)

        const changeOrder = orders.map((item) =>
        {
          if (item.sku_id == order.skuId)
          {
            return order
          }
          else
          {
            return item
          }
        })
        setDomItems([changeOrder])
    }

    //get shopping list
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
            name_id: parseInt(chosenNameId),
            year: parseInt(shopYear[0]),
            month: parseInt(shopMonth[0]),
            day: parseInt(shopDay[0])
        }

        //finding whether post or patch
        const filteredOrders = orders.filter((item) =>
        {
            if (item.name_id == chosenNameId && item.year == shopYear[0] && item.month == shopMonth[0] && item.day == shopDay[0] && item.sku_id == orderItem.skuId)
            {
                return (item)
            }
        })

        console.log(filteredOrders)

        //get item id for patch request
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
            .then(data => handleUpdateOrderItem(data))
        }
    }

    //list of skus
    const skuList = skus.map((item) =>
    {
        return (
            <Sku
                id = {item.id}
                label = {item.label}
                totalUnits = {item.unit_count}
                price = {item.price}
                handleOrderItem = {handleOrderItem}
            />
        )
    })

    return (
        <div>
            <div className="shoppingInfoContainer">
                <h2>Name: { shopperName[0]}</h2>
                <h2>Shop Date: { shopYear[0] }-{ shopMonth[0] }-{ shopDay[0] } </h2>
                <h2>Store: Costco</h2>
            </div>
            <div className="orderInputContainer">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        { chosenName }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        { nameList }
                    </Dropdown.Menu>
                </Dropdown>
                <div className="orderInputs">
                    <table class="orderInputTable">
                        <thead>
                            <th scope="col">Label</th>
                            <th scope="col">Units/<br></br>Sale</th>
                            <th scope="col">Price</th>
                            <th scope="col">Unit<br></br>Qty</th>
                            <th scope="col">Abs<br></br>Qty</th>
                            <th scope="col">You<br></br>pay:</th>
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
                        <th scope="col">Total<br></br>Qty</th>
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