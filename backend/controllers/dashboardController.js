const Vehicle = require("../models/Vehicle");

async function getDashboard(req, res) {
  try {
   
    const {
      startYear = 2000,
      endYear = new Date().getFullYear(),
      manufacturer = "All",
      vehicleType = "All",
      quarter = "All",
    } = req.query;

  
    const filter = {
      year: { $gte: Number(startYear), $lte: Number(endYear) },
    };
    if (manufacturer !== "All") filter.manufacturer = manufacturer;
    if (vehicleType !== "All") filter.vehicleType = vehicleType;
    if (quarter !== "All") filter.quarter = quarter;
    




    
    const groupedData = await Vehicle.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: "$year",
            quarter: "$quarter",
            manufacturer: "$manufacturer",
            vehicleType: "$vehicleType",
          },
          vehicles: { $sum: "$vehicles" },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          quarter: "$_id.quarter",
          manufacturer: "$_id.manufacturer",
          vehicleType: "$_id.vehicleType",
          vehicles: 1,
        },
      },
      { $sort: { year: 1, quarter: 1, manufacturer: 1, vehicleType: 1 } },
    ]);

    
    const qoqData = groupedData.map((d) => ({
      ...d,
      label: `${d.year} ${d.quarter}`,
    }));

   
    const yearsSet = new Set(qoqData.map((d) => d.year));
    const years = Array.from(yearsSet).sort((a, b) => a - b);

    const quartersSet = new Set(qoqData.map((d) => `${d.year} ${d.quarter}`));

    const quarters = Array.from(quartersSet).sort();

    //  total vehicles per year (for YoY)
    const vehiclesByYearMap = {};
    qoqData.forEach((d) => {
      vehiclesByYearMap[d.year] = (vehiclesByYearMap[d.year] || 0) + d.vehicles;
    });

    const yoyData = years.map((y) => {
      const current = vehiclesByYearMap[y] || 0;
      const prev = vehiclesByYearMap[y - 1] || null;
      const growth = prev ? ((current - prev) / prev) * 100 : 0;
      return { year: y, growth: Number(growth.toFixed(2)) };
    });

    // vehicles per quarter (for QoQ)
    
    const quarterOrder = { Q1: 1, Q2: 2, Q3: 3, Q4: 4 };
    const sortedQoq = [...qoqData].sort(
      (a, b) =>
        a.year - b.year || quarterOrder[a.quarter] - quarterOrder[b.quarter]
    );

    //  QoQ growth per quarter
    let prevVehicles = null;
    const qoqDataWithGrowth = sortedQoq.map((d) => {
      const growth =
        prevVehicles !== null
          ? ((d.vehicles - prevVehicles) / (prevVehicles || 1)) * 100
          : 0;
      prevVehicles = d.vehicles;
      return { ...d, growth: Number(growth.toFixed(2)) };
    });

    //  Market share by manufacturer (total vehicles per manufacturer)
    const vehiclesByManufacturer = {};
    qoqData.forEach((d) => {
      vehiclesByManufacturer[d.manufacturer] =
        (vehiclesByManufacturer[d.manufacturer] || 0) + d.vehicles;
    });

    const totalVehiclesAll = Object.values(vehiclesByManufacturer).reduce(
      (a, b) => a + b,
      0
    );

    const manufacturers = Object.entries(vehiclesByManufacturer)
      .map(([name, val]) => ({
        name,
        value: Number(((val / totalVehiclesAll) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.value - a.value);

    // 5. summary data
    const totalVehicles = totalVehiclesAll;
    const latestYoyGrowth = yoyData.length
      ? yoyData[yoyData.length - 1].growth
      : 0;
    const latestQoqGrowth = qoqDataWithGrowth.length
      ? qoqDataWithGrowth[qoqDataWithGrowth.length - 1].growth
      : 0;
    const topManufacturer = manufacturers.length ? manufacturers[0].name : "—";

    const summary = {
      totalVehicles,
      yoyGrowth: Number(latestYoyGrowth.toFixed(2)),
      qoqGrowth: Number(latestQoqGrowth.toFixed(2)),
      topManufacturer,
    };

    //  Manufacturer-Quarter growth matrix (heatmap)
   
    const manufacturersSet = new Set(qoqData.map((d) => d.manufacturer));
    const manufacturerList = Array.from(manufacturersSet).sort();

   
    const mqGrowthMap = {};
    qoqDataWithGrowth.forEach(({ manufacturer, label, growth }) => {
      if (!mqGrowthMap[manufacturer]) mqGrowthMap[manufacturer] = {};
      mqGrowthMap[manufacturer][label] = growth;
    });

    // matrix array
    const manufacturerQuarterMatrix = manufacturerList.map((m) => {
      const values = quarters.map((q) => {
  
        return Number((mqGrowthMap[m]?.[q] ?? 0).toFixed(2));
      });
      return { manufacturer: m, values };
    });

    const response = {
      years,
      summary,
      yoyData,
      qoqData: qoqDataWithGrowth,
      manufacturers,
      quarters,
      manufacturerQuarterMatrix,
    };

    res.json(response);
  } catch (err) {
    console.error("Dashboard controller error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
}

module.exports = { getDashboard };
