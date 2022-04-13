import {useEffect, useState} from "react";
import axios from "axios";
import AuthorForm from "../components/AuthorForm/AuthorForm";
import {Link} from "react-router-dom";

const Update = props => {
    const [author, setAuthor] = useState({});
    const [loading, setLoading] = useState(true);
    //Create an array to store errors from the API
    const [errors, setErrors] = useState([]);
    const cancelCallback = () => props.history.push('/')

    // buscar el autor a actualizar
    useEffect(() => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8000/api/authors/read/' + props.match.params.id, config)
            .then(response => {
                setAuthor(response.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const updateAuthor = author => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        //hacer una petición PUT para actualizar un autor específico
        axios.put('http://localhost:8000/api/authors/update/' + props.match.params.id, author, config)
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
            {
                loading ? <h2>Loading...</h2> : <AuthorForm errors={errors} doCancel={cancelCallback}
                                                            onSubmitProperty={updateAuthor}
                                                            initialName={author.name} formTitle="Edith this author" />
            }
        </>
    )
}

export default Update;
