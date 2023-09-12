'use client';

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GRADIENT_COLORS } from '@/lib/constants';
import { UpdateProjectModalProps } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  projectId: z.string(),
  projectName: z.string().min(1, {
    message: 'Name is required.',
  }),
  projectColor: z.string().min(1, {
    message: 'Color is required.',
  }),
});

function UpdateProjectModalHelper({
  showUpdateProjectModal,
  setShowUpdateProjectModal,
  props,
}: {
  showUpdateProjectModal: boolean;
  setShowUpdateProjectModal: Dispatch<SetStateAction<boolean>>;
  props?: UpdateProjectModalProps;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectId: props?.projectId,
      projectName: props?.projectName,
      projectColor: props?.projectColor,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/project/update', values);
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
              name="projectColor"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Select Color</FormLabel>

                  <Select disabled={isLoading} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={`${GRADIENT_COLORS[0]}`}>
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              className={`h-4 w-4 bg-gradient-to-r ${GRADIENT_COLORS[0]} rounded-full`}
                            ></span>
                            <span>Blue</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={`${GRADIENT_COLORS[1]}`}>
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              className={`h-4 w-4 bg-gradient-to-r ${GRADIENT_COLORS[1]} rounded-full`}
                            ></span>
                            <span>Purple</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={`${GRADIENT_COLORS[2]}`}>
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              className={`h-4 w-4 bg-gradient-to-r ${GRADIENT_COLORS[2]} rounded-full`}
                            ></span>
                            <span>Green</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={`${GRADIENT_COLORS[3]}`}>
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              className={`h-4 w-4 bg-gradient-to-r ${GRADIENT_COLORS[3]} rounded-full`}
                            ></span>
                            <span>Red</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={`${GRADIENT_COLORS[4]}`}>
                          <div className="flex flex-row items-center space-x-2">
                            <span
                              className={`h-4 w-4 bg-gradient-to-r ${GRADIENT_COLORS[4]} rounded-full`}
                            ></span>
                            <span>Gray</span>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
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

export function useUpdateProjectModal({
  props,
}: { props?: UpdateProjectModalProps } = {}) {
  const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);

  const UpdateProjectModal = useCallback(() => {
    return (
      <UpdateProjectModalHelper
        showUpdateProjectModal={showUpdateProjectModal}
        setShowUpdateProjectModal={setShowUpdateProjectModal}
        props={props}
      />
    );
  }, [showUpdateProjectModal, setShowUpdateProjectModal]);

  return useMemo(
    () => ({
      setShowUpdateProjectModal,
      UpdateProjectModal,
    }),
    [setShowUpdateProjectModal, UpdateProjectModal],
  );
}
