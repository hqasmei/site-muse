'use client';

import React from 'react';

import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

import { ProjectCard } from '../project/project-card';

type ContainerProps = {
  id: UniqueIdentifier;
  item: string;
};

const ProjectItem = ({ id, item }: ContainerProps) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'relative bg-transparent flex flex-col gap-y-4',
        // isDragging && 'opacity-50',
      )}
    >
      <ProjectCard item={item} />
      {/* hover:bg-[#F2F2F2] */}
      <button
        className={` p-0.5 rounded-md absolute top-0 right-0 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        {...listeners}
      >
        <Icon
          icon="clarity:drag-handle-line"
          width="36"
          height="36"
          color="#FFFFFF"
          // color="#717b87"
        />
      </button>
    </div>
  );
};

export default ProjectItem;
