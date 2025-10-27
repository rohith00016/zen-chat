import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (updatedProfile) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      for (const key in updatedProfile) {
        formData.append(key, updatedProfile[key]);
      }

      const response = await api.put(`/users/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAuthUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateProfile, isLoading };
};

export default useUpdateProfile;
