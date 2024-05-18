import * as Yup from "yup";

const dynamicValidationSchema = (schema) => {
  let shape = {};
  schema.forEach((field) => {
    let validator;

    switch (field.type) {
      case "email":
        validator = Yup.string().email("Invalid email address");
        break;
      case "number":
        validator = Yup.number().typeError("Must be a number");
        if (field.min !== undefined) {
          validator = validator.min(field.min, `Must be at least ${field.min}`);
        }
        if (field.max !== undefined) {
          validator = validator.max(field.max, `Must be at most ${field.max}`);
        }
        break;
      case "react-select":
        validator = Yup.array().of(
          Yup.object().shape({
            label: Yup.string().required("Label is required"),
            value: Yup.string().required("Value is required"),
          })
        );
        break;
      case "textarea-react-select":
        validator = Yup.array().of(
          Yup.object().shape({
            label: Yup.string().required("Label is required"),
            value: Yup.string().required("Value is required"),
          })
        );
        break;
      case "react-select-dropdown":
        validator = Yup.array().of(
          Yup.object().shape({
            label: Yup.string().required("Label is required"),
            value: Yup.string().required("Value is required"),
          })
        );
        break;
      default:
        validator = Yup.string();
        if (field.maxLength) {
          validator = validator.max(
            field.maxLength,
            `Must be at most ${field.maxLength} characters`
          );
        }
        break;
    }

    if (field.required) {
      validator = validator.required(`${field.alias} is required`);
    }

    shape[field.name] = validator;
  });

  return Yup.object().shape(shape);
};

export default dynamicValidationSchema;
