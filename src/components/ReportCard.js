import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

import BarChart from './BarChart';

export default () => {
    const ingredients = {Calories: 80, Fat: 60, Sodium: 77, Carbs: 80, Sugars: 90, Protein:66}
    
    return (
        <Card>
            <BarChart 
                ingredients = {ingredients}
            />
            <Text style={{marginTop: 10}}>* percentage weekly recommended value</Text>
        </Card>
    )
}