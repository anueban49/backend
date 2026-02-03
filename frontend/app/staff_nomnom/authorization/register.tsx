//this willl take two steps => enter email and confirm password and password
"use client";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  StaffRegistySchema,
  StaffRegistryType,
} from "@/app/schemas/StaffSchema";
import { useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import { useStaffAuth } from "@/context/StaffContext";
import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft } from "lucide-react";

export default function Staffregister() {
  const [creating, setCreating] = useState(false);

  const [step, setStep] = useState(1);
  //when done is true, set step +1.

  const { staff, signup } = useStaffAuth();
  const form = useForm<StaffRegistryType>({
    resolver: zodResolver(StaffRegistySchema),
    mode: "onSubmit",
    defaultValues: {
      firstname: "",
      lastname: "",
      dob: undefined,
      SSN: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  async function handleSignup(data: StaffRegistryType) {
    setCreating(true);

    try {
      await signup(data);
      console.log("success");
      toast.success("Account created");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account");
    } finally {
      setCreating(false);
    }
  }
  const PartOne = () => {
    return (
      <>
        {" "}
        <Form {...form}>
          <form className="space-y-4 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              className="w-full  bg-red-500"
              onClick={() => {
                setStep((prev) => prev + 1);
                console.log("step:", step);
              }}
            >
              Next
            </Button>
          </form>
        </Form>
      </>
    );
  };
  const PartTwo = () => {
    const calculateAge = (birthDate: Date): number => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Adjust if birthday hasn't occurred yet this year
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    };
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
    const [age, setAge] = React.useState<number | null>(null);
    const [isOldEnough, setIsOldEnough] = React.useState(false);

    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date);

      if (date) {
        const calculatedAge = calculateAge(date);
        setAge(calculatedAge);
        setIsOldEnough(calculatedAge >= 18); // or whatever minimum age you need
      } else {
        setAge(null);
        setIsOldEnough(false);
      }
    };
    return (
      <>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="SSN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SSN</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={9}
                      value={field.value.toString()}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                        <InputOTPSlot index={8} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">Date of Birth</label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-lg border"
                captionLayout="dropdown"
                fromYear={1940}
                toYear={new Date().getFullYear()}
                disabled={(date) => date > new Date()}
              />

              {age !== null && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Age: <span className="font-semibold">{age} years old</span>
                  </p>
                  {!isOldEnough && (
                    <p className="text-sm text-red-600 mt-1">
                      You must be at least 18 years old to register.
                    </p>
                  )}
                  {isOldEnough && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ Age requirement met
                    </p>
                  )}
                </div>
              )}
            </div>

            <Button
              type="button"
              className="w-full bg-red-500"
              disabled={!isOldEnough || !selectedDate}
              onClick={async () => {
                const isValid = await form.trigger(["SSN"]);
                if (isValid && isOldEnough) {
                  setStep((prev) => prev + 1);
                }
              }}
            >
              Next
            </Button>
          </form>
        </Form>
      </>
    );
  };
  const PartThree = () => {
    const [agreed, setAgreed] = useState(false);
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center items-center gap-2">
            <Checkbox
              id="terms-checkbox-2"
              name="terms-checkbox-2"
              onCheckedChange={() => {
                setAgreed(true);
              }}
            />
            <p>
              I declare under penalty of perjury under the laws of the State of
              Alabama that the foregoing is true and correct.
            </p>
          </div>

          <Button
            className="w-full  bg-red-500"
            type="submit"
            disabled={!agreed}
          >
            Sign Up
          </Button>
        </form>
      </Form>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-center items-center">
        <p>Please fill the form accurately.</p>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => {
            if (step >= 1) {
              return;
            }
            setStep((prev) => prev - 1);
          }}
        >
          {" "}
          <ChevronLeft color="red" size={40} />
        </Button>
      </div>
      {step === 1 && <PartOne />}
      {step === 2 && <PartTwo />}
      {step === 3 && <PartThree />}
    </div>
  );
}
