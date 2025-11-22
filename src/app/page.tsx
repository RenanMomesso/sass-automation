import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth-libs";
import {caller} from "@/trpc/server"

export default async function Home() {

  await requireAuth()
  const users = await caller.getUsers()
  console.log("🚀 ~ Home ~ users:", users)
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
     <Button>Hello World</Button>
     <div className="relative w-64 h-64 sm:w-96 sm:h-96">
      {JSON.stringify(users)}
     </div>
    </div>
  );
}
