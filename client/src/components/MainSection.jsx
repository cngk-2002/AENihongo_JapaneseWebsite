import { useEffect } from "react";
import { Header, Footer, Sidebar, MobileMenu } from ".";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  Landing,
  Login,
  Signup,
  NoMatch,
  Home,
  Characters,
  Leaderboards,
  Profile,
  QuizPage,
  Vocabularies,
} from "../pages";

import Auth from "../utils/auth";
import { HiraKataKanjiQuiz, VocabQuiz } from "../utils/quizGenerator";
import {
  hiraganaCharacters,
  katakanaCharacters,
  kanjiCharacters,
  lessonData,
} from "../data";

const MainSection = () => {
  const loggedIn = Auth.loggedIn();
  const quizLocation = useLocation().pathname.includes("/quiz");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {loggedIn && !quizLocation && <Sidebar />}
      <div
        className={`overflow-x-hidden overflow-y-auto flex flex-col ${
          loggedIn
            ? quizLocation
              ? ""
              : "mb-20 sm:mb-0 sm:ms-[88px] xl:ms-[300px]"
            : ""
        }`}
      >
        {!loggedIn && <Header />}
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/vocabularies" element={<Vocabularies />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/quiz">
              <Route
                path="hiragana"
                element={
                  <QuizPage
                    quiz={
                      new HiraKataKanjiQuiz(
                        "hiragana",
                        hiraganaCharacters.basic,
                        hiraganaCharacters.diacritics,
                        hiraganaCharacters.contracted
                      )
                    }
                  />
                }
              />
              <Route
                path="katakana"
                element={
                  <QuizPage
                    quiz={
                      new HiraKataKanjiQuiz(
                        "katakana",
                        katakanaCharacters.basic,
                        katakanaCharacters.diacritics,
                        katakanaCharacters.contracted
                      )
                    }
                  />
                }
              />
              <Route path="kanji">
                {kanjiCharacters.map((lesson) => (
                  <Route
                    key={lesson.url}
                    path={lesson.url}
                    element={
                      <QuizPage
                        quiz={new HiraKataKanjiQuiz("kanji", lesson.kanji)}
                      />
                    }
                  />
                ))}
              </Route>
              <Route path="lessons">
                {lessonData.map((lesson) => (
                  <Route key={lesson.lessonUrl} path={lesson.lessonUrl}>
                    {lesson.lessonUnits.map((unit) => (
                      <Route
                        key={unit.unitUrl}
                        path={unit.unitUrl}
                        element={
                          <QuizPage
                            quiz={new VocabQuiz(unit.unitUrl, unit.unitContent)}
                          />
                        }
                      />
                    ))}
                  </Route>
                ))}
              </Route>
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        {!quizLocation && <Footer />}
      </div>
      {loggedIn && !quizLocation && <MobileMenu />}
    </>
  );
};

export default MainSection;
