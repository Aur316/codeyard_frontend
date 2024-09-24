import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Acme",
      create: "Create your account by filling the form below.",
      email: "Email",
      password: "Password",
      remember: "Remember me.",
      signup: "Sign up",
      already: "Do you already have an account?",
      awesome: "That's awesome! You can login by clicking on the button below.",
      skip: "To skip this next time, you can ask us to remember your login credentials.",
      login: "Log in",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
