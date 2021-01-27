import { useState } from 'react';



export default function useForm(initialState = {}) {
    const [values, setValues] = useState(initialState);


    function handleChange(e) {
        let { value, name, type } = e.target;
        
        if (type === 'file') {
            [value] = e.target.files;
        }

        if (type === 'select') {
            value = e.target.value;
        }
      
        setValues({
            ...values,
            [name]: value
        });
    };

    function clearForm() {
        const emptyForm = Object.fromEntries(
            Object.entries(values).map(([key]) => [key, ''])
        );
        setValues(emptyForm);
    };

    function setInitialForm() {
        setValues(initialState);
    };

    return {
        values, 
        setValues,
        handleChange, 
        clearForm, 
        setInitialForm,
    }
};