import React, { useCallback, useEffect, useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useValidator } from "../../hooks/useValidator";

export default function Signup() {
    const { userValidation, errorInfo } = useValidator();
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const { signupResult, signUpUser } = useSignup();

    useEffect(() => {
        console.log(signupResult);
    }, [signupResult]);

    const onChangeInput = (e) => {
        if (e.target.type === "email") {
            setUserInfo((cur) => ({
                ...cur,
                email: e.target.value,
            }));
        } else if (e.target.type === "password") {
            setUserInfo((cur) => ({
                ...cur,
                password: e.target.value,
            }));
        }
        userValidation(userInfo);
    };

    const onSubmitSignup = useCallback(
        (e) => {
            e.preventDefault();
            signUpUser(userInfo);
            // .then((d) => console.log(d));
        },
        [userInfo, signUpUser]
    );

    return (
        <section>
            <h2>회원가입</h2>
            <form method="post" onSubmit={onSubmitSignup}>
                <fieldset>
                    <legend>회원가입 양식</legend>
                    <label htmlFor="userId">아이디:</label>
                    <input
                        type="email"
                        name="userId"
                        id="userId"
                        value={userInfo.email}
                        onChange={onChangeInput}
                        required
                    />
                    {errorInfo.type === "email" && <p>{errorInfo.msg}</p>}
                    <label htmlFor="userPw">비밀번호:</label>
                    <input
                        type="password"
                        name="userPw"
                        id="userPw"
                        value={userInfo.password}
                        onChange={onChangeInput}
                        required
                    />
                    {errorInfo.type === "password" && <p>{errorInfo.msg}</p>}
                    <button type="submit" disabled={errorInfo.status}>
                        회원가입 하기
                    </button>
                </fieldset>
            </form>
        </section>
    );
}
