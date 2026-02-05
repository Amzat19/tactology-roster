import DashboardLayout from "./components/layout/DashboardLayout";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/SideBar";

export default function Home() {
  return (
    <DashboardLayout sidebar={<Sidebar />} header={<Header />}>
      <p>Welcome!</p>
    </DashboardLayout>
  );
}
