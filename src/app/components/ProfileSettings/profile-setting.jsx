"use client";
import React, { useMemo, useState } from "react";
import formSchema from "@/app/data/verdor-form-schema.json";
import dynamicValidationSchema from "@/app/utils/dynamicValidationSchema";
import { searchingIndex } from "../../../../lib/algolia";
import "react-toastify/dist/ReactToastify.css";
import VendorForm from "@/app/components/shared/VendorForm"; // Import VendorForm
import { toast } from "react-toastify";
import axios from "axios";

const ProfileSetting = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0], "file");
  };

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
      let imageId = "";
      if (values.company_logo) {
        const file = values.company_logo;
        const formData = new FormData();
        formData.append("file", file);
        console.log("🚀 ~ handleSubmit ~ formData:", formData);
        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageId = uploadResponse.data.fileId;
      }

      const algoliaObject = {
        ...values,
        objectID: uniqueID,
        company_logo: imageId,
      };

      await searchingIndex.saveObject(algoliaObject);
      toast.success("Data uploaded successfully");

      resetForm();
      document.getElementById("file").value = "";
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Error uploading data");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <VendorForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      handleSubmit={handleSubmit}
      formSchema={formSchema}
      handleFileChange={handleFileChange}
    />
  );
};

export default ProfileSetting;
