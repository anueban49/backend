"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { create } from "axios";
import Image from "next/image";

const formSchema = z.object({
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 5_000_000, "Max 5MB")
        .refine(
            (file) => ["image/png", "image/jpeg", "image/webp"].includes(file.type),
            "Invalid image type",
        ),
});

type FormValues = z.infer<typeof formSchema>;

export function ImageUploadForm() {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const [preview, setPreview] = useState<string | null>(null);
    const file = form.watch("image");

    useEffect(() => {
        if (!file) return setPreview(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);
    const imgPreview = (data: FormValues) => {
        const url = URL.createObjectURL(data.image);
        console.log(url);
        setPreview(url);
        return url;
    };
    return (
        <Form {...form} className="flex flex-col gap-8">
            <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload Image</FormLabel>
                            <FormControl>
                                {preview ? (
                                    <div className="w-full h-full">
                                        <Image
                                            src={preview}
                                            alt="Preview"
                                            className="max-h-64 max-w-64 object-contain"
                                        />
                                    </div>
                                ) : (
                                    <Input type="file" accept="image/*" {...field} />
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
