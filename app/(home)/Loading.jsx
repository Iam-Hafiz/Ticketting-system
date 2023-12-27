import { Skeleton } from "@/app/_components/ui/skeleton";
import { number } from "zod";

export default function Loading() {
  const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  return (
    <div>
        <div className="my-1 p-1 shadow-sm rounded-md lg:grid lg:grid-cols-8 lg:gap-2 hidden">
            <div className="font-bold text-sm col-span-1 col-start-1">Customer</div>
            <div className="font-bold text-sm col-span-2 col-start-2">Title</div>
            <div className="font-bold text-sm">Priority</div>
            <div className="font-bold text-sm">Assign to</div>
            <div className="font-bold text-sm">Status</div>
            <div className="font-bold text-sm">Created at</div>
            <div className="font-bold text-sm">Updated at</div>
        </div>
        {numbers.map((element, index) => 
          <div key={index} className="m-0.5 shadow-md rounded-md p-0.5 lg:grid lg:grid-cols-8 lg:gap-2 ">
            <div className="col-start-1 col-span-1">
              <div className=" flex items-start">
                <div className="w-1/4"><Skeleton className="h-10 w-full rounded-full" /></div>
                <div className=" w-3/4 ml-2">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full " />
                </div>
              </div>
            </div>
            <div className="col-span-2 col-start-2">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
            </div>
            <div><Skeleton className="h-4 w-full " /> </div>
            <div><Skeleton className="h-4 w-full " /> </div>
            <div><Skeleton className="h-4 w-full " /> </div>
            <div><Skeleton className="h-4 w-full " /> </div>
            <div><Skeleton className="h-4 w-full " /> </div>
          </div>
        ) }
    </div>
  )
}
