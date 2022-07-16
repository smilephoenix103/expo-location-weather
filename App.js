// import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(5); //down timer start from 5
  const [data, setData] = useState({}); // state data from weatherapi.com
  const [loading, setLoading] = useState(false) // is loading or not

  //count down timer start from 5
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds('');
    }
  });


  // fetch data from weatherapi.com
  // to store state data
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('http://api.weatherapi.com/v1/current.json?key= b1199e3b8c6e4fbd8f5152109221207&q=Lublin&aqi=no', {
          method: 'POST',
          body: {},
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        });

        const data = await response.json();
        setData(data);

      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.Headding}>{seconds}</Text>
      {seconds === '' ?
        <View>
          <Text style={styles.Headding}>Location</Text>
          <View style={styles.row}>
            <Text style={styles.text}>{data.location.name}</Text>
            <Text style={styles.text}>{data.location.country}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>lat:</Text>
            <Text style={styles.text}>{data.location.lat}</Text>
            <Text style={styles.label}>lon:</Text>
            <Text style={styles.text}>{data.location.lon}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>TimeZone</Text>
            <Text style={styles.text}>{data.location.tz_id}</Text>
          </View>

          <Text style={styles.Headding}>Weather</Text>
          <View style={styles.row}>
            <Text style={styles.text}>{data.current.condition.text}</Text>
            <Image
              style={styles.someImage}
              source={{
                uri: `https:${data.current.condition.icon}`,
              }}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Temp</Text>
            <Text style={styles.text}>{data.current.temp_c}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wind MPH</Text>
            <Text style={styles.text}>{data.current.wind_mph}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wind Direction</Text>
            <Text style={styles.text}>{data.current.wind_dir}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Humidity</Text>
            <Text style={styles.text}>{data.current.humidity}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Colud</Text>
            <Text style={styles.text}>{data.current.cloud}</Text>
          </View>
        </View>

        : null
      }

    </View>
  );
}
export function Weather(data) {
  return (
    Object.entries(data.location).map((item) => {
      return (
        <Text>{item}</Text>
      )
    })
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Headding: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10
  }
  ,
  someImage: {
    width: 100,
    height: 100,
  },
});
