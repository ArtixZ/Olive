class User {
    constructor() {
        this.nutritionRecords = {}
    }
    setNutritionRecords (nutritionRecords) {
        this.nutritionRecords = nutritionRecords;
    }
    getNutritionRecords () {
        return this.nutritionRecords;
    }
}

export default new User()