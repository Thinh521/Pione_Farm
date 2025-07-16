import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {DownIcon} from '~/assets/icons/Icons';
import {Colors} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import Images from '~/assets/images/Images';
import styles from './PriceComparison.styles';

import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import CustomTable from '~/components/CustomTable/CustomTable';
import ChatBot from '~/components/ChatBot/ChatBot';
import Button from '~/components/ui/Button/ButtonComponent';
import {getAnalysisAi} from '~/api/trendApi';
import {useHarvestFilter} from '~/hook/useHarvestFilter';

const columns = [
  {title: 'Khu vực', key: 'provinceName', flex: 1},
  {title: 'Giá tại chợ', key: 'marketPrice', flex: 1},
  {title: 'Giá tại Vườn', key: 'farmPrice', flex: 1},
];

const PriceComparisonScreen = () => {
  const {
    fruitCategory,
    provinceOptions,
    searchText,
    setSearchText,
    selectedTypeFilter,
    selectedFilters,
    handleFilterSelect,
    collectionAndYieldData,
    setSelectedTypeFilter,
    isLoading,
    productTypeOptions,
    exportDataToExcel,
  } = useHarvestFilter();

  const [isExporting, setIsExporting] = useState(false);
  const [analysisData, setAnalysisData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeFilter, setActiveFilter] = useState({
    index: null,
    anim: new Animated.Value(0),
  });
  const filterRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchAnalysisAi = async () => {
      try {
        const result = await getAnalysisAi();
        setAnalysisData(result.data || []);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };

    fetchAnalysisAi();
  }, []);

  const getFilterOptions = () => [
    {label: 'Ngày BĐ', options: []},
    {label: 'Ngày KT', options: []},
    {label: 'Tỉnh', options: provinceOptions},
  ];

  const toggleFilter = index => {
    if (activeFilter.index === index) {
      Animated.parallel([
        Animated.timing(activeFilter.anim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(filterRotate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setActiveFilter({index: null, anim: new Animated.Value(0)});
      });
    } else {
      const newAnim = new Animated.Value(0);
      setActiveFilter({index, anim: newAnim});
      Animated.parallel([
        Animated.timing(newAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(filterRotate, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleTypeSelection = type => {
    setSelectedTypeFilter(type);
    toggleFilter(-1);
  };

  const getDateRangeText = () => {
    const start = selectedFilters['Ngày BĐ'];
    const end = selectedFilters['Ngày KT'];
    if (!start && !end) return 'Chọn khoảng thời gian';
    if (!start) return `-- đến ${end}`;
    if (!end) return `${start} đến --`;
    return `${start} - ${end}`;
  };

  const capitalize = str =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{color: 'red'}}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          placeholder="Tìm kiếm trái cây"
          searchText={searchText}
          setSearchText={setSearchText}
          selectedFilters={selectedFilters}
          onFilterSelect={handleFilterSelect}
          itemOptions={fruitCategory}
          filterOptions={getFilterOptions()}
          showProductButton
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyWrapper}>
          <View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>
                Kết quả: {collectionAndYieldData.length}
              </Text>

              <View style={styles.buttonContainer}>
                <Button.Select title={getDateRangeText()} style={{flex: 2}} />

                <View style={{flex: 1}}>
                  <Button.Select
                    title={capitalize(selectedTypeFilter)}
                    style={{flex: 1}}
                    iconRight={
                      <Animated.View
                        style={{
                          transform: [
                            {
                              rotate: filterRotate.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '180deg'],
                              }),
                            },
                          ],
                        }}>
                        <DownIcon
                          style={{color: Colors.black, width: scale(20)}}
                        />
                      </Animated.View>
                    }
                    onPress={() => toggleFilter(-1)}
                  />

                  {activeFilter.index === -1 && (
                    <Animated.View
                      style={{
                        position: 'absolute',
                        top: scale(45),
                        zIndex: 1000,
                        width: '100%',
                        backgroundColor: Colors.white,
                        borderRadius: scale(6),
                        paddingVertical: scale(6),
                        paddingHorizontal: scale(12),
                        elevation: Platform.OS === 'android' ? 5 : undefined,
                        shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
                        shadowOffset:
                          Platform.OS === 'ios'
                            ? {width: 0, height: 2}
                            : undefined,
                        shadowOpacity: Platform.OS === 'ios' ? 0.15 : undefined,
                        shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
                        opacity: activeFilter.anim,
                        transform: [
                          {
                            translateY: activeFilter.anim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-10, 0],
                            }),
                          },
                        ],
                      }}>
                      <ScrollView
                        style={{maxHeight: scale(200)}}
                        showsVerticalScrollIndicator={false}>
                        {productTypeOptions.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{
                              paddingVertical: scale(8),
                              borderBottomWidth:
                                index < productTypeOptions.length - 1 ? 0.5 : 0,
                              borderBottomColor: '#eee',
                            }}
                            onPress={() => handleTypeSelection(option)}>
                            <Text
                              style={{
                                fontSize: scale(13),
                                color:
                                  selectedTypeFilter === option
                                    ? Colors.greenText
                                    : '#333',
                                fontWeight:
                                  selectedTypeFilter === option
                                    ? 'bold'
                                    : 'normal',
                              }}>
                              {capitalize(option)}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </Animated.View>
                  )}
                </View>
              </View>

              {collectionAndYieldData.length > 0 ? (
                <CustomTable
                  data={collectionAndYieldData}
                  columns={columns}
                  scrollable
                  bodyHeight={scale(200)}
                  headerRowStyle={{width: '100%'}}
                  rowStyle={{width: '100%'}}
                  containerStyle={{marginBottom: scale(20)}}
                />
              ) : (
                <Text style={styles.noResultText}>
                  Không tìm thấy kết quả phù hợp.
                </Text>
              )}
            </View>

            <Button.Main
              title={isExporting ? 'Đang xuất...' : 'Xuất Excel'}
              disabled={isExporting}
              onPress={async () => {
                setIsExporting(true);
                await exportDataToExcel(collectionAndYieldData);
                setIsExporting(false);
              }}
              style={styles.buttonExcel}
            />
          </View>

          <View style={styles.footer}>
            <FastImage
              source={Images.PriceComparison_1}
              style={styles.backgroundPriceComparison_1}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              source={Images.PriceComparison_3}
              style={styles.backgroundPriceComparison_3}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              source={Images.PriceComparison_4}
              style={styles.backgroundPriceComparison_4}
              resizeMode={FastImage.resizeMode.contain}
            />

            <View style={styles.trendWrapper}>
              <FastImage
                source={Images.PriceComparison_2}
                style={styles.backgroundPriceComparison_2}
                resizeMode={FastImage.resizeMode.contain}>
                <View style={styles.footerContent}>
                  <Text style={styles.footerContentTitle}>Xu hướng</Text>
                  <Text style={styles.footerContentTitle_2}>
                    {analysisData?.inputSummary}
                  </Text>
                  <Text
                    style={styles.footerContentDescription}
                    numberOfLines={7}>
                    {analysisData?.responses}
                  </Text>
                </View>
              </FastImage>
            </View>

            <FastImage
              source={Images.PriceComparison_5}
              style={styles.backgroundPriceComparison_5}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
      </ScrollView>

      <ChatBot />
    </View>
  );
};

export default PriceComparisonScreen;
