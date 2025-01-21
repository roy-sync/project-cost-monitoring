import { useRouter } from "next/navigation";

type ListProps = {
  content: string;
  isLastList?: boolean;
  // isDelayed: boolean;
  id: number;
};
export const List = ({ content, isLastList, id }: ListProps) => {
  const router = useRouter();
  const listClass = !isLastList
    ? "hover:bg-gray-200 hover:cursor-pointer border-b border-gray-300"
    : "hover:bg-gray-200 hover:cursor-pointer ";
  return (
    <div className={listClass} onClick={() => router.push(`/projects/${id}`)}>
      <span className='flex items-center p-5 text-sm text-neutral-950'>
        <span className='mr-3 h-2 w-2 rounded-full bg-orange-500'></span>
        <span className='text-md w-75 text-neutral-950'>{content}</span>
        {/* {isDelayed ? (
          <div className='ml-auto flex items-center'>
            <p className='text-sm text-red-600'>-52.52%</p>
          </div>
        ) : null} */}
      </span>
    </div>
  );
};
