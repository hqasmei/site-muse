"use client";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Modal from "@/components/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  linkUrl: z
    .string()
    .min(1, {
      message: "Link is required.",
    })
    .refine(
      (value) => {
        // Custom URL format validation
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(value);
      },
      {
        message: "Invalid URL format.",
      }
    ),
  projectId: z.string(),
});

function CreateLinkModalHelper({
  showCreateLinkModal,
  setShowCreateLinkModal,
  addProjectId,
  setAddProjectId,
}: {
  showCreateLinkModal: boolean;
  setShowCreateLinkModal: Dispatch<SetStateAction<boolean>>;
  addProjectId: string;
  setAddProjectId: (addProjectId: string) => void;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkUrl: "",
      projectId: addProjectId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/link/create", values);
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

export function useCreateLinkModal() {
  const [addProjectId, setAddProjectId] = useState("");
  const [showCreateLinkModal, setShowCreateLinkModal] = useState(false);

  const CreateLinkModal = useCallback(() => {
    return (
      <CreateLinkModalHelper
        addProjectId={addProjectId}
        setAddProjectId={setAddProjectId}
        showCreateLinkModal={showCreateLinkModal}
        setShowCreateLinkModal={setShowCreateLinkModal}
      />
    );
  }, [
    addProjectId,
    setAddProjectId,
    showCreateLinkModal,
    setShowCreateLinkModal,
  ]);

  return useMemo(
    () => ({
      addProjectId,
      setAddProjectId,
      setShowCreateLinkModal,
      CreateLinkModal,
    }),
    [addProjectId, setAddProjectId, setShowCreateLinkModal, CreateLinkModal]
  );
}
