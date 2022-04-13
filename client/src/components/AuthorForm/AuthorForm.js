import {useState} from "react";

const AuthorForm = props => {
    // desestructuramos las props
    const {errors, doCancel, onSubmitProperty, initialName, formTitle} = props;
    // mantener el control de lo que se escribe a través del gancho useState
    const [name, setName] = useState(initialName);
    //gestor cuando se envía el formulario
    const onSubmitHandler = event => {
        //evitar el comportamiento por defecto de submit
        event.preventDefault();
        // Invocamos una función que maneja tanto la creación como la actualización. La diferencia entre ambos casos,
        // es manejado por una propiedad.
        onSubmitProperty({name});
    }
    //onChange para actualizar name
    return (
        <form onSubmit={onSubmitHandler}>
            <p>{formTitle}</p>
            {errors.map((error, index) => <p key={'error' + index}>{error}</p>)}
            <p>
                <label>Name: </label>
                <input type="text" name="name" value={name}
                       onChange = {event => setName(event.target.value)} />
            </p>
            <button onClick={doCancel}>Cancel</button>
            <input type="submit" />
        </form>
    )
}

export default AuthorForm;
