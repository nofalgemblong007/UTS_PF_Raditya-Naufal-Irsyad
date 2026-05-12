/**
 * Professional CSV Export Utility
 * Converts an array of objects into a downloadable .csv file
 */
export const exportToCSV = (data, fileName) => {
  if (!data || !data.length) {
    alert("No data available to export");
    return;
  }

  const headers = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map(obj => 
    Object.values(obj).map(val => `"${val}"`).join(",")
  ).join("\n");

  const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
