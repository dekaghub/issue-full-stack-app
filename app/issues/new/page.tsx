'use client'
import ErrorMessage from '@/app/components/ErrorMessage';
import dynamic from 'next/dynamic';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const SimpleMDE = dynamic(
    () =>
        import('react-simplemde-editor'),
        { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
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
                    <TextField.Input placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Enter description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Add New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage