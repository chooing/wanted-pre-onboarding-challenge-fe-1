import { useState } from "react";
import { USER_VALIDATION_ERRORS } from "../constants";

export const useValidator = () => {
    const [errorInfo, setErrorInfo] = useState({
        status: true,
        type: null,
        msg: null,
    });
    const emailReq = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;

    const userValidation = (userInfo) => {
        if (userInfo.email === "" || userInfo.password === "") {
            setErrorInfo({
                status: true,
                type: "password",
                msg: USER_VALIDATION_ERRORS.EMPTY_FORM,
            });
        } else if (!emailReq.test(userInfo.email)) {
            setErrorInfo({
                status: true,
                type: "email",
                msg: USER_VALIDATION_ERRORS.INVALID_EMAIL,
            });
        } else if (userInfo.password.length < 8) {
            setErrorInfo({
                status: true,
                type: "password",
                msg: USER_VALIDATION_ERRORS.INVALID_PASSWORD,
            });
        } else {
            setErrorInfo({
                status: false,
                type: null,
                msg: null,
            });
        }
    };

    return { userValidation, errorInfo };
};
