import * as XLSX from 'xlsx';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcelParserService {
  parseExcelToCsv(buffer: Buffer): string {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

    const rows: string[] = [];

    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      const row: string[] = [];

      for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
        const cell = worksheet[cellAddress];

        let cellValue = '';

        if (cell && cell.v !== undefined && cell.v !== null) {
          let rawValue = cell.v;

          if (typeof rawValue === 'string') {
            rawValue = rawValue.trim();

            const needsQuoting =
              rawValue.includes(',') ||
              rawValue.includes('"') ||
              rawValue.includes('\n') ||
              rawValue.includes('\r');

            if (needsQuoting) {
              cellValue = `"${rawValue.replace(/"/g, '""')}"`;
            } else {
              cellValue = rawValue;
            }
          } else {
            cellValue = String(rawValue);
          }
        }

        row.push(cellValue);
      }

      rows.push(row.join(','));
    }

    return rows.join('\n');
  }

  parseCsvToExcel(csv: string, sheetName?: string): Buffer {
    const lines = csv.split('\n');
    const data: any[][] = [];

    for (const line of lines) {
      if (line.trim() === '') continue;

      const row = this.parseCsvLine(line);
      data.push(row);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName ?? 'Sheet1');
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 2;
        } else {
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }

    result.push(current);

    return result;
  }
}
