// const mockData = {
//   years: [2020, 2021, 2022, 2023],
//   summary: {
//     totalVehicles: 2300000,
//     yoyGrowth: 12.5,
//     qoqGrowth: 3.2,
//     topManufacturer: "Maruti Suzuki",
//   },
//   yoyData: [
//     { year: 2020, growth: 5.2 },
//     { year: 2021, growth: 8.1 },
//     { year: 2022, growth: 12.5 },
//     { year: 2023, growth: 14.2 },
//   ],
//   qoqData: [
//     { label: "2023-Q1", quarter: "Q1", year: 2023, vehicles: 520000, growth: 2.1 },
//     { label: "2023-Q2", quarter: "Q2", year: 2023, vehicles: 540000, growth: 3.8 },
//     { label: "2023-Q3", quarter: "Q3", year: 2023, vehicles: 590000, growth: 4.5 },
//     { label: "2023-Q4", quarter: "Q4", year: 2023, vehicles: 670000, growth: 6.2 },
//   ],
//   manufacturers: [
//     { name: "Maruti Suzuki", value: 35 },
//     { name: "Tata", value: 20 },
//     { name: "Hyundai", value: 12 },
//     { name: "Hero", value: 10 },
//     { name: "Mahindra", value: 8 },
//   ],
//   quarters: ["2022-Q4","2023-Q1","2023-Q2","2023-Q3","2023-Q4"],
//   manufacturerQuarterMatrix: [
//     { manufacturer: "Maruti Suzuki", values: [4,3,5,6,7] },
//     { manufacturer: "Tata", values: [3,2,4,5,4] },
//     { manufacturer: "Hyundai", values: [2,1,3,2,4] },
//   ],
// };

// async function fetchDashboard() {
//   try {
//     const res = await fetch("http://localhost:5000/api/dashboard");
//     if (!res.ok) throw new Error("no backend");
//     const json = await res.json();
//     return json;
//   } catch (err) {
//     console.warn("Backend not available, using mock data", err);
//     // Simulate a small delay
//     await new Promise(r => setTimeout(r, 300));
//     return mockData;
//   }
// }

// export default { fetchDashboard };
async function fetchDashboard() {
 const res = await fetch("http://localhost:5000/api/dashboard", {
  method: "GET",
  credentials: "include", 
});
  if (!res.ok) {
    throw new Error('Failed to fetch');
    console.error('Failed to fetch');
  }
 

  const json = await res.json();
  return json;
  
}
export default { fetchDashboard };