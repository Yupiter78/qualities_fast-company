import { useState } from "react";

const useForm = (initialState = {}, onSubmit) => {
    const [form, setForm] = useState(initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(form);
    };
    const handleChange = (target) => {
        console.log(target);
        setForm((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return { handleSubmit, form, handleChange };
};

export default useForm;
