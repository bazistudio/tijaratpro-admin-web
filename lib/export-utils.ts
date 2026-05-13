import * as XLSX from 'xlsx'


/**
 * Universal Export Engine for TijaratPro
 */
export const exportToExcel = (data: any[], filename: string, sheetName: string = 'Sheet1') => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
    
    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
    
    // Trigger download
    const url = window.URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${filename}_${new Date().getTime()}.xlsx`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    return true
  } catch (error) {
    console.error('Export Failed:', error)
    return false
  }
}

export const exportToJSON = (data: any[], filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${filename}.json`)
  link.click()
}
