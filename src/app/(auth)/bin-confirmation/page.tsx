"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  binConfirmationSchema,
  BinConfirmationSchemaType,
} from "@/schemas/bin-confirmation";
import { SharedFormField } from "@/ui/components/shared/SharedFormField";
import { useLanguage } from "@/ui/contexts/LanguageContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function BinConfirmationPage() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useRouter();
  const [attempts, setAttempts] = useState<number>(0);
  const form = useForm<BinConfirmationSchemaType>({
    resolver: zodResolver(binConfirmationSchema(language)),
    defaultValues: {
      bin: "",
    },
  });

  const onBinConfirmationSubmit = async (data: BinConfirmationSchemaType) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      if (data.bin === "20202020") {
        toast.success(
          language === "en" ? "Bin Number correct" : "رقم التأكيد صحيح",
          {
            description:
              language === "en"
                ? "BIN number submitted successfully!"
                : "تم ارسال رقم التأكيد بنجاح",
          }
        );
        navigate.push("/reset-password");
        setAttempts(0);
        form.reset();
      } else {
        form.reset();
        setAttempts(attempts + 1);
        toast.error(
          language === "en" ? "Invalid Bin Number" : "رقم التأكيد غير صحيح",
          {
            description:
              language === "en"
                ? `Invalid Bin Number, still ${3 - attempts} attempts left`
                : `رقم التأكيد غير صحيحرقم التأكيد غير صحيح, باقي ${
                    3 - attempts
                  } محاولة`,
          }
        );
        if (attempts === 2) {
          navigate.push("/login");
          setAttempts(0);
        }
      }
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
              onSubmit={form.handleSubmit(onBinConfirmationSubmit)}
              className="space-y-4"
              dir={language === "en" ? "ltr" : "rtl"}
            >
              <SharedFormField
                control={form.control}
                label={language === "en" ? "BIN Number" : "رقم التأكيد"}
                language={language}
                name="bin"
                placeholder={
                  language === "en"
                    ? "Enter your Otp Number"
                    : "أدخل رفم التأكيدي"
                }
                type="otp"
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
