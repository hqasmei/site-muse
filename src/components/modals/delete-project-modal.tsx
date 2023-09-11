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
import { DeleteProjectModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  projectId: z.string(),
});

function DeleteProjectModalHelper({
  showDeleteProjectModal,
  setShowDeleteProjectModal,
  props,
}: {
  showDeleteProjectModal: boolean;
  setShowDeleteProjectModal: Dispatch<SetStateAction<boolean>>;
  props?: DeleteProjectModalProps;
}) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [domainError, setDomainError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: props?.projectId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/project/delete', values);
      router.refresh();
      setShowDeleteProjectModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showDeleteProjectModal}
      setShowModal={setShowDeleteProjectModal}
    >
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl justify-center pb-2">
          Delete project
        </div>
        <div className="pb-4">
          This project will immediately be deleted. Once deleted, you&#39;ll no
          longer be able to view or modify this dashboard.
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
                onClick={() => setShowDeleteProjectModal(false)}
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

export function useDeleteProjectModal({
  props,
}: { props?: DeleteProjectModalProps } = {}) {
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);

  const DeleteProjectModal = useCallback(() => {
    return (
      <DeleteProjectModalHelper
        showDeleteProjectModal={showDeleteProjectModal}
        setShowDeleteProjectModal={setShowDeleteProjectModal}
        props={props}
      />
    );
  }, [showDeleteProjectModal, setShowDeleteProjectModal]);

  return useMemo(
    () => ({
      setShowDeleteProjectModal,
      DeleteProjectModal,
    }),
    [setShowDeleteProjectModal, DeleteProjectModal],
  );
}
