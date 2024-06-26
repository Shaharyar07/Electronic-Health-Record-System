"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Select from "react-select";
const UploadImage = ({ patients }) => {
  const router = useRouter();
  const [patientId, setPatientId] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    var cancer;
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await axios.post(
      "https://flask-backend.1.ie-1.fl0.io/predict",
      formData
    );
    const prediction = response.data;
    if (prediction === "Cancer") {
      cancer = true;
    } else {
      cancer = false;
    }
    // console.log(cancer);
    // console.log(patientId);
    const PatientStatus = await axios.put("/api/image", {
      patientId,
      cancer,
    });
    // console.log(PatientStatus);
    const data = PatientStatus?.data?.data;
    if (data.status === 200) {
      toast.success(
        "Image classification is done and patient status is updated successfully"
      );
      router.refresh();
    } else {
      toast.error("Something went wrong, please try again.");
    }

    selectedFile && setSelectedFile(null);
    setPatientId("");
    setLoading(false);
  };

  return (
    <div className='payment-container'>
      <div className='col-12 col-md-6 col-xl-4'>
        <div className='form-group local-forms'>
          {/* Opthalogist will add MR number of the patient, whose image is being uploaded  */}
          <label>
            MR Number <span className='login-danger'>*</span>
          </label>
          <Select
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            options={patients.map((patient) => ({
              label: patient.name,
              value: patient.id,
            }))}
            onChange={(e) => setPatientId(e.value)}
            className='basic-single'
            classNamePrefix='select'
            required
          />
        </div>
      </div>
      <div className='file-container '>
        <div className='file-header'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth={0} />
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <g id='SVGRepo_iconCarrier'>
              <path
                d='M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15'
                stroke='#000000'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />{" "}
            </g>
          </svg>{" "}
          <p>Browse File to upload!</p>
        </div>
        <label htmlFor='file' className='file-footer'>
          <svg
            fill='#000000'
            viewBox='0 0 32 32'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth={0} />
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <g id='SVGRepo_iconCarrier'>
              <path d='M15.331 6H8.5v20h15V14.154h-8.169z' />
              <path d='M18.153 6h-.009v5.342H23.5v-.002z' />
            </g>
          </svg>
          <p>{selectedFile ? selectedFile.name : "Not selected file"}</p>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='SVGRepo_bgCarrier' strokeWidth={0} />
            <g
              id='SVGRepo_tracerCarrier'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <g id='SVGRepo_iconCarrier'>
              {" "}
              <path
                d='M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z'
                stroke='#000000'
                strokeWidth={2}
              />{" "}
              <path
                d='M19.5 5H4.5'
                stroke='#000000'
                strokeWidth={2}
                strokeLinecap='round'
              />{" "}
              <path
                d='M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z'
                stroke='#000000'
                strokeWidth={2}
              />{" "}
            </g>
          </svg>
        </label>
        <input id='file' type='file' onChange={handleFileChange} />
      </div>

      <button
        className='cssbuttons-io-button'
        disabled={loading}
        onClick={handleUpload}
      >
        {loading ? "Processing..." : "Upload"}
        <div className='icon'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path fill='none' d='M0 0h24v24H0z'></path>
            <path
              fill='currentColor'
              d='M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z'
            ></path>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default UploadImage;
