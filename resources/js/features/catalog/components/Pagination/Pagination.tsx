import { Link } from "@inertiajs/react";

type Props = {
    currentPage: number;
    lastPage: number;
};

export default function Pagination({
    currentPage,
    lastPage,
}: Props) {
    return (
        <div className="mt-10 flex items-center justify-center gap-2">

            {currentPage > 1 && (
                <Link
                    href={`?page=${currentPage - 1}`}
                    className="rounded-lg border px-4 py-2"
                >
                    Previous
                </Link>
            )}

            <span className="px-4">
                {currentPage} / {lastPage}
            </span>

            {currentPage < lastPage && (
                <Link
                    href={`?page=${currentPage + 1}`}
                    className="rounded-lg border px-4 py-2"
                >
                    Next
                </Link>
            )}

        </div>
    );
}
