import React, { Component } from 'react';
import { Text, processColor } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';

import BarChart from './BarChart';
import { isWithinAWeek, toTitleCase } from "../utils/utils";
import { standardNutrition } from '../assets/config/_NutritionData';

const DURATION_AMOUNT = 7;

export default (props) => {

    // const ingredients = {Calories: 80, Fat: 60, Sodium: 77, Carbs: 80, Sugars: 90, Protein:66}
    const { nutritionHistory } = props;
    const daysWithinAWeek = Object.keys(nutritionHistory).reduce((pre, cur) => {
        if(isWithinAWeek((moment(cur)))) {
            return [...pre, cur];
        } else return pre;
    }, []);

    let ingredients = {};
    
    for(let i in standardNutrition) {
        ingredients[i.toLowerCase()] = 0;
    }

    for(let day of daysWithinAWeek) {
        const nutritionOfDay = nutritionHistory[day];
        const { portion, nutrition } = nutritionOfDay;
        for(let n in nutrition) {
            if(ingredients[n] >= 0) {
                ingredients[n] += nutrition[n] * portion;
            }
        }
    }

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