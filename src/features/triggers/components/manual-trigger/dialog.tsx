import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DialogManualTriggerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DialogManualTrigger = ({
  isOpen,
  onClose,
}: DialogManualTriggerProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manual Trigger</DialogTitle>
          <DialogDescription>
            This workflow is triggered manually. You can start it by clicking the
            "Run" button in the editor.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
