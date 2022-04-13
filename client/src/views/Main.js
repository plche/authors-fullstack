import AuthorList from "../components/AuthorList/AuthorList";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Main = props => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        localStorage.removeItem('token');
        props.history.push('/login');
    }

    // obtenemos todas los autores desde nuestra base de datos, solo una vez se ejecuta: al montarse el componente
    useEffect(() => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        console.log("Main:22: config.headers['api-token'] =", config.headers['api-token']);
        axios.get('http://localhost:8000/api/authors/read/all', config)
            .then(response => {
                setAuthors(response.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const removeFromDOM = authorId => setAuthors(authors.filter(author => author._id !== authorId));

    return (
        <>
            <Link to='/new'>Add an author</Link>
            {
                loading ? <h2>Loading...</h2> : (authors.length !== 0) && <AuthorList authors={authors}
                                                                                      removeFromDOM={removeFromDOM} />
            }
            <p><button onClick={logout}>Logout</button></p>
        </>
    );
}

export default Main;
