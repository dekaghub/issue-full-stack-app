'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const handleDelete =  async () => {
        await axios.delete('/api/issues/' + issueId);
        router.push('/issues')
        router.refresh();
    }


    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm Delete?</AlertDialog.Title>
                <AlertDialog.Description>Are you sure you want to delete this issue?</AlertDialog.Description>
                <Flex direction="row" mt="4" gap="4">
                    <AlertDialog.Action>
                        <Button color="red" onClick={handleDelete}>Delete Issue</Button>
                    </AlertDialog.Action>
                    <AlertDialog.Cancel>
                        <Button color="iris">Cancel</Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton