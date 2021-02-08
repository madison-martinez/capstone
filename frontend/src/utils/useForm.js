import { useState } from 'react';



export default function useForm(initialState = {}) {
    const [values, setValues] = useState(initialState);

    function handleChange(e) {
        let { value, name, type } = e.target;

        if (type === 'select') {
            value = e.target.value;
        }

        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSelect = (e) => {
        const roleSelection = e.target.value;
        setValues({ 
            ...values,
            role: roleSelection 
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
        handleSelect,
    }
};