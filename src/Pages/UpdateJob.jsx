import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { useToast } from "../../src/components/CustomToast.jsx";

const UpdateJob = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the job id from the URL
  const [selectedOption, setSelectedOption] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const {
    register,
    handleSubmit,
    setValue, // Add setValue to set form values
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employmentResponse, experienceResponse, categoriesResponse] =
          await Promise.all([
            axiosInstance.get("/employmentType"),
            axiosInstance.get("/experienceLevel"),
            axiosInstance.get("/category"),
          ]);

        setEmploymentTypes(employmentResponse.data.employmentTypes);
        setExperienceLevels(experienceResponse.data.experienceLevels);
        setCategories(categoriesResponse.data.categories);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const userResponse = await axiosInstance.get("/user/load-user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setCompanyName(userResponse.data.user.fullName);
      } catch (error) {
        console.error("There was a problem fetching user data:", error);
      }
    };

    const fetchJobData = async () => {
      try {
        const response = await axiosInstance.get(`/job/${id}`);
        const jobData = response.data;
        // Set form values with the fetched job data
        setValue("jobTitle", jobData.jobTitle);
        setValue("minSalary", jobData.minSalary);
        setValue("maxSalary", jobData.maxSalary);
        setValue("category", jobData.category);
        setValue("jobLocation", jobData.jobLocation);
        setValue("experienceLevel", jobData.experienceLevel);
        setValue("employmentType", jobData.employmentType);
        setValue("description", jobData.description);
        setValue("responsibilities", jobData.responsibilities);
        setValue("requirements", jobData.requirements);
        setValue("postedBy", jobData.postedBy);
        setSelectedOption(jobData.skills || []); // Set skills if they exist
      } catch (error) {
        console.error("There was a problem fetching job data:", error);
      }
    };

    fetchData();
    fetchUserData();
    fetchJobData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    data.skills = selectedOption;
    data.companyName = companyName;

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axiosInstance.put(`/job/update-job/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data); // Log the response data to check the format

      if (response.status === 200) {
        addToast("Job updated successfully", "success");
        reset();
        setSelectedOption([]);
        navigate("/manage/my-job"); // Redirect to /manage/my-job
      } else {
        addToast("Error updating job", "error");
      }
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
      addToast("There was a problem with the update operation", "error");
    }

    console.log(data);
  };

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "React", label: "React" },
    { value: "MongoDB", label: "MongoDB" },
  ];

  return (
    <div>
      <div className="space-y-12 mt-10">
        <h1 className="font-semibold text-2xl">Edit Job</h1>
        <div className="border-[1px] border-blue-500"></div>
      </div>

      <div className=" bg-white py-10">
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-lg">Job Title</label>
                <input
                  type="text"
                  placeholder="Job Title"
                  {...register("jobTitle", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.jobTitle && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-lg">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-lg">Minimum Salary</label>
                <input
                  type="text"
                  placeholder="Rs20k"
                  {...register("minSalary", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.minSalary && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-lg">Maximum Salary</label>
                <input
                  type="text"
                  placeholder="Rs80k"
                  {...register("maxSalary", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.maxSalary && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-lg">Categories</label>
                <select
                  {...register("category", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Option</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-lg">Job Location</label>
                <input
                  type="text"
                  placeholder="Ex: Kathmandu"
                  {...register("jobLocation", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
                {errors.jobLocation && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 text-lg">Experience Level</label>
                <select
                  {...register("experienceLevel", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Option</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                {errors.experienceLevel && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-lg">Employment Type</label>
                <select
                  {...register("employmentType", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-md"
                >
                  <option value="">Select Option</option>
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.employmentType && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-lg">Job Description</label>
              <textarea
                {...register("description", { required: true })}
                placeholder="Add your job description"
                className="w-full h-56 p-3 border border-gray-300 rounded-md"
              />
              {errors.description && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-lg">Responsibilities</label>
              <textarea
                {...register("responsibilities", { required: true })}
                placeholder="Add your job responsibilities"
                className="w-full h-56 p-3 border border-gray-300 rounded-md"
              />
              {errors.responsibilities && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-lg">Requirements</label>
              <textarea
                {...register("requirements", { required: true })}
                placeholder="Add your job requirements"
                className="w-full h-56 p-3 border border-gray-300 rounded-md"
              />
              {errors.requirements && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-lg">Job Posted By</label>
              <input
                type="email"
                placeholder="your email"
                {...register("postedBy", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.postedBy && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="block mt-4 bg-blue-500 text-white font-semibold px-8 py-3 rounded cursor-pointer"
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateJob;
