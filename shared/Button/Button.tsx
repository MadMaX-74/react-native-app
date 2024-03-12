import { Pressable, PressableProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, Fonts, Radius } from '../tokens'

const Button = ({text, ...props}: PressableProps & {text: string}) => {
  return (
    <Pressable {...props}>
        <View style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </View>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Radius.r10,
        height: 58,
        backgroundColor: Colors.primary
    },
    text: {
        color: Colors.white,
        fontSize: Fonts.fs18
    }
})