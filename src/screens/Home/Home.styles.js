import {StyleSheet} from 'react-native';
import {scale} from '~/utils/scaling';
import {FontSizes, FontWeights, Colors} from '~/theme/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  header: {
    marginTop: scale(20),
    borderBottomWidth: 1,
    borderColor: Colors.border_2,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: scale(20),
    paddingBottom: scale(90),
  },
  title: {
    color: Colors.title,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
  },
  box: {
    marginBottom: scale(16),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
