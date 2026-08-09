interface DashboardHeaderProps {
  userName?: string | null;
}

export default function DashboardHeader({
  userName,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Dashboard
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Welcome back{userName ? `, ${userName}` : ""}. Here's what's happening
        with your store.
      </p>
    </div>
  );
}