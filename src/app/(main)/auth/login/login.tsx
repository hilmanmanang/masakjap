"use client"
import { initUser } from "@/utils/constant";
import { User } from "@/utils/interface";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { toast } from "react-toastify";

export const Login = () => {
    const [loginForm, setLoginForm] = useState<User>(initUser)
    const { username, password } = loginForm
    const [rememberMe, setRememberMe] = useState<boolean | undefined>(false)

    const handleLogin = async () => {
        const { username, password } = loginForm
        const response: any = await signIn("credentials", {
            username,
            password,
            redirect: false
        })

        if (response.ok) {
            toast.success("Successfully login")
        } else {
            toast.error("Invalid username or password")
        }
    }

    return (<div className="max-w-[32.5rem] p-6 border border-gray-50 mx-auto" style={{ boxShadow: '0 0 56px #00260314' }}>
        <div className="text-gray-900 font-semibold text-[2rem] text-center mb-5">Login</div>
        <div className="mb-4">
            <div className="text-gray-900 text-sm font-normal mb-2">Username*</div>
            <InputText
                value={username}
                type="email"
                onChange={(e) => setLoginForm({
                    ...loginForm,
                    username: e.target.value
                })}
                placeholder="Insert username"
                pt={{
                    root: {
                        className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                    }
                }}
            />
        </div>
        <div className="mb-4">
            <div className="text-gray-900 text-sm font-normal mb-2">Password*</div>
            <InputText
                value={password}
                type="password"
                onChange={(e) => setLoginForm({
                    ...loginForm,
                    password: e.target.value
                })}
                placeholder="Insert password"
                pt={{
                    root: {
                        className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                    }
                }}

            />
        </div>
        <div className="mb-5 flex md:flex-row flex-col gap-4 items-center justify-between w-full">
            <div className="flex gap-2 md:items-center w-full">
                <Checkbox
                    onChange={e => setRememberMe(e.checked)}
                    checked={rememberMe || false}
                    className="mr-1 "
                    pt={{
                        root: {
                            className: `rounded-[0.188rem] outline-gray-200 focus:shadow-none focus:outline-none ${rememberMe ? 'bg-success' : 'outline outline-[0.063rem]'}`
                        },
                        input: {
                            className: `rounded-[0.188rem] outline-gray-200 focus:shadow-none focus:outline-none ${rememberMe ? 'bg-success' : 'outline outline-[0.063rem]'}`
                        },
                        icon: {
                            className: "border border-success bg-success"
                        },
                    }} />
                <div className="text-gray-600 text-sm font-normal">Remember me</div>
            </div>
            <div className="text-gray-600 text-sm font-normal whitespace-nowrap">Forget Password</div>
        </div>
        <Button
            type="button"
            label="Login"
            className="text-white w-full rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none mb-5"
            onClick={handleLogin}
            disabled={!username || !password}
        />
        <div className="text-center text-gray-600 text-sm font-normal">Don&apos;t have account? <Link href="/auth/register" className="font-medium text-gray-900">Register</Link></div>
    </div>)
}
