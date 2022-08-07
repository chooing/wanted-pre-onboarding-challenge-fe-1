import React, { useCallback, useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });
    const { error, inPending, signup } = useSignup();

    const onChangeInput = (e) => {
        if (e.target.type === "email") {
            setUserInfo((cur) => ({
                ...cur,
                email: e.target.value,
            }));
            console.log("email");
        } else if (e.target.type === "password") {
            setUserInfo((cur) => ({
                ...cur,
                password: e.target.value,
            }));
            console.log("password");
        }
    };

    const onSubmitSignup = useCallback(
        (e) => {
            e.preventDefault();
            console.log("onSubmit");
            signup(userInfo).then((d) => console.log(d));
        },
        [userInfo]
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
                    <label htmlFor="userPw">비밀번호:</label>
                    <input
                        type="password"
                        name="userPw"
                        id="userPw"
                        value={userInfo.password}
                        onChange={onChangeInput}
                        required
                    />
                    <button type="submit">회원가입 하기</button>
                </fieldset>
            </form>
        </section>
    );
}
