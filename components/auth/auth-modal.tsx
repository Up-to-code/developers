"use client";

import { useState } from "react";
import { X, ArrowRight, Loader2, Phone, Check } from "lucide-react";
import { signIn } from "@/lib/auth-client";

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
    callbackURL?: string;
};

type AuthStep = "phone" | "otp";

export function AuthModal({ isOpen, onClose, callbackURL = "/ws/chat/new" }: AuthModalProps) {
    const [step, setStep] = useState<AuthStep>("phone");
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.length < 8) {
            setError("الرجاء إدخال رقم هاتف صحيح");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Simulate API call for now or use actual auth client if configured
            // await signIn.phoneNumber({ phoneNumber });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setStep("otp");
        } catch {
            setError("حدث خطأ في إرسال الرمز. حاول مرة أخرى.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length < 4) {
            setError("رمز التحقق غير مكتمل");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // await signIn.phoneNumber({ phoneNumber, code: otp });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            window.location.href = callbackURL;
        } catch {
            setError("رمز التحقق خاطئ");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: "google" | "apple") => {
        setLoading(true);
        try {
            await signIn.social({
                provider,
                callbackURL,
            });
        } catch {
            setError("فشل تسجيل الدخول. حاول مرة أخرى.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm animate-in fade-in" dir="rtl">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                <button
                    onClick={onClose}
                    className="absolute left-6 top-6 rounded-full bg-slate-100 p-2 transition-colors hover:bg-slate-200"
                >
                    <X className="h-4 w-4 text-slate-500" />
                </button>

                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-black tracking-tight text-slate-900">
                        {step === "phone" ? "تسجيل الدخول" : "تأكيد الرقم"}
                    </h2>
                    <p className="mt-2 text-sm font-bold text-slate-400">
                        {step === "phone"
                            ? "استخدم حسابك في عنان للمتابعة"
                            : `أدخل الرمز المرسل إلى ${phoneNumber}`
                        }
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-2xl bg-red-50 p-4 text-center text-xs font-black text-red-500 animate-in bounce-in-95">
                        {error}
                    </div>
                )}

                {step === "phone" ? (
                    <div className="space-y-6">
                        <form onSubmit={handlePhoneSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="tel"
                                    placeholder="05XXXXXXXX"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 text-left text-lg font-black tracking-widest text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-black focus:bg-white"
                                    dir="ltr"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white p-1.5 shadow-sm">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-black text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <span>متابعة عبر واتساب</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100" />
                            </div>
                            <span className="relative bg-white px-4 text-xs font-bold text-slate-300">أو</span>
                        </div>

                        <div className="grid gap-3">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("google")}
                                className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-white text-slate-900 shadow-lg border border-slate-100 transition-all hover:scale-[1.02] hover:bg-slate-50"
                            >
                                {/* Google G Icon */}
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-sm font-black">Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin("apple")}
                                className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-black text-white shadow-xl transition-all hover:scale-[1.02] hover:bg-slate-900"
                            >
                                {/* Apple Logo */}
                                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.8 3.5-.71.59.04 2.25.18 3.3 1.76-2.88 1.41-2.4 5.3.45 6.45-.59 1.54-1.39 3.08-2.33 4.73zM12.03 7.25c-.15-2.29 1.83-4.14 3.96-4.25.18 2.45-2.43 4.5-3.96 4.25z" />
                                </svg>
                                <span className="text-sm font-black">Apple</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                        <div className="relative">
                            <input
                                type="text"
                                maxLength={6}
                                placeholder="000000"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="h-16 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 text-center text-3xl font-black tracking-[1em] text-slate-900 outline-none transition-all placeholder:text-slate-200 focus:border-black focus:bg-white"
                                dir="ltr"
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-black text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    <span>التحقق والدخول</span>
                                    <Check className="h-4 w-4" />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setStep("phone");
                                setError(null);
                                setOtp("");
                            }}
                            className="w-full text-center text-xs font-bold text-slate-400 hover:text-black"
                        >
                            تغيير رقم الهاتف
                        </button>
                    </form>
                )}
            </div>
        </div >
    );
}
