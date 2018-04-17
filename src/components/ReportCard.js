import React, { Component } from 'react';
import { Text, processColor } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';

import BarChart from './BarChart';
import { isWithinAWeek, toTitleCase } from "../utils/utils";
import { calcNutritionForAWeek } from '../utils/utils';
const DURATION_AMOUNT = 7;

export default (props) => {

    // const ingredients = {Calories: 80, Fat: 60, Sodium: 77, Carbs: 80, Sugars: 90, Protein:66}
    const { nutritionHistory } = props;
    const ingredients = calcNutritionForAWeek(nutritionHistory);

    return (
        <Card>
            <BarChart 
                ingredients = {ingredients}
                duration = {DURATION_AMOUNT}
            />
            <Text style={{marginTop: 10}}>* percentage weekly recommended value</Text>
        </Card>
    )
}