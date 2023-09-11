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
import { Form } from '@/components/ui/form';
import { DeleteLinkModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  linkId: z.string(),
});

function DeleteLinkModalHelper({
  showDeleteLinkModal,
  setShowDeleteLinkModal,
  props,
}: {
  showDeleteLinkModal: boolean;
  setShowDeleteLinkModal: Dispatch<SetStateAction<boolean>>;
  props?: DeleteLinkModalProps;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkId: props?.linkId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/link/delete', values);
      router.refresh();
      setShowDeleteLinkModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showDeleteLinkModal}
      setShowModal={setShowDeleteLinkModal}
    >
      <div className="p-4">
        <div className="flex items-center gap-x-2 font-bold text-xl justify-center pb-4">
          Delete link
        </div>
        <div className="pb-4">
          This link will immediately be deleted. Once deleted, you&#39;ll no
          longer be able to view or modify this link.
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="w-full flex justify-center space-x-6">
              <Button
                size="lg"
                variant="outline"
                disabled={isLoading}
                className="w-full"
                type="button"
                onClick={() => setShowDeleteLinkModal(false)}
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
                    Deleting
                  </>
                ) : (
                  <span>Delete</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}

export function useDeleteLinkModal({
  props,
}: { props?: DeleteLinkModalProps } = {}) {
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false);

  const DeleteLinkModal = useCallback(() => {
    return (
      <DeleteLinkModalHelper
        showDeleteLinkModal={showDeleteLinkModal}
        setShowDeleteLinkModal={setShowDeleteLinkModal}
        props={props}
      />
    );
  }, [showDeleteLinkModal, setShowDeleteLinkModal]);

  return useMemo(
    () => ({
      setShowDeleteLinkModal,
      DeleteLinkModal,
    }),
    [setShowDeleteLinkModal, DeleteLinkModal],
  );
}
