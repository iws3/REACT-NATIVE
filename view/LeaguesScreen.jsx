import React from 'react'
import { Text, View } from 'react-native'

const LeagueScreen=({navigation, route}) => {
  // start working here
  const leagueInfo=route.params
  // we are going to receive data for that click clcked

  return (
    <View>

      <Text>club Screen</Text>
      <Text>Hello Club</Text>
    </View>
  )
}

export default LeagueScreen
