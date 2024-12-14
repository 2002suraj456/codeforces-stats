import { useQuery } from "@tanstack/react-query";
import { ContestResult } from "./ContestResult";

class FailedFetchError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FailedFetchError';
    }
}

class InvalidUserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidUserError';
    }
}

class SubmissionService {
    private static BASE_URL = 'https://codeforces.com/api';

    private static async fetchSubmission(username: string, from: number, count: number) {

        try {

            if (!username || username.trim().length === 0) {
                throw new InvalidUserError('Username cannot be empty.');
            }

            const url = `${this.BASE_URL}/user.status?handle=${encodeURIComponent(username)}&from=${from}&count=${count}`;

            const response = await fetch(url);

            const data = await response.json();

            if (data.status === 'FAILED') {
                throw new InvalidUserError(data.comment);
            }

            return data;

        } catch (error) {

            if (error instanceof InvalidUserError) {
                throw error;
            }

            if (error instanceof FailedFetchError) {
                throw error;
            }

            throw error

        }
    }

    static useSubmissionData(username: string, from: number, count: number) {
        return useQuery<ContestResult>({
            queryKey: ['submission', username, from, count],
            staleTime: Infinity,
            queryFn: () => this.fetchSubmission(username, from, count),
            retry: (failureCount, error) => {
                if (error instanceof InvalidUserError) {
                    return false;
                }
                return failureCount < 3;
            },
        });
    }
}

export { SubmissionService };