// import * as ExportJsonExcel from 'js-export-excel'
/**
 *
 *
 * @export
 * @param {string} [fileName='excel']
 * @param {string} [dataSource=[
 *     {
 *       // 第一个sheet（第一个excel表格）
 *       sheetData: [], // 数据
 *       sheetName: 'sheet',
 *       sheetFilter: [], // 表头数据对应的sheetData数据
 *       sheetHeader: [], // 表头数据
 *       columnWidths: ['8', '4'], // 列宽
 *     },
 *   ]]
 */
export function exportExcel(
  fileName = 'excel',
  dataSource = [
    {
      // 第一个sheet（第一个excel表格）
      sheetData: [], // 数据
      sheetName: 'sheet',
      sheetFilter: [], // 表头数据对应的sheetData数据
      sheetHeader: [], // 表头数据
      columnWidths: ['8', '4'], // 列宽
    },
  ]
) {
  const option = {}

  option.fileName = fileName // 文件名
  option.datas = dataSource
  // const toExcel = new ExportJsonExcel(option)
  // toExcel.saveExcel()
}
