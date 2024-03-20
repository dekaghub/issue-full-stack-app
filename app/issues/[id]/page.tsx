import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { Pencil1Icon } from '@radix-ui/react-icons';
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link';

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })
    if (!issue)
        notFound();

    return (
        <Grid columns={{ initial: "1", sm: "2" }} gap="5">
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex gap="5" my="4">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' mt="3">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil1Icon />
                    <Link href={`/issues/${issue.id}/edit`}>
                        Edit Issue
                    </Link>
                </Button>
            </Box>
        </Grid>
    )
}

export default IssueDetailPage