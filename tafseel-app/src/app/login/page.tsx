export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold text-neutral-900">تسجيل الدخول</h1>
      <p className="text-neutral-600">
        هذه الصفحة مخصصة للعودة للمستخدمين الحاليين. فضلاً استخدم بياناتك
        للدخول، أو عد إلى{" "}
        <a href="/register" className="text-amber-600 hover:text-amber-500">
          إنشاء حساب جديد
        </a>{" "}
        إذا كنت زائراً جديداً.
      </p>
    </main>
  );
}
