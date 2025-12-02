import {
  Editor,
  EditorError,
  EditorLoading,
} from "@/features/editor/components/editor";
import { EditorHeader } from "@/features/editor/components/editor-header";
import { prefetchWorkflow } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-libs";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface PageProps {
  params: Promise<{
    workflowId: string;
  }>;
}

const WorkflowPage = async ({ params }: PageProps) => {
  await requireAuth();
  const { workflowId } = await params;

  prefetchWorkflow(workflowId);
  //  we don need await here because its already returning void and only using to populating the cache

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError />}>
        <Suspense fallback={<EditorLoading />}>
          <EditorHeader workflowId={workflowId} />
          <Editor workflowId={workflowId} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default WorkflowPage;
