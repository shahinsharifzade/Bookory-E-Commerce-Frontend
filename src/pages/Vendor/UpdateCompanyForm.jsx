import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useGetByActiveVendor,
  useUpdateCompany,
} from "../../service/companyService";
import Input from "../../components/ui/FormInput/Input";
import { setResponseErrorMessage } from "../../utils/setResponseErrorMessages";
import ResponseErrorMessage from "../../components/ui/ResponseMessage/ResponseErrorMessage";
import LoadingSpinner from "../../components/ui/Loading/LoadingSpinner";
import { api, authApi } from "../../api";

const UpdateCompanyForm = ({ company, handleClose }) => {
  const [responseErrors, setResponseErrors] = useState({});
  const [responseException, setResponseException] = useState();

  const [selectedBannerImage, setSelectedBannerImage] = useState(
    `${process.env.REACT_APP_IMR_SRC}/assets/images/companies/banner/${company.bannerImage}`,
  );
  const [updateBannerImage, setUpdateBannerImage] = useState(false);
  const [currentBannerImage, setCurrentBannerImage] = useState(
    company.bannerImage,
  );

  const [selectedLogoImage, setSelectedLogoImage] = useState(
    `${process.env.REACT_APP_IMR_SRC}/assets/images/companies/logo/${company.logo}`,
  );
  const [updateLogoImage, setUpdateLogoImage] = useState(false);
  const [currentLogoImage, setCurrentLogoImage] = useState(company.logo);

  const schema = yup.object().shape({
    name: yup.string().required().max(50),
    description: yup.string().required().max(200),
    contactemail: yup.string().required().email(),
    contactphone: yup.string().required(),
    address: yup.string().required().max(200),

    bannerimage: yup.mixed().required("Required"),
    logo: yup.mixed().required("Required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: company.name,
      description: company.description,
      contactemail: company.contactEmail,
      contactphone: company.contactPhone,
      address: company.address,
    },
  });

  const { mutate, isLoading } = useUpdateCompany();

  const convertBannerImagePathToFile = async (imagePath) => {
    try {
      const path = `assets/images/companies/banner/${imagePath}`;
      const response = await authApi.get(`/images?path=${path}`, {
        responseType: "arraybuffer",
      });

      if (response.status === 200) {
        // Process the image data
        const blob = new Blob([response.data], { type: "image/jpeg" });

        // Convert Blob to File
        const file = new File([blob], imagePath, { type: blob.type });

        return file;
      } else {
        console.error("Image not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const convertLogoImagePathToFile = async (imagePath) => {
    try {
      const path = `assets/images/companies/logo/${imagePath}`;
      const response = await authApi.get(`/images?path=${path}`, {
        responseType: "arraybuffer",
      });

      if (response.status === 200) {
        // Process the image data
        const blob = new Blob([response.data], { type: "image/jpeg" });

        // Convert Blob to File
        const file = new File([blob], imagePath, { type: blob.type });

        return file;
      } else {
        console.error("Image not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onSubmit = async (formData) => {
    formData.id = company.id;

    console.log(
      "🚀 ~ file: UpdateCompanyForm.jsx:111 ~ onSubmit ~ updateBannerImage:",
      updateBannerImage,
    );
    if (updateBannerImage) {
      formData.bannerimage = currentBannerImage;
    } else {
      const imageFile = await convertBannerImagePathToFile(currentBannerImage);
      formData.bannerImage = imageFile;
    }

    if (updateLogoImage) {
      formData.logo = currentLogoImage;
    } else {
      const imageFile = await convertLogoImagePathToFile(currentLogoImage);
      formData.logo = imageFile;
    }

    mutate(formData, {
      onSuccess: () => {
        handleClose();
      },

      onError: (res) => {
        if (res.response.data.errors) {
          const errorsData = setResponseErrorMessage(res.response.data.errors);
          setResponseErrors(errorsData);
        }
        if (
          res.response.data.statusCode === 400 ||
          res.response.data.statusCode === 404
        ) {
          setResponseException(res.response.data.message);
        }
      },
    });
  };

  if (isLoading) return <LoadingSpinner isLoading={isLoading} />;

  return (
    <>
      <div
        className="container z-10 mb-16 mt-32 max-w-[600px] rounded-[3rem] bg-white py-8 scrollbar-none"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <h1 className="text-center text-[32px]">Update Store</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-[20px]"
        >
          <div>
            <Input
              name="name"
              register={register}
              placeholder="name"
              type="text"
              error={errors.name}
              responseError={responseErrors.Name}
            />

            <Input
              name="description"
              register={register}
              placeholder="description"
              type="text"
              error={errors.description}
              responseError={responseErrors.Description}
            />

            <Input
              name="contactemail"
              register={register}
              placeholder="contact email"
              type="text"
              error={errors.contactemail}
              responseError={responseErrors.ContactEmail}
            />

            <Input
              name="contactphone"
              register={register}
              placeholder="contact phone"
              type="text"
              error={errors.contactphone}
              responseError={responseErrors.ContactPhone}
            />

            <Input
              name="address"
              register={register}
              placeholder="address"
              type="text"
              error={errors.address}
              responseError={responseErrors.Address}
            />

            <div className="ml-8 text-xl font-medium text-secondartTextBold">
              Banner
            </div>
            <Input
              name="bannerimage"
              register={register}
              placeholder="banner image"
              type="file"
              error={errors.bannerimage}
              responseError={responseErrors.BannerImage}
              onChangeFunction={(e) => {
                const file = e.target.files[0];
                const imageUrl = URL.createObjectURL(file);
                setCurrentBannerImage(file);
                setUpdateBannerImage(true);
                setSelectedBannerImage(imageUrl);
              }}
            />

            {selectedBannerImage && (
              <div className="w-[100px] shrink-0 rounded-[1rem]">
                <img
                  src={selectedBannerImage}
                  className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                  alt="Author cover"
                />
              </div>
            )}

            <div className="ml-8 mt-8 text-xl font-medium text-secondartTextBold">
              Logo
            </div>
            <Input
              name="logo"
              register={register}
              placeholder="logo"
              type="file"
              error={errors.logo}
              responseError={responseErrors.Logo}
              onChangeFunction={(e) => {
                const file = e.target.files[0];
                const imageUrl = URL.createObjectURL(file);
                setCurrentLogoImage(file);
                setUpdateLogoImage(true);
                setSelectedLogoImage(imageUrl);
              }}
            />
            <ResponseErrorMessage message={responseException} />

            {selectedLogoImage && (
              <div className="w-[100px] shrink-0 rounded-[1rem]">
                <img
                  src={selectedLogoImage}
                  className="aspect-[2.3/3] h-full w-full cursor-pointer rounded-[2rem] object-cover "
                  alt="Author cover"
                />
              </div>
            )}

            <button
              className="mx-auto my-8 flex items-center rounded-[2rem] bg-primaryText px-16 py-6 text-xl text-white active:scale-95 active:shadow-xl"
              type="submit"
            >
              Update Company
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCompanyForm;
