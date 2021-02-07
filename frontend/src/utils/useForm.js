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
    
    async function handleImageUpload(e) {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "farmersspecial");
    
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dzqeffkmp/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        setValues({ image: file.secure_url });
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
        handleImageUpload,
        clearForm,
        setInitialForm,
        handleSelect,
    }
};