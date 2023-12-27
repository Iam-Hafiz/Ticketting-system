import { Skeleton } from "@/app/_components/ui/skeleton";

export default function Loading() {
  return (

    <div>
        <div className="my-1 p-1 shadow-sm rounded-md lg:grid lg:grid-cols-12 lg:gap-2 hidden">
            <div className="font-bold text-sm col-span-2 col-start-1">Customer</div>
            <div className="font-bold text-sm col-span-3 col-start-3">Description</div>
            <div className="font-bold text-sm">Priority</div>
            <div className="font-bold text-sm">Assign to</div>
            <div className="font-bold text-sm">Status</div>
            <div className="font-bold text-sm">Created at</div>
            <div className="font-bold text-sm">Updated at</div>
            <div className="font-bold text-sm">Update</div>
            <div className="font-bold text-sm">Delete</div>
        </div>
        <div className="m-0.5 shadow-md rounded-md p-0.5 lg:grid lg:grid-cols-12 lg:gap-2 ">
          <div className="col-start-1 col-span-2">
            <div className=" flex items-start">
              <div className="w-1/4"><Skeleton className="h-10 w-10 rounded-full" /></div>
              <div className=" w-3/4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full " />
              </div>
            </div>
          </div>
          <div className="col-span-3 col-start-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full" />
          </div>
          <div><Skeleton className="h-4 w-full " /> </div>
          <div><Skeleton className="h-4 w-full " /> </div>
          <div><Skeleton className="h-4 w-full " /> </div>
          <div><Skeleton className="h-4 w-full " /> </div>
          <div><Skeleton className="h-4 w-full " /> </div>
          <div><Skeleton className="h-4 w-full " /> </div>
          <div><Skeleton className="h-4 w-full " /> </div>
        </div>
    </div>
  )
}
