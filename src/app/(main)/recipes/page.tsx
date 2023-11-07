"use client"
import { PtBreadcrumb } from "@/components/ptBreadcrumb";
import { RecipeCard } from "./recipeCard";
import { useEdgeStore } from "@/providers/edgestore";
import { useState } from "react";
import Link from "next/link";

export default function Recipes() {
    const items = [{ label: "Recipes", className: "text-success" }]
    const { edgestore } = useEdgeStore();
    const [file, setFile] = useState<File>();
    const [progress, setProgress] = useState(0);
    const [urls, setUrls] = useState<{
        url: string;
        thumbnailUrl: string | null;
    }>();

    return (<div>
        <PtBreadcrumb items={items} />
        <div className="lg:max-w-[90rem] md:max-w-[87.5rem] max-w-[85rem] h-full mx-auto lg:px-[3.75rem] md:px-10 px-5">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
                <RecipeCard />
                <RecipeCard />
            </div>
        </div>
        {progress}%
        <input
            type="file"
            onChange={(e) => {
                setFile(e.target.files?.[0]);
            }}
        />
        <button
            onClick={async () => {
                console.log(file)
                if (file) {
                    const res: any = await edgestore.publicFiles.upload({
                        file,
                        onProgressChange: (progress) => {
                            setProgress(progress);
                        },
                    });
                    // you can run some server action or api here
                    // to add the necessary data to your database
                    console.log(res);
                    setUrls({
                        url: res.url,
                        thumbnailUrl: res.thumbnailUrl,
                    });

                }
            }}
        >
            Upload
        </button>
        <br></br>
        {urls?.url && (
            <Link href={urls.url} target="_blank">
                URL
            </Link>
        )}
        <br></br>
        {urls?.thumbnailUrl && (
            <Link href={urls.thumbnailUrl} target="_blank">
                THUMBNAIL
            </Link>
        )}
    </div>)
}