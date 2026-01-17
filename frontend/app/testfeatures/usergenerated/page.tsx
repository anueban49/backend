"use client";
import * as z from "zod";
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg, image/jpg, image/png, image/webp"];
const profilepicschema = z
    .instanceof(File)
    .refine((file) => file.size < MAX_UPLOAD_SIZE)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type));
const formSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    profilePicture: profilepicschema,
});

import { Form, useForm } from "react-hook-form";
import { FormControl, FormField, FormLabel } from "@/components/ui/form";

type formTypes = z.infer<typeof formSchema>;
export default function testPage() {
    const form = useForm<formTypes>
    return (
        <>
            <Form>
                <FormControl>
                    <FormLabel>Insert values</FormLabel>
                    <FormField></FormField>
                </FormControl>
            </Form>
        </>
    );
}
