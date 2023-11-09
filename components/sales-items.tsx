import { formatter } from '@/lib/utils';

interface SalesItemProps {
  data: any;
}

const SalesItem: React.FC<SalesItemProps> = ({ data }) => {
  return (
    <div className="pl-4 flex items-center ">
      <div
        className="w-9 h-9 bg-green-400 rounded-full flex justify-center items-center my-5"
        style={{ lineHeight: '1.25rem' }}
      >
        {data.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col mx-4">
        <p className="text-sm">{data.name}</p>
        <p className="text-sm">{data.email}</p>
      </div>
      <div className="ml-auto font-bold">+{formatter.format(data.amount)}</div>
    </div>
  );
};

export default SalesItem;
