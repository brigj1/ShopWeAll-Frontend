function Sku({ label, totalUnits, price })
{
    return (
        <tr>
            <td>{ label }</td>
            <td>{ totalUnits }</td>
            <td>{ price }</td>
        </tr>
    )
}

export default Sku