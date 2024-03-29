import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

const IssuesPage = async ({ searchParams }: {
    searchParams:
    {
        status: Status,
        orderBy: keyof Issue,
        sortOrder: "asc" | "desc",
        page: string
    }
}) => {
    const columns: { label: string, value: keyof Issue, className?: string }[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: 'status', className: "hidden md:table-cell" },
        { label: 'Created', value: 'createdAt', className: "hidden md:table-cell" }
    ]

    const orderBy = searchParams.orderBy ? { [searchParams.orderBy]: searchParams.sortOrder } : undefined;
    const toggleOrder = () => {
        return !searchParams.sortOrder || searchParams.sortOrder === "desc" ? "asc" : "desc";
    };
    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
    const where = { status }

    const page = parseInt(searchParams.page) || 1
    const pageSize = 5

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize
    });

    const issueCount = await prisma.issue.count({ where })

    return (
        <div>
            <IssueActions />
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        {columns.map(column => (
                            <Table.ColumnHeaderCell key={column.value} className={column.className}>
                                <NextLink href={{
                                    query: { ...searchParams, orderBy: column.value, sortOrder: toggleOrder() }
                                }}>
                                    {column.label}
                                </NextLink>
                                {column.value === searchParams.orderBy && (searchParams.sortOrder === "asc" ? <ArrowUpIcon className="inline" /> : <ArrowDownIcon className="inline" />)}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className="block md:hidden">
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className="hidden md:table-cell">
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
            <Pagination
                pageSize={pageSize}
                currentPage={page}
                itemCount={issueCount}
            />
        </div>
    );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
