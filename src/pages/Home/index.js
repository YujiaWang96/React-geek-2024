import BarCharts from "./components/BarCharts";

const Home = () => {
  return (
    <div>
      <BarCharts title={"三大框架满意度"} data={["Vue", "React", "Angular"]} />
      <BarCharts title={"三大框架实用度"} data={["vue", "react", "angular"]} />
    </div>
  );
};
export default Home;
