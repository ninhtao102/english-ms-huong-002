import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dotPatternReplace'
})
export class DotPatternReplacePipe implements PipeTransform {

    transform(value: string): string {
        if (!value) return '';

        let processedText = value;

        // Case 1: Replace "……" (three or more dots) with HR element
        processedText = processedText.replace(/\.{3,}/g, '<hr class="w-16 border-b border-dashed mt-5 mb-0">');

        // Case 2: Replace "___" (three or more underscores) with HR element
        processedText = processedText.replace(/_{3,}/g, '<hr class="w-16 border-b border-dashed mt-5 mb-0">');

        // Case 3: Replace newline characters with <br> tags
        processedText = processedText.replace(/\n/g, '<br>');

        // Case 4: Removes exactly " ." at the end
        processedText = processedText.replace(/\s\.$/, '');

        return processedText;
    }

}
