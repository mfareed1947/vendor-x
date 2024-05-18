"use client";
import React, { useMemo } from "react";
import { Formik, Form } from "formik";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import formSchema from "../data/job-form-schema.json";
import FormField from "../components/FormField";
import dynamicValidationSchema from "../utils/dynamicValidationSchema";
import { algoliaSourcingCounter, sourcingIndex } from "../../../lib/algolia";

const Page = () => {
  const initialValues = useMemo(
    () =>
      formSchema.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {}),
    []
  );

  const validationSchema = useMemo(
    () => dynamicValidationSchema(formSchema),
    []
  );

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const uniqueID = new Date().getTime();
      const formattedDate = moment().format("MM/DD/YYYY");
      const { count } = await algoliaSourcingCounter.getObject(
        "algoliaSourcingCounter"
      );

      const newCount = count + 1;

      await algoliaSourcingCounter.partialUpdateObject({
        objectID: "algoliaSourcingCounter",
        count: newCount,
      });
      const algoliaObject = {
        ...values,
        objectID: uniqueID,
        date: formattedDate,
        serial: newCount,
      };
      await sourcingIndex.saveObject(algoliaObject);
      toast.success("Data uploaded successfully");
      resetForm();
    } catch (error) {
      console.error("Error uploading data to Algolia:", error);
      toast.error("Error uploading data");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-9 mt-5 w-[100%] md:w-[90%] mx-auto space-y-8">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        s
      >
        {({ errors, touched, setFieldValue, isSubmitting, values }) => (
          <Form className="bg-[#f1f5f9] border border-gray-300 shadow-2xl rounded-2xl p-2 md:p-6">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-center mb-12 p-5 rounded-t-2xl">
              <h1>Vendor Sourcing Form</h1>
            </div>
            <div className="grid grid-cols-1 mt-4 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {formSchema.map((field, index) => (
                <FormField
                  key={field.name}
                  field={field}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                  serialNumber={index + 1}
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
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Page;
