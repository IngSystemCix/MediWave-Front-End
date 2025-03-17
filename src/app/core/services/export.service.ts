import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportService<
  T extends Record<string, unknown> = Record<string, unknown>
> {
  exportData(
    data: T[],
    columns: { field: string; header: string }[],
    format: string
  ) {
    switch (format) {
      case 'pdf':
        this.exportPDF(data, columns);
        break;
      case 'excel':
        this.exportExcel(data, columns);
        break;
      default:
        console.error('Invalid format');
        break;
    }
  }

  private exportPDF(data: T[], columns: { field: string; header: string }[]) {
    pdfMake.vfs = pdfFonts.vfs;
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: columns.map(() => '*'), // Ajusta las columnas para ocupar todo el ancho
            body: [
              columns.map((column) => ({
                text: column.header,
                bold: true,
                fillColor: '#ecfeff',
                color: '#00b8db',
              })), // Corrige la cabecera
              ...data.map((item) =>
                columns.map((column) => ({
                  text: item[column.field] as string,
                }))
              ),
            ],
          },
          layout: 'lightHorizontalLines', // Añade líneas horizontales ligeras
        },
      ],
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60], // Márgenes de la página
    };
    pdfMake.createPdf(docDefinition).open();
  }

  private async exportExcel(
    data: T[],
    columns: { field: string; header: string }[]
  ) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte');

    // Agregar la cabecera con estilos
    const headerRow = worksheet.addRow(columns.map((col) => col.header));
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ECFEFF' },
      }; // Fondo celeste claro
      cell.font = { color: { argb: '00B8DB' }, bold: true }; // Texto azul brillante y negrita
      cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Centrado
    });

    // Agregar los datos
    for (const row of data) {
      worksheet.addRow(columns.map((col) => row[col.field] || ''));
    }

    // Ajustar el ancho de las columnas automáticamente
    worksheet.columns = columns.map((col) => ({
      header: col.header,
      key: col.field,
      width: 20,
    }));

    // Crear tabla dinámica
    const table = worksheet.addTable({
      name: 'DataTable',
      ref: 'A1',
      headerRow: true,
      totalsRow: false,
      style: {
      theme: 'TableStyleMedium2',
      showRowStripes: true,
      },
      columns: columns.map((col) => ({ name: col.header, filterButton: true })),
      rows: data.map((row) => columns.map((col) => row[col.field] || '')),
    });

    // Aplicar el color de fondo a las bandas
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber % 2 === 0) {
      row.eachCell((cell) => {
        cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ECFEFF' },
        };
      });
      }
    });

    // Guardar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const dataExcel = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(dataExcel, 'reporte.xlsx');
  }
}
