const Button = ({id,handleDelete}) => {
    return <button
        className="btn btn-danger"
        onClick={() => handleDelete(id)}
    >delete</button>;
}

export default Button;