"use client";
type ListProps = {
  content: string;
  isLastList?: boolean;
  total?: number;
  hasBullet?: boolean;
  bulletColor?: string;
};
export const ListItem = ({
  content,
  isLastList,
  total,
  hasBullet,
  bulletColor,
}: ListProps) => {
  const listClass = !isLastList ? "border-b border-gray-300" : "";
  const bulletClass = `mr-3 h-2 w-2 rounded-full bg-${bulletColor}-500`;
  return (
    <div className={listClass}>
      <span className='flex items-center p-5 text-sm text-neutral-950'>
        {hasBullet ? <span className={bulletClass}></span> : null}
        <span className='text-md text-neutral-500'>{content}</span>

        <div className='ml-auto flex items-center'>
          {/* TODO: make this text color be dynamic */}
          <p className='text-sm font-semibold text-slate-600'>{total}</p>
        </div>
      </span>
    </div>
  );
};
