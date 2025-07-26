import React, {useMemo, useRef, useState} from 'react';
import {Animated, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {DownIcon} from '~/assets/icons/Icons';
import {Colors, Shadows} from '~/theme/theme';
import {scale} from '~/utils/scaling';
import Images from '~/assets/images/Images';
import styles from './PriceComparison.styles';
import SearchAndFilterBar from '~/components/SearchAndFilterBar/SearchAndFilterBar';
import CustomTable from '~/components/CustomTable/CustomTable';
import ChatBot from '~/components/ChatBot/ChatBot';
import Button from '~/components/ui/Button/ButtonComponent';
import {getAnalysisAi} from '~/api/trendApi';
import {useHarvestFilter} from '~/hook/useHarvestFilter';
import {useSearchAndFilter} from '~/hook/useSearch';
import {exportToExcel} from '~/utils/excelExporter';
import {useQuery} from '@tanstack/react-query';

const FilterDropdown = ({options, selected, onSelect}) => (
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
      ...Shadows.dropdown,
    }}>
    <ScrollView
      style={{maxHeight: scale(200)}}
      showsVerticalScrollIndicator={false}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={{
            paddingVertical: scale(8),
            borderBottomWidth: index < options.length - 1 ? 0.5 : 0,
            borderBottomColor: '#eee',
          }}
          onPress={() => onSelect(option)}>
          <Text
            style={{
              fontSize: scale(13),
              color: selected === option ? Colors.greenText : '#333',
              fontWeight: selected === option ? 'bold' : 'normal',
            }}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </Animated.View>
);

const columns = [
  {title: 'Khu vực', key: 'provinceName', flex: 1},
  {title: 'Giá tại chợ', key: 'marketPrice', flex: 1},
  {title: 'Giá tại Vườn', key: 'farmPrice', flex: 1},
];

const PriceComparisonScreen = () => {
  const {
    isLoading,
    fruitCategory,
    provinceOptions,
    selectedFilters,
    handleFilterSelect,
    collectionAndYieldData,
    productTypeOptions,
    selectedTypeFilter,
    setSelectedTypeFilter,
  } = useHarvestFilter();

  const {filteredData, searchKeyword, setSearchKeyword} = useSearchAndFilter({
    data: collectionAndYieldData,
    searchableFields: ['provinceName'],
  });

  const [isExporting, setIsExporting] = useState(false);
  const [activeFilter, setActiveFilter] = useState({
    index: null,
    anim: new Animated.Value(0),
  });
  const filterRotate = useRef(new Animated.Value(0)).current;

  const fruitCategorySafe =
    fruitCategory.length > 0 ? fruitCategory : ['Tất cả'];

  const {data: analysisData} = useQuery({
    queryKey: ['analysisAi'],
    queryFn: getAnalysisAi,
    select: res => res.data,
    staleTime: 10 * 60 * 1000,
  });

  const filterOptions = useMemo(
    () => [
      {label: 'Ngày BĐ', options: []},
      {label: 'Ngày KT', options: []},
      {label: 'Tỉnh', options: provinceOptions},
    ],
    [provinceOptions],
  );

  const toggleFilter = index => {
    if (activeFilter.index === index) {
      Animated.parallel([
        Animated.timing(activeFilter.anim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
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
          useNativeDriver: true,
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
    toggleFilter(null);
  };

  const getDateRangeText = useMemo(() => {
    const start = selectedFilters['Ngày BĐ'];
    const end = selectedFilters['Ngày KT'];
    if (!start && !end) return 'Chọn khoảng thời gian';
    if (!start) return `-- đến ${end}`;
    if (!end) return `${start} đến --`;
    return `${start} - ${end}`;
  }, [selectedFilters]);

  const handleExport = async () => {
    setIsExporting(true);
    await exportToExcel(filteredData, 'price_comparison');
    setIsExporting(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          placeholder="Tìm kiếm trái cây"
          searchText={searchKeyword}
          setSearchText={setSearchKeyword}
          selectedFilters={selectedFilters}
          onFilterSelect={handleFilterSelect}
          filterOptions={filterOptions}
          itemOptions={fruitCategorySafe}
          showProductButton
          isLoading={isLoading}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyWrapper}>
          <View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>Kết quả: {filteredData.length}</Text>

              <View style={styles.buttonContainer}>
                <Text style={styles.selecteButton}>{getDateRangeText}</Text>

                <View style={{flex: 1}}>
                  <Button.Select
                    title={selectedTypeFilter}
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
                    <FilterDropdown
                      options={productTypeOptions}
                      selected={selectedTypeFilter}
                      onSelect={handleTypeSelection}
                    />
                  )}
                </View>
              </View>

              <CustomTable
                data={filteredData || []}
                columns={columns}
                scrollable
                isLoading={isLoading}
                bodyHeight={scale(200)}
                headerRowStyle={{width: '100%'}}
                rowStyle={{width: '100%'}}
                containerStyle={{marginBottom: scale(20)}}
              />
            </View>

            <Button.Main
              title={isExporting ? 'Đang xuất...' : 'Xuất Excel'}
              disabled={isExporting}
              onPress={handleExport}
              style={styles.buttonExcel}
            />
          </View>

          {/* Phần phân tích xu hướng */}
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
                    numberOfLines={8}>
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
