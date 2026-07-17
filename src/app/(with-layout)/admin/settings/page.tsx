import ChangePasswordForm from "@/components/Auth/ChangePasswordForm";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Sozlamalar</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-dark-6">Admin hisob sozlamalari.</p>
      </div>

      <ChangePasswordForm />
    </div>
  );
}
