import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, Text, View} from 'react-native';
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
    selectedFilters,
    handleFilterSelect,
    collectionAndYieldData,
    isLoading,
    exportDataToExcel,
  } = useHarvestFilter();

  const [isExporting, setIsExporting] = useState(false);
  const [analysisData, setAnalysisData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const getFilterOptions = () => [
    {label: 'Ngày BĐ', options: []},
    {label: 'Ngày KT', options: []},
    {label: 'Tỉnh', options: provinceOptions},
    {label: 'Mặt hàng', options: fruitCategory},
  ];

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

  const parseDate = (date: string) => {
    if (!date) return null;
    const [day, month, year] = date.split('/');
    return new Date(+year, +month - 1, +day);
  };

  if (isLoading) return <ActivityIndicator size="large" color="#000" />;
  if (errorMsg) return <Text style={{color: 'red'}}>{errorMsg}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchAndFilterBar
          showProductButton
          searchText={searchText}
          setSearchText={setSearchText}
          selectedFilters={selectedFilters}
          onFilterSelect={handleFilterSelect}
          filterOptions={getFilterOptions()}
          placeholder="Tìm kiếm trái cây"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyWrapper}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Kết quả: {collectionAndYieldData.length}
            </Text>

            <View style={styles.buttonContainer}>
              <Button.Select
                title={`${selectedFilters['Ngày BĐ'] || '--'} - ${
                  selectedFilters['Ngày KT'] || '--'
                }`}
                style={{flex: 2}}
              />
              <Button.Select
                title={selectedFilters['Mặt hàng'] || 'Tất cả'}
                style={{flex: 1}}
                iconRight={
                  <DownIcon style={{color: Colors.white, width: scale(20)}} />
                }
              />
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

          {/* Footer phân tích AI */}
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
