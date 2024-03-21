'use client'
import ErrorMessage from '@/app/components/ErrorMessage';
import dynamic from 'next/dynamic';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(
    () =>
        import('react-simplemde-editor'),
    { ssr: false });

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data);
            else 
                await axios.post('/api/issues', data);
            router.push('/issues');
            router.refresh(); // makes the page refresh after push
        } catch (error) {
            setSubmitting(false);
            setError("Error in Form")
        }
    });

    return (
        <div className='max-w-xl'>
            {error &&
                <Callout.Root color='red'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>}
            <form
                className='space-y-3'
                onSubmit={onSubmit}
            >
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder='Enter description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}> {issue? 'Update Issue': 'Add New Issue'} {' '} {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm