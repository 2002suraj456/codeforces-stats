type ContestResult = {
    status: string;
    result: ContestEntry[];
};
type ContestEntry = {
    id: number;
    contestId: number;
    creationTimeSeconds: number;
    relativeTimeSeconds: number;
    problem: Problem;
    author: Author;
    programmingLanguage: string;
    verdict: string;
    testset: string;
    passedTestCount: number;
    timeConsumedMillis: number;
    memoryConsumedBytes: number;
};
type Problem = {
    contestId: number;
    index: string;
    name: string;
    type: string;
    points: number;
    rating: number;
    tags: string[];
};
type Author = {
    contestId: number;
    members: Member[];
    participantType: string;
    ghost: boolean;
    startTimeSeconds: number;
};
type Member = {
    handle: string;
};

export type {
    ContestResult,
    ContestEntry,
    Problem,
    Author,
    Member
}
