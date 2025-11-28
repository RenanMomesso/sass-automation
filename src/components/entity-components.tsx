import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHef?: never }
  | { newButtonHef: string; onNew?: never }
  | { onNew?: never; newButtonHef?: never }
);

export const EntityHeader = ({
  title,
  description,
  disabled,
  isCreating,
  newButtonLabel,
  newButtonHef,
  onNew,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-2xl">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHef && (
        <Button disabled={disabled || isCreating} onClick={onNew} size={"sm"}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {newButtonLabel || "New"}
        </Button>
      )}
      {newButtonHef && !onNew && (
        <Button disabled={disabled || isCreating} size={"sm"}>
          <Link href={newButtonHef} prefetch>
            <PlusIcon className="mr-2 h-4 w-4" />
            {newButtonLabel || "New"}
          </Link>
        </Button>
      )}
    </div>
  );
};

type EntityContainerProps = {
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
  children: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  pagination,
  search,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">
        {header}
        <div>
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};
