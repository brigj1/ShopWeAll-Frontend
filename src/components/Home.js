function Home( { names, orders } ) {

    const shopperName = names.map(name_obj => 
    {
        if (name_obj.name === 'Billy')
        {
            return name_obj.name
        }
    })

    const shopDate = orders.map(date_obj => 
        {
            if (date_obj.shop_date === '2022-06-25')
            {
                return date_obj.shop_date
            }
        })

    return (
        <div>
            <h2>{ shopperName[0]}</h2>
            <h2>{ shopDate[0] }</h2>
            <h2>Store: Costco</h2>
        </div>
    )
}

export default Home