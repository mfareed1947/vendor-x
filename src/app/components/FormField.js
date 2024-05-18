import { Field, useFormikContext } from "formik";
import React from "react";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";

const ValueContainer = ({ children, ...props }) => {
  return (
    <components.ValueContainer {...props}>
      <textarea
        value={props
          .getValue()
          .map((option) => option.label)
          .join("\n")}
        style={{
          width: "100%",
          height: "40px",
          // border: "2px solid gray",
          marginBottom: "5px",
          borderRadius: "5px",
          // resize: "none",
        }}
      />
      {children}
    </components.ValueContainer>
  );
};

const FormField = ({
  field,
  errors,
  touched,
  setFieldValue,
  values,
  serialNumber,
}) => {
  const handleSelectChange = (selectedOptions) => {
    console.log("🚀 ~ handleSelectChange ~ selectedOptions:", selectedOptions)
    setFieldValue(field.name, selectedOptions);
  };

  const handleFileChange = (event) => {
    console.log("🚀 ~ handleFileChange ~ event:", event)
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      setFieldValue(field.name, files[0]);
    }
  };

  const styleConfig = {
    text: {
      input: "border text-base sm:text-[19px] py-2 px-3",
    },
    textarea: {
      input: "border text-base sm:text-[19px] px-3",
    },
    select: {
      input: "border text-base sm:text-[19px] h-[40px]",
    },
    email: {
      input: "border text-base sm:text-[19px] py-2 px-3",
    },
    number: {
      input: "border text-base sm:text-[19px] py-2 px-3",
    },
    file: {
      input: "border text-sm sm:text-[14px] bg-white py-2 px-3",
    },
  };

  return (
    <div className={`${styleConfig[field.type]?.container || `text-black`}`}>
      <label
        htmlFor={field.name}
        className="block font-semibold text-[12px] sm:text-[14px] lg:text-[16px]"
      >
        {serialNumber}. {field.label}
      </label>
      {field.type === "react-select" ? (
        <CreatableSelect
          options={field.options}
          isMulti
          onChange={handleSelectChange}
          className="basic-multi-select mt-2 cursor-pointer"
          classNamePrefix="select"
          value={values[field.name]}
          placeholder=""
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          noOptionsMessage={() => null}
        />
      ) : field.type === "textarea-react-select" ? (
        <CreatableSelect
          options={field.options}
          isMulti
          onChange={handleSelectChange}
          className="basic-multi-select mt-2 cursor-pointer"
          classNamePrefix="select"
          value={values[field.name]}
          placeholder=""
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            ValueContainer,
          }}
          noOptionsMessage={() => null}
        />
      ) : field.type === "react-select-dropdown" ? (
        <CreatableSelect
          options={field.options}
          isMulti
          onChange={handleSelectChange}
          className="basic-multi-select mt-2 cursor-pointer"
          classNamePrefix="select"
          value={values[field.name]}
          placeholder=""
        />
      ) : field.type === "select" ? (
        <Field
          as="select"
          name={field.name}
          className={`${
            styleConfig[field.type]?.input
          } form-field w-full rounded-[5px] text-black p-1 mt-2 cursor-pointer h-[35px] text-[12px] sm:text-[14px] lg:text-[15px] shadow-[5px] focus:outline-none focus:ring focus:ring-blue-300`}
        >
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-[12px] text-black sm:text-[14px] lg:text-[15px] cursor-pointer"
            >
              {option.label}
            </option>
          ))}
        </Field>
      ) : field.type === "file" ? (
        <input
          id="file"
          accept="image/*"
          name={field.name}
          type="file"
          onChange={handleFileChange}
          className={`${
            styleConfig[field.type]?.input || ""
          } form-field w-full rounded-[5px] p-1 mt-2 shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-300`}
        />
      ) : (
        <Field
          as={field.type === "textarea" ? "textarea" : "input"}
          type={field.type}
          name={field.name}
          rows={field.type === "textarea" ? "8" : undefined}
          className={`${
            styleConfig[field.type]?.input || ""
          } form-field w-full rounded-[5px] p-1 mt-2 shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-300`}
        />
      )}

      {errors[field.name] && touched[field.name] && (
        <div className="error mt-1 text-red-600 text-[12px] md:text-[14px]">
          {errors[field.name]} {/* This will display the error message */}
        </div>
      )}
    </div>
  );
};

export default FormField;
