import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FaArrowCircleRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export default function FinancialInfo() {
  // State to manage form fields
  const [formData, setFormData] = useState({
    accountNo: "",
    accountHolderName: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    googlePay: "",
    phonePe: "",
  });
  const [menuBar, setMenuBar] = useState(false);
  const sidebarRef = useRef(null); // Ref to track sidebar element

  const token = localStorage.getItem("token");
  const epin = localStorage.getItem("epin");


  // Toggle sidebar visibility
  const handleClick = () => {
    setMenuBar(!menuBar);
  };

  // Close sidebar when clicking outside
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuBar(false); // Close the sidebar if clicked outside
    }
  };

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Fetch financial details on component mount
  useEffect(() => {
    const fetchFinancialDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/get-financial-detail?epin=${epin}`,
         
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // params:{epin},
          },
      );

        // Log the response to verify its structure
        

        // Ensure the response contains the expected fields
        if (res.data.financialDetails) {
          // Set the fetched data to formData
          setFormData({
            accountNo: res.data.financialDetails.accountNo || "",
            accountHolderName: res.data.financialDetails.accountHolderName || "",
            ifscCode: res.data.financialDetails.ifscCode || "",
            bankName: res.data.financialDetails.bankName || "",
            branchName: res.data.financialDetails.branchName || "",
            googlePay: res.data.financialDetails.googlePay || "",
            phonePe: res.data.financialDetails.phonePe || "",
          });
        } else {
          console.error("Invalid financial details response:", res.data);
          toast.error("Failed to fetch financial details. Invalid response.");
        }
      } catch (error) {
        console.error("Failed to get financial info", error);
        toast.error("Failed to fetch financial details. Please try again.");
      }
    };

    fetchFinancialDetails();
  }, []);

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming EPIN is stored in token
      await axios.put(
        "/api/v1/update-user",
        { ...formData , epin: epin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success toast
      toast.success("User information updated successfully!");
    } catch (error) {
      // Show error toast
      console.error("Error updating user:", error);
      toast.error("Failed to update user information. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Toast Container */}
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

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-60 transition-transform duration-300 ease-in-out transform lg:translate-x-0 ${
          menuBar ? "translate-x-0" : "-translate-x-full"
        } lg:w-60`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-60">
        <button
          className={`absolute m-4 lg:hidden rounded-full z-20 ${
            menuBar ? "hidden" : ""
          }`}
          onClick={handleClick}
        >
          <FaArrowCircleRight size={30} className={`transition-transform duration-300`} />
        </button>

        <Header />

        <div className="p-4 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Financial Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form fields */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Account No</label>
              <input
                type="text"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                placeholder="Account No"
                className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Account Holder Name</label>
              <input
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleChange}
                placeholder="Account Holder Name"
                className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                placeholder="IFSC Code"
                className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
              />
              <small className="text-gray-500 text-xs mt-1">
                Enter an 11-digit IFSC Code. The Bank Name and Branch Name will be automatically displayed.
              </small>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                placeholder="Bank Name"
                className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">Branch Name</label>
              <input
                type="text"
                name="branchName"
                value={formData.branchName}
                onChange={handleChange}
                placeholder="Branch Name"
                className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">GooglePay</label>
              <input
                type="text"
                name="googlePay"
                value={formData.googlePay}
                onChange={handleChange}
                placeholder="GooglePay"
                className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium">PhonePe</label>
              <input
                type="text"
                name="phonePe"
                value={formData.phonePe}
                onChange={handleChange}
                placeholder="PhonePe"
                className="border rounded p-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}