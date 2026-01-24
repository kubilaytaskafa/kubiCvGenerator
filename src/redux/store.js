import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./slices/userInfo";
import certificatesReducer from "./slices/certificates";
import socialSkillsReducer from "./slices/socialSkills";
import projectsReducer from "./slices/projects";
import educationsReducer from "./slices/educations";
import skillsReducer from "./slices/skills";
import experiencesReducer from "./slices/experiences";
export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    certificates: certificatesReducer,
    projects: projectsReducer,
    educations: educationsReducer,
    skills: skillsReducer,
    socialSkills: socialSkillsReducer,
    experiences: experiencesReducer,
  },
});
