/**
 * A memoized button component that allows users to add new nodes to the editor.
 * 
 * This component renders a button with a plus icon that can be used to trigger
 * node addition functionality. The button uses the outline variant with a
 * foreground background color.
 * 
 * @component
 * @returns A memoized button element for adding nodes
 * 
 * @remarks
 * Line 20 sets the displayName property which is necessary for:
 * - Improved debugging experience in React DevTools (shows "AddNodeButton" instead of "Memo()")
 * - Better error messages and stack traces
 * - Enhanced developer experience when inspecting the component tree
 * - Required for proper component identification when using React.memo()
 */
"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { memo } from "react";

export const AddNodeButton = memo(() => {
  return (
    <Button
      onClick={() => {}}
      size={"icon"}
      variant={"outline"}
      className="bg-foreground"
    >
      <PlusIcon />
    </Button>
  );
});

AddNodeButton.displayName = "AddNodeButton";