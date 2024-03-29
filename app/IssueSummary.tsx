import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    open: number,
    inProgress: number,
    closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const summaries: { label: string, value: number, status: Status }[] = [
        { label: 'Open Issues', value: open, status: 'OPEN'},
        { label: 'Closed Issues', value: closed, status: 'CLOSED'},
        { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS'},
    ]
    return (
        <Flex gap="4">
            {summaries.map(summary => (
                <Card key={summary.value}>
                    <Flex direction="column">
                        <Link 
                            className='text-lg font-thin hover:bg-sky-100'
                            href={`/issues/list?status=${summary.status}`}
                            >
                            {summary.label}
                        </Link>
                        <Text size="4" className='font-semibold'>{summary.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary