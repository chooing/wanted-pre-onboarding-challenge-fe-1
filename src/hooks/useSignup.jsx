import { useState } from "react";
import { authInstanceAxios } from "../apis";

export const useSignup = () => {
    const [signupResult, setSignupResult] = useState({
        error: false,
        resultData: null,
    });

    const signUpUser = async (userInfo) => {
        try {
            const res = await authInstanceAxios.post(`/users/create`, userInfo);
            setSignupResult({
                error: false,
                resultData: res.data,
            });
            return res.data;
        } catch ({ response }) {
            if (response.status === 404) {
                navigator("/error");
            }
            setSignupResult(() => ({
                error: true,
                resultData: response.data.details,
            }));
            return response.data.details;
        }
    };

    return { signupResult, signUpUser };
};
