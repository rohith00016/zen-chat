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
    <div className="dropdown dropdown-top z-[1]">
      {/* Profile Button */}
      <div
        tabIndex={0}
        role="button"
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 transition-all duration-200 group cursor-pointer"
      >
        {profilePic !== "" ? (
          <div className="w-10 h-10 rounded-full shadow-md overflow-hidden ring-2 ring-white/20">
            <img
              src={profilePic}
              alt="user avatar"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm">
              {fullName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="hidden sm:block flex-1">
          <p className="font-semibold text-neutral-800 text-sm truncate">
            {fullName}
          </p>
          <p className="text-xs text-neutral-500">Tap to edit profile</p>
        </div>
        <svg
          className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Profile Dropdown */}
      <div tabIndex={0} className="dropdown-content menu p-0 w-72">
        <div className="surface-primary border border-neutral-200/60 rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="relative cursor-pointer group"
                  onClick={handleImageClick}
                >
                  {profilePic !== "" ? (
                    <div className="w-16 h-16 rounded-full shadow-xl overflow-hidden ring-4 ring-white/30">
                      <img
                        src={profilePic}
                        alt="user avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shadow-xl ring-4 ring-white/30">
                      <span className="text-2xl font-bold">
                        {fullName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{fullName}</h3>
                  <p className="text-sm opacity-90">
                    Click avatar to change photo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Name Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Display Name
                  </label>
                  <button
                    className="p-2 rounded-lg hover:bg-neutral-100 transition-colors group"
                    onClick={handleEditClick}
                    disabled={loading}
                    title={isEditing ? "Save changes" : "Edit name"}
                  >
                    {isEditing ? (
                      loading ? (
                        <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <svg
                          className="w-4 h-4 text-primary-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" />
                          <polyline points="7 3 7 8 15 8" />
                        </svg>
                      )
                    ) : (
                      <svg
                        className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                      </svg>
                    )}
                  </button>
                </div>

                {isEditing ? (
                  <input
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-neutral-800 font-medium"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    autoFocus
                  />
                ) : (
                  <div className="px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200">
                    <p className="font-semibold text-neutral-800 text-lg">
                      {fullName}
                    </p>
                  </div>
                )}
              </div>

              {/* Status Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-neutral-700">
                  Status
                </label>
                <div className="px-4 py-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-neutral-600 font-medium">Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
