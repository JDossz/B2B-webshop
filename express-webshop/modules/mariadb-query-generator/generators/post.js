module.exports = class Adder {
    constructor() {
        this.generatedInsertInto = '';
        this.generatedValues = '';
    }

    /**
     * Post request Handler
     */

    generateInsertIntoString(insertInto) {
        insertInto = insertInto
            .split('?')
            .shift()
            .split('$');
        insertInto.forEach(element => {
            this.generatedInsertInto = this.generateInsertInto.concat(element.split('=')[0]);
            this.generatedInsertInto = this.generateInsertInto.concat(' = ');
            this.generatedInsertInto = this.generateInsertInto.concat(element.split('=')[1]);
            this.generatedInsertInto = this.generateInsertInto.concat(', ');
        })
        this.generatedInsertInto.replace(',', '');
        return this.generatedInsertInto;
    }

    generateValuesString(values) {
        values = values
            .split('?')
            .shift()
            .split('$');
        values.forEach(element => {
            this.generatedValues = this.generatedValues.concat(element.split('=')[0]);
            this.generatedValues = this.generatedValues.concat(' = ');
            this.generatedValues = this.generatedValues.concat(element.split('=')[1]);
            this.generatedValues = this.generatedValues.concat(', ');
        })
        this.generatedValues.replace(',', '');
        return this.generatedValues;
    }
};