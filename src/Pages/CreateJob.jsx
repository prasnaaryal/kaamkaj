import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employmentResponse, experienceResponse, categoriesResponse] =
          await Promise.all([
            fetch("http://localhost:9000/api/employmentType"),
            fetch("http://localhost:9000/api/experienceLevel"),
            fetch("http://localhost:9000/api/category"),
          ]);

        if (!employmentResponse.ok)
          throw new Error("Employment type fetch failed");
        if (!experienceResponse.ok)
          throw new Error("Experience level fetch failed");
        if (!categoriesResponse.ok) throw new Error("Categories fetch failed");

        const [employmentData, experienceData, categoriesData] =
          await Promise.all([
            employmentResponse.json(),
            experienceResponse.json(),
            categoriesResponse.json(),
          ]);

        setEmploymentTypes(employmentData.employmentTypes);
        setExperienceLevels(experienceData.experienceLevels);
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    data.skills = selectedOption;

    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:9000/api/job/create-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.acknowledged === true) {
        toast.success("Job Posted Successfully!");
        reset();
        setSelectedOption(null);
      } else {
        toast.error("Failed to post job");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      toast.error("There was a problem with the fetch operation");
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
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-white py-10">
      <div className="bg-gray-100 py-10 px-4 lg:px-16">
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
                placeholder="Company Name"
                {...register("companyName", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              {errors.companyName && (
                <span className="text-red-500">This field is required</span>
              )}
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
              {errors.categories && (
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
              {...register("responsibilites", { required: true })}
              placeholder="Add your job responsibilities"
              className="w-full h-56 p-3 border border-gray-300 rounded-md"
            />
            {errors.responsibilites && (
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

          <input
            type="submit"
            className="block mt-4 bg-blue-500 text-white font-semibold px-8 py-2 rounded cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
