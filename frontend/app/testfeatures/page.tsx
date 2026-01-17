"use client";
import { ImageUploadForm } from "./fileinput";
import { Card, CardContent } from "@/components/ui/card";
export default function TestFeaturesPage() {
    return (
        <>
            <Card className="w-100 h-180 ">
                <CardContent >
                    <ImageUploadForm></ImageUploadForm>
                </CardContent>
            </Card>
            <Card></Card>
        </>
    );
}
