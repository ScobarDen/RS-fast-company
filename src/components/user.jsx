import Quality from "./quality";

const User = (props) => {
    return (
        <tr key={props._id}>
            <td>{props.name}</td>
            <td>{props.qualities
                .map(item => <Quality
                    {...item}
                    key={item._id}
                />)}</td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate}</td>
            <td>
                <button
                    onClick={() => props.onDelete(props._id)}
                    className="btn btn-danger">Удалить
                </button>
            </td>
        </tr>
    );
};

export default User;