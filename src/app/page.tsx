import DashboardLayout from "./components/layout/DashboardLayout";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/SideBar";
import PlannerSection from "./components/planner/PlannerSection";

export default function Home() {
  return (
    <DashboardLayout sidebar={<Sidebar />} header={<Header />}>
      <PlannerSection />
    </DashboardLayout>
  );
}
