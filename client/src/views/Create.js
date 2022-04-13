import {useState} from "react";
import axios from "axios";
import AuthorForm from "../components/AuthorForm/AuthorForm";
import {Link} from "react-router-dom";

const Create = props => {
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]);
    const cancelCallback = () => props.history.push('/')

    const createAuthor = author => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        //hacer una petición POST para crear un nuevo autor y agregarlo a la lista de autores
        axios.post('http://localhost:8000/api/authors/create', author, config)
            .then(() => props.history.push('/'))
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            });
    }

    return (
        <>
            <Link to='/'>Home</Link>
            <AuthorForm errors={errors} doCancel={cancelCallback} onSubmitProperty={createAuthor}
                        initialName='' formTitle="Add a new author" />
        </>
    )
}

export default Create;
