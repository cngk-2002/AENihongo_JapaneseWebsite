import React from "react";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { AiOutlineLoading } from "react-icons/ai";

const Profile = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const { data, loading } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const firstLetter = user.username?.charAt(0).toUpperCase();

  return (
    <section id="profile" className="w-full min-h-screen p-4 md:p-8">
      <h1 className="h1-style mb-8">Trang cá nhân</h1>
      {loading && (
        <AiOutlineLoading className="animate-spin h-12 w-12 mx-auto" />
      )}
      <div className="box-container-style mb-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-32 h-32 bg-primary rounded-full flex justify-center items-center uppercase font-bold text-6xl text-white">
          {firstLetter}
        </div>
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-500 dark:text-gray-400">{`Tham gia từ ngày ${user.createdAt}`}</p>
        </div>
      </div>
      <div className="box-container-style mb-8 flex flex-col gap-4">
        <h3 className="text-xl font-bold">Thống kê</h3>
        <div>
          <h4 className="text-gray-500 dark:text-gray-400">Tổng kinh nghiệm:</h4>
          <h2 className="text-2xl font-bold">{user.experience}</h2>
        </div>
      </div>
    </section>
  );
};

export default Profile;
