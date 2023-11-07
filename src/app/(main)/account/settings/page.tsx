"use client"
import { useEdgeStore } from "@/providers/edgestore";
import { initUser } from "@/utils/constant";
import { User } from "@/utils/interface";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Auth from "../../auth/login/page";

export default function Setings() {
    const { data: session, status } = useSession();
    const [registerForm, setRegisterForm] = useState<User>(initUser)
    const { firstName, lastName, username, image } = registerForm
    const { edgestore } = useEdgeStore();
    const [urls, setUrls] = useState<{
        url: string;
        thumbnailUrl: string | null;
    }>();

    useEffect(() => {
        if (session?.user) {
            const { user }: any = session
            const { id, firstName, lastName, username, image } = user
            setRegisterForm({
                ...registerForm,
                id,
                firstName,
                lastName,
                username,
                image
            })
        }
    }, [session])

    const handleChangeImage = async (event: any) => {
        const file: File = event.target.files?.[0]

        if (file) {
            const res: any = await edgestore.publicFiles.upload({
                file,
            });
            setUrls({
                url: res.url,
                thumbnailUrl: res.thumbnailUrl,
            });
            setRegisterForm({
                ...registerForm,
                image: res.url
            })
        }
    }

    const handleUpdateAccount = async (event: any) => {
        event.preventDefault();
        const { id, firstName, lastName, username } = registerForm

        const response = await fetch("/api/user/update", {
            method: "PUT",
            body: JSON.stringify({
                id,
                firstName,
                lastName,
                username,
                image
            })
        })

        if (response.ok) {
            toast.success(`User is updated!`)
        } else {
            toast.error("Unexpected error")
        }
    }

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (!session) {
        return <Auth />
    }

    return (<div className="rounded-lg border border-gray-100">
        <div className="px-6 py-4 text-gray-900 font-medium text-xl border-b border-b-gray-100">Settings</div>
        <div className="flex xl:flex-row flex-col-reverse p-6 gap-6">
            <div className="w-full">
                <div className="mb-4">
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
                <div className="mb-4">
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
                <div className="mb-6">
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
                <Button
                    className="text-white bg-success py-[0.875rem] px-8 rounded-full shadow-none"
                    disabled={!firstName || !lastName || !username}
                    onClick={handleUpdateAccount}
                >
                    Save Changes
                </Button>
            </div>
            <div className="xl:w-80 w-full shrink-0">
                <div className="relative w-56 h-56 mx-auto xl:mt-6">
                    {image ?
                        <Image
                            src={image}
                            alt={image}
                            fill={true}
                            className="w-56 h-56 rounded-full"
                        /> :
                        <div className="w-56 h-56 rounded-full bg-[#20b52633] text-success flex justify-center items-center text-8xl font-medium">HA</div>
                    }
                </div>
                <div className="mt-5 flex justify-center">
                    <label htmlFor="upload-photo" className="border-2 border-success py-[0.875rem] text-success px-8 rounded-full shadow-none font-semibold text-sm cursor-pointer">
                        Change Image
                    </label>
                    <input
                        className="hidden"
                        id="upload-photo"
                        type="file"
                        onChange={handleChangeImage}
                    />
                </div>
            </div>
        </div>
    </div>)
}
