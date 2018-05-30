// Convert về dạng đích
 export default function convertData(data, ArrayHeader, ArrayColumn) {
    const tableData = {
      headerCol : [...ArrayHeader],
      columns:Object.keys(data[0]).filter(function (item){return !ArrayColumn.includes(item)}),
      rows:Object.values(data)
    }
    return tableData;
  }