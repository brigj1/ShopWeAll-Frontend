import Dropdown from "react-bootstrap/Dropdown";

function Name({ name, changeName })
{
    return (
        <Dropdown.Item as="button" onClick={ changeName } value={ name }>{ name }</Dropdown.Item>
    )
}
export default Name