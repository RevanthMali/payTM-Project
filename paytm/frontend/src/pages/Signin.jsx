import { useState } from "react";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
export const Signin= () =>{
    const[userName,setUserName] = useState("");
    const[password,setPassword] = useState("");
    return (
      <div className="bg-slate-400 h-screen flex justify-center">
        <div className="flex flex-col justify-center ">
          <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign In"} />
            <SubHeading
              label={"Enter Your credentials to access your account"}
            />
            <InputBox
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Revanth06@gmail.com"
              label={"Email"}
            />
            <InputBox
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label={"Password"}
            />
            <div className="pt-4">
              <Button
                // onClick={async () => {
                //   const response = await axios.post(
                //     "http://localhost:3000/api/v1/user/signup",
                //     {
                //       username,
                //       firstName,
                //       lastName,
                //       password,
                //     }
                //   );
                //   localStorage.setItem("token", response.data.token);
                //   navigate("/dashboard");
                // }}
                label={"Sign In"}
              />
            </div>
            <ButtonWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
          </div>
        </div>
      </div>
    );
}