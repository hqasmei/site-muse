"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import Modal from "@/components/modal";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  linkId: z.string(),
});

function DeleteLinkModalHelper({
  showDeleteLinkModal,
  setShowDeleteLinkModal,
  deleteLinkId,
  setDeleteLinkId,
}: {
  showDeleteLinkModal: boolean;
  setShowDeleteLinkModal: Dispatch<SetStateAction<boolean>>;
  deleteLinkId: string;
  setDeleteLinkId: (deleteLinkId: string) => void;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkId: deleteLinkId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/link/delete", values);
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

export function useDeleteLinkModal() {
  const [deleteLinkId, setDeleteLinkId] = useState("");
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false);

  const DeleteLinkModal = useCallback(() => {
    return (
      <DeleteLinkModalHelper
        deleteLinkId={deleteLinkId}
        setDeleteLinkId={setDeleteLinkId}
        showDeleteLinkModal={showDeleteLinkModal}
        setShowDeleteLinkModal={setShowDeleteLinkModal}
      />
    );
  }, [
    deleteLinkId,
    setDeleteLinkId,
    showDeleteLinkModal,
    setShowDeleteLinkModal,
  ]);

  return useMemo(
    () => ({
      deleteLinkId,
      setDeleteLinkId,
      setShowDeleteLinkModal,
      DeleteLinkModal,
    }),
    [deleteLinkId, setDeleteLinkId, setShowDeleteLinkModal, DeleteLinkModal]
  );
}
