import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
// import { sha256 } from 'react-native-sha256'

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  scroll: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 25,
    paddingTop: 75
  },
  image: {
    alignSelf: 'flex-start',
    height: '20%',
    width: '50%',
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 36,
    color: '#323232',
    paddingBottom: 5
  },
  subtitle: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 16,
    color: '#323232',
    textDecorationColor: '#e0e0e0',
    textDecorationLine: 'underline',
    paddingBottom: 5,
    paddingTop: 5
  },
  content: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#323232',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16
  },
  buttonGroup: {
    flex: 1,
    paddingTop: 15,

  },
  button: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15
  },
  form: {
    flex: 1,
    paddingTop: 15
  },
  formInput: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 20,
    lineHeight: 30,
    minHeight: 30,
    marginBottom: 10,
    borderColor: '#e0e0e0',
    padding: 10,
    borderWidth: 1
  }
})

class Add extends Component {
  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)

    this.state = {
      name: '',
      expDate: null
    }
  }

  generateUniqueID (name, expDate) {
    const concat = name.concat(expDate)
    return concat
    /* console.log(concat)
    sha256(concat).then(hash => {
      return parseInt(hash)
    }) */
  }

  // POST to localhost:3000
  submit () {
    console.debug(JSON.stringify({
      id: this.generateUniqueID(this.state.name, this.state.expDate),
      name: this.state.name,
      'exp-date': this.state.expDate
    }))
    return fetch('http://localhost:3000/food', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.generateUniqueID(this.state.name, this.state.expDate),
        name: this.state.name,
        'exp-date': this.state.expDate
      })
    }).then((json) => {
      Alert.alert('Success!', 'Food item data saved correctly')
      this.setState({
        name: '',
        expDate: null
      })
      this.props.navigation.navigate('Fridge')
      // console.log(json)
    })
      .catch((error) => {
        Alert.alert('Error', 'There was a problem saving food item data')
        console.error(error)
      })
  }

  render () {
    return (
      <View style={styles.center}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.title}>Add food item 🍎</Text>
          <Text style={styles.subtitle}>Enter the details of your new grocery store find!</Text>
          <View style={styles.form}>
            <Text style={styles.content}>Item name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Apple"
              value={this.state.name}
              onChangeText={(text) => this.setState({ name: text })}
            />
            <Text style={styles.content}>Expiration date (yyyy-mm-dd)</Text>
            <TextInput
              style={styles.formInput}
              placeholder="2020-07-15"
              value={this.state.expDate}
              onChangeText={(text) => this.setState({ expDate: text })}
            />
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={() => this.submit()}>
              <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Add
