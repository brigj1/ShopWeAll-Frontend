import Sku from "./Sku"
import Order from "./Order"

function Home( { names, orders, skus } ) {

    //finds the shopper name
    const shopperName = names.map(name_obj => 
    {
        if (name_obj.name === 'Billy')
        {
            return name_obj.name
        }
    })

    //finds the shop date
    const shopDate = orders.map(date_obj => 
        {
            if (date_obj.shop_date === '2022-06-25')
            {
                return date_obj.shop_date
            }
        })

    //list of skus
    const skuList = skus.map((item) =>
    {
        return (
            <Sku label={ item.label } totalUnits={ item.unit_count } price={ item.price } />
        )
    })

    //list of orders
    const shoppingList = orders.map((item) =>
    {
        return (
            <Order />
        )
    })

    return (
        <div>
            <div className="shoppingInfoContainer">
                <h2>{ shopperName[0]}</h2>
                <h2>{ shopDate[0] }</h2>
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