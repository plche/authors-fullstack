import axios from "axios";

const DeleteButton = props => {
    const {authorId, successCallback} = props;
    const deleteAuthor = () => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.delete('http://localhost:8000/api/authors/delete/' + authorId, config)
            .then(() => successCallback())
            .catch(err => console.log(err));
    }
    return <button onClick={deleteAuthor}>Delete</button>
}

export default DeleteButton;
