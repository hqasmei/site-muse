'use client';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreateLinkModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  linkUrl: z
    .string()
    .min(1, {
      message: 'Link is required.',
    })
    .refine(
      (value) => {
        // Custom URL format validation
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(value);
      },
      {
        message: 'Invalid URL format.',
      },
    ),
  projectId: z.string(),
});

function CreateLinkModalHelper({
  showCreateLinkModal,
  setShowCreateLinkModal,
  props,
}: {
  showCreateLinkModal: boolean;
  setShowCreateLinkModal: Dispatch<SetStateAction<boolean>>;
  props?: CreateLinkModalProps;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkUrl: '',
      projectId: props?.projectId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/link/create', values);
      router.refresh();
      setShowCreateLinkModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showCreateLinkModal}
      setShowModal={setShowCreateLinkModal}
    >
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl">
          Add Link
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="linkUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Add link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="http://"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="w-full flex justify-center space-x-6">
              <Button
                size="lg"
                variant="outline"
                type="button"
                disabled={isLoading}
                className="w-full"
                onClick={() => setShowCreateLinkModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}

export function useCreateLinkModal({
  props,
}: { props?: CreateLinkModalProps } = {}) {
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);

  const CreateLinkModal = useCallback(() => {
    return (
      <CreateLinkModalHelper
        showCreateLinkModal={showCreateLinkModal}
        setShowCreateLinkModal={setShowCreateLinkModal}
        props={props}
      />
    );
  }, [showCreateLinkModal, setShowCreateLinkModal]);

  return useMemo(
    () => ({
      setShowCreateLinkModal,
      CreateLinkModal,
    }),
    [setShowCreateLinkModal, CreateLinkModal],
  );
}
