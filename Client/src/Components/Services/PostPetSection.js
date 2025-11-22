import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import postPet from "./images/postPet.png";
import { FileImage } from "lucide-react";

// Reusable Input Component
const FormInput = ({ label, type = "text", value, onChange, placeholder }) => (
  <div className="mb-3">
    <label style={{ display: 'block', color: '#f97316', fontWeight: '500', marginBottom: '6px', fontSize: '0.875rem' }}>
      {label}:
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition text-sm"
    />
  </div>
);

// Reusable Select Component
const FormSelect = ({ label, value, onChange, options }) => (
  <div className="mb-3">
    <label style={{ display: 'block', color: '#f97316', fontWeight: '500', marginBottom: '6px', fontSize: '0.875rem' }}>
      {label}:
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition bg-white text-sm"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// Reusable Textarea Component
const FormTextarea = ({ label, value, onChange, rows = 3, placeholder }) => (
  <div className="mb-3">
    <label style={{ display: 'block', color: '#f97316', fontWeight: '500', marginBottom: '6px', fontSize: '0.875rem' }}>
      {label}:
    </label>
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition resize-none text-sm"
    />
  </div>
);

// Reusable File Input Component with Image Icon
const FormFileInput = ({ label, onChange, fileName }) => (
  <div className="mb-3">
    <label style={{ display: 'block', color: '#f97316', fontWeight: '500', marginBottom: '6px', fontSize: '0.875rem' }}>
      {label}:
    </label>
    <label className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:border-orange-400 transition text-sm bg-white">
      <div className="flex items-center gap-2 overflow-hidden">
        <FileImage className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <span className={`truncate ${fileName ? 'text-gray-700' : 'text-gray-400'}`}>
          {fileName || "Choose a Picture"}
        </span>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </label>
  </div>
);

// Main Form Component
const PostPetSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    area: "",
    justification: "",
    email: "",
    phone: "",
    type: "None",
  });
  
  const [picture, setPicture] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const petTypes = [
    { value: "None", label: "None" },
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Rabbit", label: "Rabbit" },
    { value: "Bird", label: "Bird" },
    { value: "Fish", label: "Fish" },
    { value: "Other", label: "Other" },
  ];

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicture(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.age || !formData.area || 
        !formData.justification || !formData.email || !formData.phone || 
        !fileName || formData.type === "None") {
      toast.error("Please fill out all fields correctly.");
      return false;
    }

    if (!isEmailValid(formData.email)) {
      toast.error("Please provide a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (picture) {
      data.append("picture", picture);
    }

    try {
      const response = await fetch("http://localhost:4000/services", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast.success("Application submitted! We'll get in touch with you soon.");
      
      // Reset form
      setFormData({
        name: "",
        age: "",
        area: "",
        justification: "",
        email: "",
        phone: "",
        type: "None",
      });
      setPicture(null);
      setFileName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 max-w-4xl w-full" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="mb-6">
        <h2 style={{ color: '#f97316', fontSize: '2rem', fontWeight: 'bold', marginBottom: '8px' }}>
          Post a Pet for Adoption
        </h2>
        <div style={{ width: '100%', height: '3px', backgroundColor: '#f97316', borderRadius: '2px' }}></div>
      </div>
      
      <div className="flex justify-center mb-6">
        <img 
          src={postPet}
          alt="Pet Looking for a Home" 
          className="w-full max-w-full h-56 object-contain rounded-lg"
        />
      </div>

      <div className="space-y-4">
        {/* Row 1: Name and Pet Age */}
        <div className="grid grid-cols-2 gap-6">
          <FormInput
            label="Name"
            value={formData.name}
            onChange={handleInputChange("name")}
            placeholder="Enter pet's name"
          />
          <FormInput
            label="Pet Age"
            value={formData.age}
            onChange={handleInputChange("age")}
            placeholder="Enter pet's age"
          />
        </div>

        {/* Row 2: Picture and Location */}
        <div className="grid grid-cols-2 gap-6">
          <FormFileInput
            label="Picture"
            onChange={handleFileChange}
            fileName={fileName}
          />
          <FormInput
            label="Location"
            value={formData.area}
            onChange={handleInputChange("area")}
            placeholder="Enter your location"
          />
        </div>

        {/* Row 3: Type (full width) */}
        <FormSelect
          label="Type"
          value={formData.type}
          onChange={handleInputChange("type")}
          options={petTypes}
        />

        {/* Row 4: Justification (full width) */}
        <FormTextarea
          label="Justification for giving a pet"
          value={formData.justification}
          onChange={handleInputChange("justification")}
          placeholder="Please explain why you're putting this pet up for adoption..."
          rows={3}
        />

        {/* Contact Information Section */}
        <div className="mt-6 mb-3">
          <h3 style={{ color: '#f97316', fontSize: '1.3rem', fontWeight: '600' }}>
            Contact Information
          </h3>
        </div>

        {/* Row 5: Email and Phone */}
        <div className="grid grid-cols-2 gap-6">
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="your.email@example.com"
          />
          <FormInput
            label="Ph.No"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            placeholder="Enter phone number"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full py-3 px-6 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed mt-6 text-base"
        >
          {isSubmitting ? "Submitting..." : "Submit Your Pet"}
        </button>
      </div>
    </div>
  );
};

export default PostPetSection;


// import React, { useState, useEffect } from "react";
// import postPet from "./images/postPet.png";

// const PostPetSection = () => {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [area, setArea] = useState("");
//   const [justification, setJustification] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [formError, setFormError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [ageError, setAgeError] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [type, setType] = useState("None");
//   const [picture, setPicture] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false); 

//   useEffect(() => {
//     if (!isSubmitting) {
//       setEmailError(false);
//       setAgeError(false);
//       setFormError(false);
//     }
//   }, [isSubmitting]);

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   const isEmailValid = (email) => {
//     const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
//     return emailPattern.test(email);
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setPicture(selectedFile);
//       setFileName(selectedFile.name);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !name ||
//       !age ||
//       !area ||
//       !justification ||
//       !email ||
//       !phone ||
//       !fileName ||
//       type === "None" ||
//       ageError
//     ) {
//       setFormError(true);
//       return;
//     }

//     if (!isEmailValid(email)) {
//       setEmailError(true);
//       return;
//     }

//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("age", age);
//     formData.append("area", area);
//     formData.append("justification", justification);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("type", type);

//     if (picture) {
//       formData.append("picture", picture);
//     }

//     try {
//       const response = await fetch("http://localhost:4000/services", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       console.log("Form submitted successfully");

//       setEmailError(false);
//       setFormError(false);
//       setName("");
//       setAge("");
//       setArea("");
//       setJustification("");
//       setEmail("");
//       setPhone("");
//       setPicture(null);
//       setFileName("");
//       togglePopup();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   return (
//     <section className="post-pet-section">
//       <h2>Post a Pet for Adoption</h2>
//       <img src={postPet} alt="Pet Looking for a Home" />

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="input-box">
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div className="input-box">
//           <label>Pet Age:</label>
//           <input
//             type="text"
//             value={age}
//             onChange={(e) => {setAge(e.target.value);}}
//           />
//         </div>

//         <div className="input-box">
//           <label>Picture:</label>
//           <label className="file-input-label">
//             <span className="file-input-text">
//               {fileName || "Choose a Picture"}
//             </span>
//             <input
//               className="file-input"
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//           </label>
//         </div>

//         <div className="input-box">
//           <label>Location:</label>
//           <input
//             type="text"
//             value={area}
//             onChange={(e) => setArea(e.target.value)}
//           />
//         </div>

//         <div className="filter-selection-service">
//           <label>Type:</label>
//           <select
//             value={type}
//             onChange={(event) => setType(event.target.value)}
//           >
//             <option value="None">None</option>
//             <option value="Dog">Dog</option>
//             <option value="Cat">Cat</option>
//             <option value="Rabbit">Rabbit</option>
//             <option value="Bird">Bird</option>
//             <option value="Fish">Fish</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>

//         <div className="input-box">
//           <h3>Justification for giving a pet</h3>
//           <textarea
//             rows="4"
//             value={justification}
//             onChange={(e) => setJustification(e.target.value)}
//           ></textarea>
//         </div>

//         <h3>Contact Information</h3>

//         <div className="input-box">
//           <label>Email:</label>
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="input-box">
//           <label>Ph.No:</label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />
//         </div>

//         {emailError && (
//           <p className="error-message">Please provide a valid email address.</p>
//         )}
//         {formError && (
//           <p className="error-message">Please fill out all fields correctly.</p>
//         )}

//         <button type="submit" className="cta-button" disabled={isSubmitting}>
//           {isSubmitting ? "Submitting..." : "Submit Your Pet"}
//         </button>

//         {showPopup && (
//           <div className="popup">
//             <div className="popup-content">
//               <h4>Application Submitted; we'll get in touch with you soon.</h4>
//             </div>
//             <button onClick={togglePopup} className="close-btn">
//               Close <i className="fa fa-times"></i>
//             </button>
//           </div>
//         )}
//       </form>
//     </section>
//   );
// };

// export default PostPetSection;
