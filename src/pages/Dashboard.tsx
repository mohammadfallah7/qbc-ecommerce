import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const data = [
    { name: "1", sales: 0 },
    { name: "2", sales: 0 },
    { name: "3", sales: 2 },
    { name: "4", sales: 3 },
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-1  p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className=" p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm">سفارشات</p>
              <h3 className="text-2xl font-bold">100</h3>
            </div>
            <div className=" unded-full w-8 h-8 flex items-center justify-center">
              $
            </div>
          </div>

          <div className=" p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm">مشتری ها</p>
              <h3 className="text-2xl font-bold">10</h3>
            </div>
            <div className="  rounded-full w-8 h-8 flex items-center justify-center">
              $
            </div>
          </div>

          <div className=" p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sm">فروش کل</p>
              <h3 className="text-2xl font-bold">0 تومان</h3>
            </div>
            <div className=" ounded-full w-8 h-8 flex items-center justify-center">
              $
            </div>
          </div>
        </div>

        <div className=" p-8 rounded-lg shadow-lg">
          <h3 className="mb-4 font-bold">نمودار فروش</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis ticks={[0, 1, 2, 3, 4, 5]} />
              <Tooltip />
              <Bar dataKey="sales" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
