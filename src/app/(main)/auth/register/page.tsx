"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { initUser } from "@/utils/constant";
import { User } from "@/utils/interface";
import { toHash } from "@/utils/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
    const items = [
        { label: "Register", className: "text-success" }
    ]
    const router = useRouter()
    const [registerForm, setRegisterForm] = useState<User>(initUser)
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [acceptTnC, setAcceptTnC] = useState<boolean | undefined>(false)
    const { firstName, lastName, username, password } = registerForm

    const handleCreateAccount = async (event: any) => {
        event.preventDefault();
        const { firstName, lastName, username, password, role } = registerForm

        const response = await fetch("/api/user/create", {
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                username,
                role,
                password: await toHash(password)
            })
        })

        if (response.ok) {
            toast.success(`User is created!`)
            router.push("/")
        } else {
            toast.error("Unexpected error")
        }
    }

    const handleConfirmPassword = (event: any) => {
        const { value } = event.target
        setConfirmPassword(value)
    }

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5 py-20">
            <div className="max-w-[32.5rem] p-6 border border-gray-50 mx-auto" style={{ boxShadow: '0 0 56px #00260314' }}>
                <div className="text-gray-900 font-semibold text-[2rem] text-center mb-5">Register</div>
                <div className="flex md:flex-row flex-col gap-4 mb-4">
                    <div className="w-full">
                        <div className="text-gray-900 text-sm font-normal mb-2">First Name*</div>
                        <InputText
                            value={firstName}
                            type="text"
                            onChange={(e) => setRegisterForm({
                                ...registerForm,
                                firstName: e.target.value
                            })}
                            placeholder="Insert first name"
                            pt={{
                                root: {
                                    className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                                }
                            }}
                        />
                    </div>
                    <div className="w-full">
                        <div className="text-gray-900 text-sm font-normal mb-2">Last Name*</div>
                        <InputText
                            value={lastName}
                            type="text"
                            onChange={(e) => setRegisterForm({
                                ...registerForm,
                                lastName: e.target.value
                            })}
                            placeholder="Insert last name"
                            pt={{
                                root: {
                                    className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <div className="text-gray-900 text-sm font-normal mb-2">Username*</div>
                    <InputText
                        value={username}
                        type="text"
                        onChange={(e) => setRegisterForm({
                            ...registerForm,
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
                        onChange={(e) => setRegisterForm({
                            ...registerForm,
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
                <div className="mb-4">
                    <div className="text-gray-900 text-sm font-normal mb-2">Confirm Password*</div>
                    <InputText
                        value={confirmPassword}
                        type="password"
                        onChange={handleConfirmPassword}
                        placeholder="Re-insert password"
                        pt={{
                            root: {
                                className: "shadow-none outline-none rounded-md h-12 px-3 w-full border border-gray-100 placeholder:text-gray-400"
                            }
                        }}
                    />
                </div>
                <div className="mb-5 flex gap-2 items-center">
                    <Checkbox
                        onChange={e => setAcceptTnC(e.checked)}
                        checked={acceptTnC || false}
                        className="mr-1"
                        pt={{
                            root: {
                                className: `rounded-[0.188rem] outline-gray-200 focus:shadow-none focus:outline-none ${acceptTnC ? 'bg-success' : 'outline outline-[0.063rem]'}`
                            },
                            input: {
                                className: `rounded-[0.188rem] outline-gray-200 focus:shadow-none focus:outline-none ${acceptTnC ? 'bg-success' : 'outline outline-[0.063rem]'}`
                            },
                            icon: {
                                className: "border border-success bg-success"
                            },
                        }} />
                    <div className="text-gray-600 text-sm font-normal">Accept all terms & Conditions</div>
                </div>
                <Button
                    type="button"
                    label="Create Account"
                    className="text-white w-full rounded-full bg-success px-8 py-[0.875rem] focus:shadow-none mb-5"
                    onClick={handleCreateAccount}
                    disabled={!acceptTnC || !firstName || !lastName || !username || !password || (confirmPassword !== password)}
                />
                <div className="text-center text-gray-600 text-sm font-normal">Already have account? <Link href="/auth/login" className="font-medium text-gray-900">Login</Link></div>
            </div>
        </div>
    </div>)
}