"use client";

import {
  CreateContainer,
  ImageContainer,
  ImagePreviewer,
  SelectBox,
} from "@/src/styles/Create/CreateStyle";
import React, { useContext, useState } from "react";
import InputField from "../shared/InputField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Select, MenuItem } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "@/src/contexts/AuthContext";
import axios from "axios";

const Create = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [files, setFiles] = useState(null);
  const { user } = useContext(AuthContext);

  const initialValues = {
    carModel: "",
    price: 0,
    phone: "",
    picNumber: 0,
  };

  const numberOfPics = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const validationSchema = Yup.object().shape({
    carModel: Yup.string().required("Car Model is required"),
    price: Yup.number().required("Price is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(11, "Phone number must be 11 digits")
      .max(11, "Phone number must be 11 digits"),
    picNumber: Yup.number()
      .oneOf(numberOfPics, "Please select valid options")
      .required("Please select number of images"),
  });

  const {
    values,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      console.log(files);
      try {
        if (!files || files.length === 0) {
          toast.error("Please select images");
          return;
        }
        let uploadedUrls = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "car_preset");
          try {
            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/hamza7681/image/upload",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            uploadedUrls.push(response.data.secure_url);
          } catch (error) {
            console.error(error);
          }
        }
        let finalData = {
          ...values,
          userId: user._id,
          images: uploadedUrls,
        };
        const res = await axios.post(
          "http://localhost:5000/api/create",
          finalData
        );
        if (res) {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      } finally {
        setSubmitting(false);
        resetForm();
        setFiles(null);
        setImagePreviews([]);
      }
    },
  });

  const handleImages = (e) => {
    const file = e.target.files;
    if (file.length > values.picNumber) {
      toast.error(
        `You can select maximum ${values.picNumber} image${
          values.picNumber === 1 ? "" : "s"
        }`
      );
    } else {
      setFiles(file);
      const previews = [];
      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          previews.push(event.target.result);
          setImagePreviews(previews);
        };
        reader.readAsDataURL(file[i]);
      }
    }
  };

  return (
    <CreateContainer>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Car Model"
          type="text"
          placeholder="Enter your car model"
          name="carModel"
          value={values.carModel}
          handleChange={handleChange}
          error={errors.carModel}
          touched={touched.carModel}
          handleBlur={handleBlur}
        />
        <InputField
          label="Price"
          type="number"
          placeholder="Enter your car price"
          name="price"
          value={values.price}
          handleChange={handleChange}
          error={errors.price}
          touched={touched.price}
          handleBlur={handleBlur}
        />
        <InputField
          label="Phone"
          type="text"
          placeholder="Enter your phone"
          name="phone"
          value={values.phone}
          handleChange={handleChange}
          error={errors.phone}
          touched={touched.phone}
          handleBlur={handleBlur}
        />
        <SelectBox>
          <label id="demo-simple-select-label">Number of Pics</label>
          <Select
            id="demo-simple-select-label"
            name="picNumber"
            value={values.picNumber}
            onChange={(e) => {
              handleChange(e);
              setImagePreviews([]);
              setFiles(null);
            }}
            className="number-pics"
            size="small"
            onBlur={handleBlur}
          >
            <MenuItem value={0}>Please select number of images</MenuItem>
            {numberOfPics.map((x) => (
              <MenuItem key={x} value={x}>
                {x}
              </MenuItem>
            ))}
          </Select>
          {errors.picNumber && touched.picNumber && (
            <p className="error">{errors.picNumber}</p>
          )}
        </SelectBox>
        {values.picNumber > 0 && (
          <ImageContainer htmlFor="images-file">
            <AddAPhoto sx={{ color: "#c3c3c3" }} />
          </ImageContainer>
        )}
        <input
          id="images-file"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleImages}
        />
        <ImagePreviewer>
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index}`} />
          ))}
        </ImagePreviewer>
        <button type="submit">
          {isSubmitting ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </CreateContainer>
  );
};

export default Create;
