import { auth } from '@/lib/auth';

export default async function Dashboard() {
  const session = await auth();

  return (
    <div>
      <p>This is the dashboard.</p>
      <p>Session: {JSON.stringify(session)}</p>
    </div>
  );
}
