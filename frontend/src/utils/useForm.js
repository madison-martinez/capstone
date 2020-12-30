import { useState } from 'react';



export default function useForm(initialState = {}) {
    const [values, setValues] = useState(initialState);
    const [ selectedId, setSelectedId ] = useState(0);


    function handleChange(e) {
        let { value, name, type } = e.target;
        if (type === 'number') {
            value = parseInt(value);
        }
        if (type === 'file') {
            [value] = e.target.files;
        }
        setValues({
            ...values,
            [name]: value
        });
    }

    function clearForm() {
        const emptyForm = Object.fromEntries(
            Object.entries(values).map(([key]) => [key, ''])
        );
        setValues(emptyForm);
    }

    function setInitialForm() {
        setValues(initialState);
    }

    function selectId() {
        setSelectedId(selectedId);
    }

    return {
        values, 
        setValues,
        handleChange, 
        clearForm, 
        setInitialForm,
        selectId
    }
}