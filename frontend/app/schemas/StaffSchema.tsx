'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormDescription, FormLabel, FormMessage, useFormField } from '@/components/ui/form';
export const StaffSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    dob: z.date(),
    email: z.email(),
})

export type StaffFormType = z.infer<typeof StaffSchema>