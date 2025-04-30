import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat',
  standalone: true
})
export class MoneyFormatPipe implements PipeTransform {
  transform(value: any): string {
    // Return empty string if value is null or undefined
    if (value === null || value === undefined) {
      return '';
    }

    // Convert to number if it's not already a number
    const numValue = typeof value === 'number' ? value : Number(value);

    // Check if it's a valid number
    if (isNaN(numValue)) {
      return '';
    }

    // Format the number as money (with commas and 2 decimal places)
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numValue);
  }
}
