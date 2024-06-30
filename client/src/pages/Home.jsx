import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { LessonContainer } from "../components";
import { lessonData } from "../data";

const Home = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  return (
    <section id="home" className="w-full min-h-screen p-4 md:p-8">
      <h1 className="h1-style mb-8">Trang chủ</h1>
      <div className="mb-8 banner-container-style text-white text-shadow bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="relative p-8 z-10">
          <h2 className="banner-heading mb-3">
            Chào mừng {user.username}さん đến với AE Nihongo!
          </h2>
          <p className="text-lg">
            Nơi học tập tiếng Nhật hàng đầu tại Việt Nam.
          </p>
        </div>
        <div className="banner-bg-style bg-parkay-floor" />
      </div>
      <div className="mb-8">
        <p>
          Các bài học và Quizz cung cấp cho bạn được lấy từ nguồn{" "}
          <strong>Giáo trình Genki</strong>.
        </p>
        <br />
        <p>Chọn bài Quizz bên dưới để kiểm tra khả năng của bạn.</p>
      </div>

      <h3 className="font-bold mb-4 text-xl">Quizz</h3>
      <div className="flex flex-col gap-4">
        {lessonData.map((lesson) => (
          <LessonContainer key={lesson.lessonUrl} lesson={lesson} />
        ))}
      </div>
    </section>
  );
};

export default Home;
