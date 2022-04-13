import axios from "axios";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DeleteButton from "../DeleteButton/DeleteButton";

const AuthorList = () => {
    const [authors, setAuthors] = useState([]);
    const style = {marginLeft: "auto", marginRight: "auto"}

    // obtenemos todas los autores desde nuestra base de datos, solo una vez se ejecuta: al montarse el componente
    useEffect(() => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8000/api/authors/read/all', config)
            .then(response => {
                setAuthors(response.data);
            })
            .catch(err => console.error(err));
    }, []);

    const removeFromDOM = authorId => setAuthors(authors.filter(author => author._id !== authorId));

    return (
        <>
            <p>We have quotes by:</p>
            <table style={style}>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions available</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author, idx) => <tr key={'author_' + idx}>
                            <td>
                                <Link to={'/' + author._id}>{author.name}</Link>
                            </td>
                            <td>
                                <Link to={'/' + author._id + '/edit'}>
                                    Edit
                                </Link> | <DeleteButton authorId={author._id}
                                                        successCallback={() => removeFromDOM(author._id)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default AuthorList;
