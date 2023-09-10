"use client";

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import Modal from "@/components/modal";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  projectId: z.string(),
  projectName: z.string().min(1, {
    message: "Name is required.",
  }),
});

function UpdateProjectModalHelper({
  showUpdateProjectModal,
  setShowUpdateProjectModal,
  updateProjectId,
  setUpdateProjectId,
  updateProjectName,
  setUpdateProjectName,
}: {
  showUpdateProjectModal: boolean;
  setShowUpdateProjectModal: Dispatch<SetStateAction<boolean>>;
  updateProjectId: string;
  setUpdateProjectId: (updateProjectId: string) => void;
  updateProjectName: string;
  setUpdateProjectName: (updateProjectName: string) => void;
}) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [domainError, setDomainError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: updateProjectId,
      projectName: updateProjectName,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/project/update", values);
      router.refresh();
      setShowUpdateProjectModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showUpdateProjectModal}
      setShowModal={setShowUpdateProjectModal}
    >
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl">
          Update Project
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="projectName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Project Name"
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
                disabled={isLoading}
                className="w-full"
                type="button"
                onClick={() => setShowUpdateProjectModal(false)}
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

export function useUpdateProjectModal() {
  const [updateProjectId, setUpdateProjectId] = useState("");
  const [updateProjectName, setUpdateProjectName] = useState("");
  const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);

  const UpdateProjectModal = useCallback(() => {
    return (
      <UpdateProjectModalHelper
        updateProjectId={updateProjectId}
        setUpdateProjectId={setUpdateProjectId}
        updateProjectName={updateProjectName}
        setUpdateProjectName={setUpdateProjectName}
        showUpdateProjectModal={showUpdateProjectModal}
        setShowUpdateProjectModal={setShowUpdateProjectModal}
      />
    );
  }, [
    updateProjectId,
    setUpdateProjectId,
    updateProjectName,
    setUpdateProjectName,
    showUpdateProjectModal,
    setShowUpdateProjectModal,
  ]);

  return useMemo(
    () => ({
      updateProjectId,
      setUpdateProjectId,
      updateProjectName,
      setUpdateProjectName,
      setShowUpdateProjectModal,
      UpdateProjectModal,
    }),
    [
      updateProjectId,
      setUpdateProjectId,
      updateProjectName,
      setUpdateProjectName,
      setShowUpdateProjectModal,
      UpdateProjectModal,
    ]
  );
}
