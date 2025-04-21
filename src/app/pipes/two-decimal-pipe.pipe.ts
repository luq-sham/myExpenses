import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDecimal',
  standalone: true
})
export class TwoDecimalPipe implements PipeTransform {
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
    
    // Format the number to always have 2 decimal places
    return numValue.toFixed(2);
  }
}