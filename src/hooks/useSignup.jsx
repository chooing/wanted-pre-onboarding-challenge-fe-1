import React, { useState } from "react";
import { SERVER_URL } from "../component/constants";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const signup = async (userInfo) => {
        try {
            setIsPending(true);
            const reqURL = `${SERVER_URL}/users/create`;
            const res = await fetch(reqURL, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(userInfo),
            });

            const result = await res.json();
            return result;
        } catch (error) {
            setError(error);
            setIsPending(false);
            console.error(error);
        }
    };
    return { error, isPending, signup };
};
