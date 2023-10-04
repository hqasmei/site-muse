export default function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="11.25"
      viewBox="0 0 16 9"
      className={className}
    >
      <path
        fill="currentColor"
        d="M12.5 5h-9c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h9c.28 0 .5.22.5.5s-.22.5-.5.5Z"
      />
      <path
        fill="currentColor"
        d="M6 8.5a.47.47 0 0 1-.35-.15l-3.5-3.5c-.2-.2-.2-.51 0-.71L5.65.65c.2-.2.51-.2.71 0c.2.2.2.51 0 .71L3.21 4.51l3.15 3.15c.2.2.2.51 0 .71c-.1.1-.23.15-.35.15Z"
      />
    </svg>
  );
}
