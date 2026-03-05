import Sidebar from "../components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { day: "Sat", value: 2 },
  { day: "Sun", value: 3 },
  { day: "Mon", value: 2 },
  { day: "Tue", value: 4 },
  { day: "Wed", value: 3 },
  { day: "Thu", value: 5 },
  { day: "Fri", value: 4 }
];

export default function Dashboard() {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8">

        {/* Greeting Banner */}

        <div className="bg-green-400 text-white p-6 rounded-xl flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-semibold">
              Hi Student!
            </h2>

            <p>
              Start your AI learning journey today.
            </p>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="w-20"
            alt="student"
          />

        </div>

        {/* STAT CARDS */}

        <div className="grid grid-cols-3 gap-6 mt-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-600">Learning Time</h3>
            <p className="text-2xl font-bold text-green-600">
              2h 35m
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-600">Tests Taken</h3>
            <p className="text-2xl font-bold text-blue-500">
              5
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-600">Courses</h3>
            <p className="text-2xl font-bold text-purple-500">
              3
            </p>
          </div>

        </div>

        {/* ACTIVITY GRAPH */}
        {/* MY COURSES */}

<div className="bg-white p-6 rounded-xl shadow mt-6">

<h3 className="text-lg font-semibold mb-4">
My Courses
</h3>

<div className="space-y-6">

{/* Course 1 */}

<div className="flex justify-between items-center">

<div>
<h4 className="font-semibold">
AI Fundamentals
</h4>

<div className="w-64 bg-gray-200 rounded-full h-2 mt-2">

<div className="bg-green-500 h-2 rounded-full w-[40%]"></div>

</div>

</div>

<div className="text-sm text-gray-600">
4.5 ⭐
</div>

<button className="bg-green-500 text-white px-4 py-2 rounded-lg">
View Course
</button>

</div>

{/* Course 2 */}

<div className="flex justify-between items-center">

<div>
<h4 className="font-semibold">
Machine Learning Basics
</h4>

<div className="w-64 bg-gray-200 rounded-full h-2 mt-2">

<div className="bg-blue-500 h-2 rounded-full w-[25%]"></div>

</div>

</div>

<div className="text-sm text-gray-600">
4.3 ⭐
</div>

<button className="bg-green-500 text-white px-4 py-2 rounded-lg">
View Course
</button>

</div>

{/* Course 3 */}

<div className="flex justify-between items-center">

<div>
<h4 className="font-semibold">
Deep Learning Introduction
</h4>

<div className="w-64 bg-gray-200 rounded-full h-2 mt-2">

<div className="bg-purple-500 h-2 rounded-full w-[60%]"></div>

</div>

</div>

<div className="text-sm text-gray-600">
4.6 ⭐
</div>

<button className="bg-green-500 text-white px-4 py-2 rounded-lg">
View Course
</button>

</div>

</div>

</div>

        <div className="bg-white p-6 rounded-xl shadow mt-6">

          <h3 className="mb-4 text-lg font-semibold">
            My Activity
          </h3>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="w-72 p-6 bg-white shadow">

        <h3 className="text-lg font-semibold mb-4">
          Upcoming Tasks
        </h3>

        <div className="space-y-4">

          <div className="bg-gray-100 p-3 rounded">
            Discussion Algorithm
          </div>

          <div className="bg-gray-100 p-3 rounded">
            Complete Practice Quiz
          </div>

          <div className="bg-gray-100 p-3 rounded">
            Review Weak Topics
          </div>

        </div>

      </div>

    </div>

  );

}