import { useState, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const Profile = () => {
  const { authUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(authUser.fullName);
  const [profilePic, setProfilePic] = useState(authUser.profilePic);
  const fileInputRef = useRef(null);

  const { updateProfile, loading } = useUpdateProfile();

  const handleEditClick = async () => {
    if (isEditing) {
      const updatedProfile = {};

      if (authUser.fullName !== fullName) {
        updatedProfile.fullName = fullName;
      }

      await updateProfile(updatedProfile);
    }
    setIsEditing(!isEditing);
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const updatedProfile = { profilePic: file };
      await updateProfile(updatedProfile);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="dropdown dropdown-top z-[1] m-3">
      <div tabIndex={0} role="button" className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </div>
      <div tabIndex={0} className="dropdown-content menu">
        <div className="card w-80 bg-[#F6F6F9] border shadow-xl">
          <div className="card-body">
            <div
              className="flex gap-2 hover:text-white rounded p-2 cursor-pointer"
              onClick={handleImageClick}
            >
              {profilePic !== "" ? (
                <div className="avatar">
                  <div className="w-[80px] rounded-full ring-[2px] ring-[#16A34A]">
                    <img src={profilePic} alt="user avatar" />
                  </div>
                </div>
              ) : (
                <div className="avatar online placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-16">
                    <span className="text-xl">
                      {fullName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="flex flex-col flex-1 ml-[10px]">
              <div className="flex justify-between">
                {isEditing ? (
                  <input
                    className="font-bold text-lg outline-none"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                ) : (
                  <p className="font-bold text-lg w-[30px]">{fullName}</p>
                )}
                <button
                  className="mx-1 font-bold text-lg text-[#16A34A]"
                  onClick={handleEditClick}
                >
                  {isEditing ? (
                    loading ? (
                      <div className="loading loading-spinner"></div>
                    ) : (
                      <svg
                        className="h-8 w-6 text-stone-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        {" "}
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />{" "}
                        <polyline points="17 21 17 13 7 13 7 21" />{" "}
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="h-8 w-6 text-[#0DBA4B]"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path stroke="none" d="M0 0h24v24H0z" />{" "}
                      <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />{" "}
                      <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
