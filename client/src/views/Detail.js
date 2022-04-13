import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Detail = props => {
    const [author, setAuthor] = useState({});

    const deleteAuthor = (authorId) => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.delete('http://localhost:8000/api/authors/delete/' + authorId, config)
            .then(response => {
                console.log(response);
                props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        const config = {
            headers: {
                'api-token': localStorage.getItem('token')
            }
        }
        axios.get('http://localhost:8000/api/authors/read/' + props.match.params.id, config)
            .then(response => setAuthor(response.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <h2>{author.name}</h2>
            <Link to={'/' + author._id + '/edit'}>Edit</Link> | <button onClick={() => deleteAuthor(author._id)}>
                                                                 Delete
                                                             </button>
        </>
    );
}

export default Detail;
