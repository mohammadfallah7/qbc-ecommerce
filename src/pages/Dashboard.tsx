import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useUsers from "../hooks/useUsers";
import useAdminOrders from "../hooks/useAdminOrders";
import useTotalSales from "../hooks/useTotalSales";
import useSalesByDate from "../hooks/useSalesByDate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { data: users } = useUsers();
  const { data: orders } = useAdminOrders();
  const { data: totalSales } = useTotalSales();
  const { data: salesByDate } = useSalesByDate();

  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "فروش",
        data: salesByDate?.map((order) => order.totalSales),
        backgroundColor: "#ec4899",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "نمودار فروش",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "تاریخ",
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "فروش",
        },
        ticks: {
          stepSize: 1,
        },
        suggestedMin: 0,
        suggestedMax: 5,
      },
    },
  };

  return (
    <div className="flex h-full">
      <div className="flex-1  p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className=" p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm">سفارشات</p>
              <h3 className="text-2xl font-bold">{orders?.length}</h3>
            </div>
            <div className="rounded-full w-8 h-8 flex items-center justify-center">
              $
            </div>
          </div>

          <div className=" p-4 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm">مشتری ها</p>
              <h3 className="text-2xl font-bold">
                {users?.filter((user) => !user.isAdmin).length}
              </h3>
            </div>
            <div className="  rounded-full w-8 h-8 flex items-center justify-center">
              $
            </div>
          </div>

          <div className=" p-4 rounded-lg shadow-lg flex items-center justify-between">
            <div>
              <p className="text-sm">فروش کل</p>
              <h3 className="text-2xl font-bold">
                {totalSales?.totalSales.toLocaleString()}
              </h3>
            </div>
            <div className="rounded-full w-8 h-8 flex items-center justify-center">
              $
            </div>
          </div>
        </div>

        <div className="p-8 rounded-lg shadow-lg">
          <h3 className="mb-4 font-bold">نمودار فروش</h3>
          <div style={{ width: "100%", height: "700px" }}>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
