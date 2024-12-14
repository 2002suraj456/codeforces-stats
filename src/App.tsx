import "./index.css";
import ProblemList from "./ProblemList";
import { ContestResult, ContestEntry } from "./ContestResult";
import { SubmissionService } from "./SubmissionService";
import { useDebouncedInput } from "./DebouncedInput";

function App() {

  const [username, debouncedusername, setUsername] = useDebouncedInput("456suraj2002")

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-4 shadow-md">
        <h1 className="text-center text-2xl font-semibold">Codeforces Submission Tracker</h1>
      </header>
      <main className="flex flex-col items-center py-10 px-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full max-w-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Codeforces Username"
        />
        <UserStats username={debouncedusername} />
      </main>
      <footer className="w-full bg-gray-800 text-white text-center py-4 mt-auto">
        <p className="text-sm">&copy; 2024 Codeforces Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Component to Display User Statistics
function UserStats({ username }: { username: string }) {
  const { isLoading, error, data } = SubmissionService.useSubmissionData(username, 1, 10000);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-semibold text-blue-600">Loading...</h1>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-semibold text-red-600">{error?.message}</h1>
      </div>
    );
  }

  if (data?.status === "FAILED") {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <h1 className="text-xl font-semibold text-red-600">User Not Found.</h1>
      </div>
    );
  }

  const submissionsByMonth = new Map<number, ContestEntry[]>();

  data.result
    .filter((entry) => entry.verdict === "OK")
    .forEach((entry) => {
      const date = new Date(entry.creationTimeSeconds * 1000);
      if (date.getFullYear() === 2022) {
        const month = date.getMonth();
        if (!submissionsByMonth.has(month)) {
          submissionsByMonth.set(month, []);
        }
        submissionsByMonth.get(month)?.push(entry);
      }
    });

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Submissions for {username}</h2>
      <ProblemList map={submissionsByMonth} />
    </div>
  );
}

export default App;
export type { ContestResult, ContestEntry };
