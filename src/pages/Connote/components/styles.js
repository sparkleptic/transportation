import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  paper: {
    flex: 1,
    padding: 40,
    marginLeft: 8,
    marginRight: 8,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  paperInformation: {
    flex: 2,
  },
  label: {
    flex: 1,
    marginTop: 13,
    marginBottom: 13,
  },
  labelAfterTitle: {
    alignItems: 'flex-end',
  },
  labelPrice: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  labelTitle: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  priceCount: {
    fontWeight: 'bold',
    flex: 1,
  },
});
