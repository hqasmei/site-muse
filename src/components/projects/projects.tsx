'use client';

import { useEffect, useState } from 'react';

import { useCreateProjectModal } from '@/components/modals/create-project-modal';
import { Button } from '@/components/ui/button';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Project } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import ProjectItem from './project-item';

type ProjectsProps = {
  input: Project[];
};

type DNDType = {
  id: UniqueIdentifier;
  item: any;
};

export const Projects = ({ input }: ProjectsProps) => {
  const { setShowCreateProjectModal, CreateProjectModal } =
    useCreateProjectModal();

  const [containers, setContainers] = useState<DNDType[]>(
    input.map((item) => ({
      id: 'container-' + item.id,
      item: item,
    })),
  );

  useEffect(() => {
    // Update the containers state with the new data
    setContainers(
      input.map((item) => ({
        id: 'container-' + item.id,
        item: item,
      })),
    );
  }, [input]);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['getProjects', { id: "1234"}],
  //   queryFn: async () => {
  //     const { data } = await axios.post('/api/link/get', {
  //       projectId: item.id,
  //     });
  //     return data;
  //   },
  // });

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const findItem = (id: UniqueIdentifier | undefined) => {
    const container = containers.find((item) => item.id === id);
    return container;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes('container') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id,
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    setActiveId(null);
  };

  return (
    <>
      <CreateProjectModal />
      <div className="mt-8 justify-between flex border-b border-gray-200 pb-5  flex-row  items-center  gap-0 px-4">
        <h1 className="mb-3 font-heading text-2xl font-semibold text-gray-900 lg:text-4xl">
          My Projects
        </h1>

        <Button size="sm" onClick={() => setShowCreateProjectModal(true)}>
          Create Project
        </Button>
      </div>
      {input.length === 0 ? (
        <div className="relative flex flex-col items-center gap-4 p-8 h-full flex-1 mt-8 px-4">
          <p className="mt-1 text-sm text-zinc-500">
            Let&#39;s create your first Project.
          </p>
          <div className="mt-8"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8 pb-24 mt-8 px-4 z-50">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={containers.map((i) => i.id)}
              // strategy={rectSwappingStrategy}
            >
              {containers.map((container) => (
                <ProjectItem
                  id={container.id}
                  item={container.item}
                  key={container.id}
                ></ProjectItem>
              ))}
            </SortableContext>
            {/* <DragOverlay adjustScale={false}>
              {activeId && activeId.toString().includes('container') && (
                <ProjectItem
                  id={activeId}
                  item={findItem(activeId)?.item}
                ></ProjectItem>
              )}
            </DragOverlay> */}
          </DndContext>
        </div>
      )}
    </>
  );
};
