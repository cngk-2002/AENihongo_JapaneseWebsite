import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import { LessonContainer } from "../components";

const Vocabularies = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <section id="vocabularies" className="w-full min-h-screen p-4 md:p-8">
      <div className="mb-8">
        <h1 className="h1-style mb-8">Từ vựng</h1>
      </div>
    </section>
  );
};

export default Vocabularies;
