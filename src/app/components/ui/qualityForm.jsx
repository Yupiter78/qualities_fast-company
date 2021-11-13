import React from "react";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import colors from "../../constants/colors.json";
import useForm from "../../hooks/useForm";
import PropTypes from "prop-types";

const QualityForm = ({ onSubmit }) => {
    const { form, handleSubmit, handleChange } = useForm({}, onSubmit);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Наименование"
                name="name"
                onChange={handleChange}
                value={form.name || ""}
            />
            <SelectField
                label="Цвет"
                name="color"
                options={colors}
                onChange={handleChange}
                value={form.color || ""}
            />
            <button className="btn btn-primary">Submit</button>
        </form>
    );
};
QualityForm.propTypes = {
    onSubmit: PropTypes.func
};

export default QualityForm;
