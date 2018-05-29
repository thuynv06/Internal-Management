// Convert về dạng đích
 export default function convertData(json, ArrayHeader, ArrayColumn) {
    const tableData = {
      headerCol : [...ArrayHeader],
      columns:Object.keys(json[0]).filter(function (item){return !ArrayColumn.includes(item)}),
    // columns:Object.keys(json[0]),
      rows:Object.values(json)
    }
    console.log(tableData.columns);
    console.log(tableData.rows)
    return tableData;


  }