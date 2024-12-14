import { ContestEntry } from "./ContestResult";
import clsx from 'clsx';

function getMonthName(month: number) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
}

export function ProblemList({ map }: { map: Map<number, ContestEntry[]> }) {
    return (
        <div className="space-y-4">
            {Array.from(map.entries()).map(([month, entries]) => (
                <MonthyStats key={month} month={month} entries={entries} />
            ))}
        </div>
    );
}

function getRatingSum(entries: ContestEntry[]) {
    return entries.reduce((acc, entry) => acc + (entry.problem.rating || 0), 0);
}

function MonthyStats({ month, entries }: { month: number; entries: ContestEntry[] }) {
    const currentMonth = getMonthName(month);
    const ratingSum = getRatingSum(entries);
    const averageRating = Math.round(ratingSum / entries.length);
    return (
        <div key={month} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Month: {currentMonth} | Total Problems: {entries.length} | Average Rating: {averageRating}</h2>
            <h3 className="text-lg font-semibold mb-2">Problems:</h3>
            <ul className="list-none p-0">
                {entries.map((entry) => (
                    < Chips key={entry.creationTimeSeconds} entry={entry} />
                ))}
            </ul>
        </div >
    )
}

const getColor = (rating: number) => {
    if (rating >= 2900) return 'bg-red-500 text-white';
    if (rating >= 2600) return 'bg-red-500 text-white';
    if (rating >= 2400) return 'bg-red-500 text-white';
    if (rating >= 2300) return 'bg-orange-500 text-black';
    if (rating >= 2200) return 'bg-orange-500 text-black';
    if (rating >= 1900) return 'bg-violet-500 text-white';
    if (rating >= 1600) return 'bg-blue-500 text-white';
    if (rating >= 1400) return 'bg-cyan-500 text-black';
    if (rating >= 1200) return 'bg-green-500 text-black';
    return 'bg-gray-500 text-white';
};

function Chips({ entry }: { entry: ContestEntry }) {
    return (
        <li className={clsx('inline-block text-base font-medium border border-gray-300 px-4 py-2 m-1 rounded-lg', getColor(entry.problem.rating))}>
            <a href={`https://codeforces.com/problemset/problem/${entry.problem.contestId}/${entry.problem.index}`} target="_blank" rel="noopener noreferrer" className="text-sm ml-2">
                {entry.problem.name}
            </a>
        </li>
    );
}

export default ProblemList;
