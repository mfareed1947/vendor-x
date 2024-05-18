import React from "react";
import { Formik, Form } from "formik";
import FormField from "@/app/components/FormField";
import { ToastContainer } from "react-toastify";
const VendorForm = ({
  initialValues,
  validationSchema,
  handleSubmit,
  formSchema,
  handleFileChange,
}) => {
  return (
    <div className="p-4 sm:p-6 md:p-9 mt-5 w-[100%] md:w-[90%] mx-auto space-y-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue, values, isSubmitting }) => (
          <div className="bg-[#F1F5F9] border border-gray-300 shadow-2xl rounded-2xl p-2 md:p-6">
            <div className="text-[17px] sm:text-[20px] md:text-[25px] lg:text-[27px] font-extrabold text-center mb-12 p-5 rounded-t-2xl ">
              <h1>Vendor Onboarding Form</h1>
            </div>
            <Form>
              <div className="grid grid-cols-1 mt-[13px] md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-5 md:gap-14 lg:gap-10">
                {formSchema.map((field, index) => (
                  <FormField
                    key={field.name}
                    field={field}
                    errors={errors}
                    touched={touched}
                    values={values}
                    handleFileChange={handleFileChange}
                    setFieldValue={setFieldValue}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-black hover:bg-gray-950 text-white font-bold mt-5 py-2 px-8 rounded disabled:opacity-30"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};
export default VendorForm;
