"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  forgetPasswordSchema,
  ForgetPasswordShemaType,
} from "@/schemas/forget-password";
import { SharedFormField } from "@/ui/components/shared/SharedFormField";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useRouter();
  const form = useForm<ForgetPasswordShemaType>({
    resolver: zodResolver(forgetPasswordSchema(language)),
    defaultValues: {
      email: "",
    },
  });

  const onForgetPasswordSubmit = async (data: ForgetPasswordShemaType) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, check if email is "notfound@example.com" to simulate non-existent user

      toast.success(
        language === "en" ? "Email sent successfully" : "تم ارسال البريد بنجاح",
        {
          description:
            language === "en"
              ? "Email Content with number 20202020, valid for 3min"
              : "البريد الالكتروني محتواه رقم 20202020، وصالح لمدة 3 دقائق",
        }
      );
      navigate.push("/bin-confirmation");
      form.reset();
    }, 1500);
  };
  return (
    <div className="relative w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {language === "en" ? "Forget Password" : "نسيت كلمة المرور"}
          </CardTitle>
          <CardDescription>
            {language === "en"
              ? "Enter your email and we'll send you a reset link"
              : "أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onForgetPasswordSubmit)}
              className="space-y-4"
              dir={language === "en" ? "ltr" : "rtl"}
            >
              <SharedFormField
                control={form.control}
                label={language === "en" ? "Email" : "البريد الالكتروني"}
                language={language}
                name="email"
                placeholder={
                  language === "en"
                    ? "Enter your email"
                    : "أدخل البريد الالكتروني"
                }
                type="email"
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading
                  ? language === "en"
                    ? "Sending..."
                    : "يتم ارسال..."
                  : language === "en"
                  ? "Send"
                  : "ارسال"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {language === "en" ? "Back to Login" : "العودة إلى تسجيل الدخول"}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
