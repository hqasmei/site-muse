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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
});

function CreateProjectModalHelper({
  showCreateProjectModal,
  setShowCreateProjectModal,
}: {
  showCreateProjectModal: boolean;
  setShowCreateProjectModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/project/create", values);
      router.refresh();
      setShowCreateProjectModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      showModal={showCreateProjectModal}
      setShowModal={setShowCreateProjectModal}
    >
      <div className="px-4 py-8">
        <div className="flex items-center gap-x-2 font-bold text-xl">
          Create a new Project
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="name"
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
                onClick={() => setShowCreateProjectModal(false)}
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
                    Creating
                  </>
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}

export function useCreateProjectModal() {
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const CreateProjectModal = useCallback(() => {
    return (
      <CreateProjectModalHelper
        showCreateProjectModal={showCreateProjectModal}
        setShowCreateProjectModal={setShowCreateProjectModal}
      />
    );
  }, [showCreateProjectModal, setShowCreateProjectModal]);

  return useMemo(
    () => ({ setShowCreateProjectModal, CreateProjectModal }),
    [setShowCreateProjectModal, CreateProjectModal]
  );
}
