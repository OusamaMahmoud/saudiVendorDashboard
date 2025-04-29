import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { homeAr, homeEn, menuAr, menuEn, ordersAr, ordersEn, usersAr, usersEn, vendorsAr, vendorsEn } from "../../public/locals";

const resources = {
    en: {
        menu: menuEn,
        orders: ordersEn,
        home: homeEn,
        users: usersEn,
        vendors: vendorsEn,
    },
    ar: {
        menu: menuAr,
        orders: ordersAr,
        home: homeAr,
        users: usersAr,
        vendors: vendorsAr,
    },
} as const;

i18n.use(initReactI18next).init({
    resources,
    lng: "ar",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export default i18n;
