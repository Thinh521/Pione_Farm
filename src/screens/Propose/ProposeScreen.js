import React, {useCallback} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Images from '~/assets/images/Images';
import ProposeItem from './ProposeItem';
import {useNavigation} from '@react-navigation/core';
import {scale} from '~/utils/scaling';
import {Colors, FontSizes, FontWeights} from '~/theme/theme';

const data = [
  {
    id: '1',
    name: 'Đồng bằng sông Cửu Long',
    images: [Images.mekong, Images.mekong, Images.mekong, Images.mekong],
    value: '10.2',
    percent: '+89.01% this week',
    description:
      'Là vùng cực nam của Việt Nam, có hệ thống sông ngòi chằng chịt, đất đai màu mỡ và là vựa lúa lớn nhất cả nước.',
    location:
      'Bao gồm 13 tỉnh, thành: An Giang, Đồng Tháp, Tiền Giang, Vĩnh Long, Bến Tre, Trà Vinh, Sóc Trăng, Bạc Liêu, Cà Mau, Kiên Giang, Hậu Giang, Long An, Cần Thơ',
    area: '40,577 km²',
    population: '17.2 triệu người',
    climate: {
      type: 'Khí hậu nhiệt đới gió mùa',
      temperature: '26-28°C',
      rainfall: '1,200-1,800mm/năm',
      seasons: 'Mùa khô: tháng 12-4, Mùa mưa: tháng 5-11',
      humidity: '80-85%',
    },
    soil: {
      type: 'Đất phù sa',
      ph: '6.0-7.5',
      characteristics: 'Màu mỡ, giàu chất hữu cơ, được bồi đắp hàng năm',
      depth: '2-3m',
      advantages: 'Cung cấp dưỡng chất tự nhiên, dễ canh tác',
    },
    address: {
      latitude: 10.2,
      longitude: 105.2,
      latitudeDelta: 2.0,
      longitudeDelta: 2.0,
    },
    crops: [
      {
        name: 'Lúa',
        season:
          'Vụ đông xuân: tháng 12-4, Vụ hè thu: tháng 6-10, Vụ mùa: tháng 8-12',
        area: '2.5 triệu ha',
        yield: '6-7 tấn/ha',
        description: 'Cây trồng chủ lực, cung cấp 50% lượng gạo cả nước.',
        requirements: 'Nhiệt độ 23-30°C, ngập nước 10-15cm',
        techniques: '1 gieo 2 cấy, gieo sạ, tưới tiêu theo nhu cầu',
        diseases: 'Bệnh đạo ôn, sâu cuốn lá, rầy nâu',
      },
      {
        name: 'Mía',
        season: 'Trồng: tháng 2-4, Thu hoạch: tháng 11-3',
        area: '200,000 ha',
        yield: '70-80 tấn/ha',
        description: 'Cây công nghiệp quan trọng, nguyên liệu sản xuất đường.',
        requirements: 'Nhiệt độ 26-32°C, đất thoát nước tốt',
        techniques: 'Trồng luống cao, bón phân 3 lần/vụ',
        diseases: 'Bệnh đốm đỏ, sâu đục thân, rệp sáp',
      },
      {
        name: 'Dừa',
        season: 'Trồng: tháng 5-6, Thu quanh năm',
        area: '140,000 ha',
        yield: '80-100 quả/cây/năm',
        description: 'Cây đặc sản vùng ven biển, chế biến nhiều sản phẩm.',
        requirements: 'Gần nguồn nước, chịu mặn tốt',
        techniques: 'Trồng theo hàng, tưới nhỏ giọt',
        diseases: 'Bệnh vàng lá, rệp dừa, sâu đục ngọn',
      },
      {
        name: 'Thanh long',
        season: 'Trồng: tháng 5-6, Thu: tháng 6-11',
        area: '35,000 ha',
        yield: '25-30 tấn/ha',
        description: 'Cây ăn quả có giá trị kinh tế cao, xuất khẩu nhiều.',
        requirements: 'Nhiệt độ 25-30°C, thoát nước tốt',
        techniques: 'Trồng leo giàn, cắt tỉa thường xuyên',
        diseases: 'Bệnh thối gốc, sâu đục thân, nấm đốm lá',
      },
      {
        name: 'Rau màu',
        season: 'Trồng quanh năm',
        area: '180,000 ha',
        yield: '20-25 tấn/ha',
        description: 'Đa dạng loại rau: cải, rau muống, bầu bí, dưa chuột.',
        requirements: 'Đất tơi xốp, nhiều chất hữu cơ',
        techniques: 'Luân canh, sử dụng màng phủ',
        diseases: 'Bệnh héo xanh, sâu khoang, rệp mềm',
      },
    ],
    advantages: [
      'Đất phù sa màu mỡ, tự bồi đắp',
      'Hệ thống sông ngòi chằng chịt',
      'Khí hậu ổn định, thuận lợi nông nghiệp',
      'Kinh nghiệm canh tác lúa nước lâu đời',
      'Cơ sở hạ tầng phát triển',
    ],
    challenges: [
      'Xâm nhập mặn ngày càng sâu',
      'Hạn hán và lũ lụt thất thường',
      'Suy thoái đất do thâm canh',
      'Thiếu nước ngọt mùa khô',
      'Ô nhiễm môi trường nước',
    ],
  },
  {
    id: '2',
    name: 'Đồng bằng Bắc Bộ',
    description:
      'Là cái nôi văn minh lúa nước, vùng này có hệ thống sông Hồng và điều kiện thuận lợi cho trồng lúa, rau màu.',
    images: [Images.mekong, Images.mekong, Images.mekong, Images.mekong],
    value: '8.4',
    percent: '+72.15% this week',
    location:
      'Bao gồm: Hà Nội, Hải Phòng, Hải Dương, Hưng Yên, Hà Nam, Nam Định, Thái Bình, Ninh Bình, Vĩnh Phúc',
    area: '14,900 km²',
    population: '14.5 triệu người',
    climate: {
      type: 'Khí hậu cận nhiệt đới gió mùa',
      temperature: '16-28°C',
      rainfall: '1,600-1,800mm/năm',
      seasons: 'Mùa đông: tháng 11-3, Mùa hè: tháng 4-10',
      humidity: '75-85%',
    },
    soil: {
      type: 'Đất phù sa sông Hồng',
      ph: '6.5-7.0',
      characteristics: 'Màu mỡ, tầng đất dày, giàu khoáng chất',
      depth: '1.5-2.5m',
      advantages: 'Cấu trúc tốt, thoát nước vừa phải',
    },
    address: {
      latitude: 15.4,
      longitude: 108.3,
      latitudeDelta: 3.0,
      longitudeDelta: 3.0,
    },
    crops: [
      {
        name: 'Lúa',
        season: 'Vụ chiêm: tháng 6-10, Vụ mùa: tháng 12-5',
        area: '1.2 triệu ha',
        yield: '5.5-6.5 tấn/ha',
        description: 'Cây trồng truyền thống, cung cấp 20% lượng gạo cả nước.',
        requirements: 'Nhiệt độ 20-30°C, đủ nước tưới',
        techniques: 'Cấy thẳng hàng, sử dụng giống chất lượng cao',
        diseases: 'Bệnh đạo ôn, sâu cuốn lá, rầy nâu',
      },
      {
        name: 'Ngô',
        season: 'Vụ xuân: tháng 2-6, Vụ mùa: tháng 7-11',
        area: '250,000 ha',
        yield: '5-6 tấn/ha',
        description: 'Cây lương thực thứ hai, làm thức ăn chăn nuôi.',
        requirements: 'Nhiệt độ 18-30°C, đất thoát nước tốt',
        techniques: 'Gieo thẳng hàng, bón phân cân đối',
        diseases: 'Bệnh cháy lá, sâu khoang, rệp',
      },
      {
        name: 'Rau màu',
        season: 'Trồng quanh năm',
        area: '200,000 ha',
        yield: '15-20 tấn/ha',
        description: 'Đa dạng: rau cải, su hào, cà chua, ớt.',
        requirements: 'Đất tơi xốp, phì nhiêu',
        techniques: 'Nhà kính, thủy canh, canh tác hữu cơ',
        diseases: 'Bệnh héo xanh, nấm rễ, sâu ăn lá',
      },
      {
        name: 'Đậu phộng',
        season: 'Vụ xuân: tháng 2-6, Vụ mùa: tháng 8-12',
        area: '120,000 ha',
        yield: '2.5-3 tấn/ha',
        description: 'Cây họ đậu, cải tạo đất và cung cấp protein.',
        requirements: 'Nhiệt độ 25-30°C, đất cát pha',
        techniques: 'Gieo thẳng, vun luống cao',
        diseases: 'Bệnh héo xanh, sâu khoang, nấm rễ',
      },
      {
        name: 'Khoai lang',
        season: 'Trồng: tháng 3-4 và 7-8, Thu: sau 4-5 tháng',
        area: '80,000 ha',
        yield: '18-22 tấn/ha',
        description: 'Cây lương thực chịu hạn, thích ứng tốt.',
        requirements: 'Đất thoát nước tốt, ít phân đạm',
        techniques: 'Trồng luống cao, tỉa bỏ dây thừa',
        diseases: 'Bệnh thối củ, sâu khoang, nứt củ',
      },
    ],
    advantages: [
      'Đất phù sa màu mỡ của sông Hồng',
      'Khí hậu 4 mùa rõ rệt',
      'Kinh nghiệm canh tác lúa nước cổ xưa',
      'Mạng lưới thủy lợi phát triển',
      'Gần thị trường tiêu thụ lớn',
    ],
    challenges: [
      'Thiếu đất sản xuất do đô thị hóa',
      'Ô nhiễm môi trường công nghiệp',
      'Thời tiết cực đoan tăng',
      'Chi phí sản xuất cao',
      'Cạnh tranh nguồn nước với công nghiệp',
    ],
  },
  {
    id: '3',
    name: 'Tây Nguyên',
    description:
      'Vùng cao nguyên đất đỏ bazan nổi tiếng với cây công nghiệp như cà phê, hồ tiêu, cao su.',
    images: [Images.mekong, Images.mekong, Images.mekong, Images.mekong],
    value: '9.1',
    percent: '+66.90% this week',
    location: 'Bao gồm các tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông, Lâm Đồng',
    area: '54,474 km²',
    population: '5.8 triệu người',
    climate: {
      type: 'Khí hậu nhiệt đới gió mùa',
      temperature: '18-25°C',
      rainfall: '1,800-2,500mm/năm',
      seasons: 'Mùa khô: tháng 11-4, Mùa mưa: tháng 5-10',
      humidity: '75-85%',
    },
    soil: {
      type: 'Đất đỏ bazan',
      ph: '5.5-6.5',
      characteristics:
        'Giàu dinh dưỡng, thoát nước tốt, chứa nhiều khoáng chất',
      depth: '1-2m',
      advantages: 'Thích hợp cho cây công nghiệp lâu năm, độ phì nhiêu cao',
    },
    address: {
      latitude: 12.6667,
      longitude: 108.05,
      latitudeDelta: 1.5,
      longitudeDelta: 1.5,
    },
    crops: [
      {
        name: 'Cà phê',
        season: 'Gieo: tháng 5-6, Thu hoạch: tháng 11-1',
        area: '690,000 ha',
        yield: '18-20 tấn/ha',
        description:
          'Cây trồng chủ lực, chiếm 60% diện tích canh tác. Chủ yếu là cà phê Robusta.',
        requirements: 'Nhiệt độ 18-24°C, lượng mưa 1,500-2,000mm',
        techniques: 'Trồng theo hàng, tỉa cành, bón phân định kỳ',
        diseases: 'Bệnh gỉ sắt, sâu đục cành, sâu đục quả',
      },
      {
        name: 'Hồ tiêu',
        season: 'Gieo: tháng 6-7, Thu hoạch: tháng 12-2',
        area: '85,000 ha',
        yield: '3-4 tấn/ha',
        description: 'Cây gia vị có giá trị kinh tế cao, xuất khẩu chủ yếu.',
        requirements: 'Nhiệt độ 24-28°C, độ ẩm 80-85%',
        techniques: 'Trồng leo giàn, tưới nhỏ giọt, cắt tỉa thường xuyên',
        diseases: 'Bệnh héo xanh, nấm rễ, sâu đục thân',
      },
      {
        name: 'Cao su',
        season: 'Trồng: tháng 5-6, Khai thác: sau 7 năm',
        area: '450,000 ha',
        yield: '2.5-3 tấn mủ/ha/năm',
        description: 'Cây công nghiệp lâu năm, tuổi thọ 25-30 năm.',
        requirements: 'Nhiệt độ 25-30°C, lượng mưa 2,000mm',
        techniques: 'Cạo mủ sáng sớm, bón phân theo chu kỳ',
        diseases: 'Bệnh lá khô, nấm rễ, sâu ăn lá',
      },
      {
        name: 'Điều',
        season: 'Trồng: tháng 5-6, Thu hoạch: tháng 2-4',
        area: '120,000 ha',
        yield: '1.5-2 tấn/ha',
        description: 'Cây chịu hạn tốt, thích hợp với vùng đồi núi.',
        requirements: 'Nhiệt độ 20-30°C, chịu được hạn hán',
        techniques: 'Tỉa cành tạo tán, phòng trừ sâu bệnh',
        diseases: 'Bệnh đốm lá, sâu đục quả, rệp sáp',
      },
      {
        name: 'Chè',
        season: 'Trồng: tháng 6-7, Hái: quanh năm',
        area: '25,000 ha',
        yield: '8-12 tấn lá tươi/ha/năm',
        description: 'Thích hợp với vùng cao, sương mù nhiều.',
        requirements: 'Độ cao >800m, nhiệt độ 18-25°C',
        techniques: 'Hái non liên tục, tỉa cành định kỳ',
        diseases: 'Bệnh đốm nâu, sâu đo, nhện đỏ',
      },
    ],
    advantages: [
      'Đất đai phì nhiêu, thích hợp cây công nghiệp',
      'Khí hậu ổn định, 2 mùa rõ rệt',
      'Địa hình đồi núi, thuận lợi thoát nước',
      'Nguồn nhân công dồi dào',
      'Kinh nghiệm canh tác lâu đời',
    ],
    challenges: [
      'Biến đổi khí hậu ảnh hưởng năng suất',
      'Sâu bệnh phát triển mạnh',
      'Giá cả thế giới biến động',
      'Cần đầu tư công nghệ hiện đại',
      'Bảo vệ môi trường sinh thái',
    ],
  },
  {
    id: '4',
    name: 'Đông Nam Bộ',
    description:
      'Vùng kinh tế trọng điểm với khí hậu ôn hòa, thuận lợi cho phát triển cây ăn quả, cao su, điều.',
    images: [Images.mekong, Images.mekong, Images.mekong, Images.mekong],
    value: '7.6',
    percent: '+71.88% this week',
    location:
      'Bao gồm: TP.HCM, Bình Dương, Đồng Nai, Bà Rịa-Vũng Tàu, Tây Ninh, Bình Phước',
    area: '23,598 km²',
    population: '16.5 triệu người',
    climate: {
      type: 'Khí hậu nhiệt đới gió mùa',
      temperature: '25-29°C',
      rainfall: '1,400-2,000mm/năm',
      seasons: 'Mùa khô: tháng 12-4, Mùa mưa: tháng 5-11',
      humidity: '70-80%',
    },
    soil: {
      type: 'Đất xám, đất đỏ vàng',
      ph: '5.0-6.5',
      characteristics: 'Đa dạng loại đất, từ cát đến sét',
      depth: '0.8-1.5m',
      advantages: 'Thích hợp cho nhiều loại cây trồng',
    },
    address: {
      latitude: 11.0,
      longitude: 106.5,
      latitudeDelta: 1.5,
      longitudeDelta: 1.5,
    },
    crops: [
      {
        name: 'Cao su',
        season: 'Trồng: tháng 5-6, Khai thác: sau 6-7 năm',
        area: '780,000 ha',
        yield: '2.8-3.2 tấn mủ/ha/năm',
        description: 'Cây công nghiệp chủ lực, chiếm 35% diện tích canh tác.',
        requirements: 'Nhiệt độ 24-28°C, lượng mưa 1,800mm',
        techniques: 'Cạo mủ theo chu kỳ, bón phân cân đối',
        diseases: 'Bệnh thối rễ, nấm lá, sâu ăn lá',
      },
      {
        name: 'Điều',
        season: 'Trồng: tháng 4-5, Thu hoạch: tháng 1-3',
        area: '280,000 ha',
        yield: '1.8-2.2 tấn/ha',
        description: 'Cây đặc sản xuất khẩu, chế biến giá trị cao.',
        requirements: 'Chịu hạn tốt, đất thoát nước',
        techniques: 'Tỉa cành thông thoáng, phòng trừ tổng hợp',
        diseases: 'Bệnh thối quả, sâu đục quả, rệp sáp',
      },
      {
        name: 'Lúa',
        season: 'Vụ đông xuân: tháng 12-4, Vụ hè thu: tháng 6-10',
        area: '650,000 ha',
        yield: '5.5-6.5 tấn/ha',
        description: 'Lương thực chính, canh tác thâm canh.',
        requirements: 'Đủ nước tưới, nhiệt độ 25-30°C',
        techniques: 'Gieo sạ, cấy máy, thu hoạch cơ giới',
        diseases: 'Bệnh đạo ôn, rầy nâu, sâu cuốn lá',
      },
      {
        name: 'Thanh long',
        season: 'Trồng: tháng 4-5, Thu: tháng 6-12',
        area: '45,000 ha',
        yield: '28-35 tấn/ha',
        description: 'Cây ăn quả xuất khẩu, giá trị kinh tế cao.',
        requirements: 'Thoát nước tốt, nhiệt độ 26-30°C',
        techniques: 'Trồng leo giàn, chiếu sáng bổ sung',
        diseases: 'Bệnh thối thân, nấm đốm, sâu đục quả',
      },
      {
        name: 'Rau màu',
        season: 'Trồng quanh năm',
        area: '120,000 ha',
        yield: '22-28 tấn/ha',
        description: 'Cung cấp rau xanh cho các thành phố lớn.',
        requirements: 'Đất tơi xốp, tưới đủ nước',
        techniques: 'Nhà lưới, thủy canh, hữu cơ',
        diseases: 'Bệnh héo xanh, sâu khoang, rệp',
      },
    ],
    advantages: [
      'Gần thị trường tiêu thụ lớn',
      'Hạ tầng giao thông phát triển',
      'Nguồn vốn đầu tư dồi dào',
      'Công nghệ canh tác hiện đại',
      'Chuỗi giá trị hoàn chỉnh',
    ],
    challenges: [
      'Áp lực chuyển đổi mục đích sử dụng đất',
      'Ô nhiễm môi trường công nghiệp',
      'Chi phí đất và nhân công cao',
      'Cạnh tranh nguồn nước',
      'Thiếu lao động nông nghiệp',
    ],
  },
  {
    id: '5',
    name: 'Đồng bằng sông Hồng',
    description:
      'Vùng trọng điểm về sản xuất lúa, rau màu và chăn nuôi, có mật độ dân số cao và trình độ thâm canh lớn.',
    images: [Images.mekong, Images.mekong, Images.mekong, Images.mekong],
    value: '9.3',
    percent: '+64.25% this week',
    location:
      'Bao gồm: Hà Nội, Hải Dương, Hưng Yên, Nam Định, Thái Bình, Hà Nam, Ninh Bình, Vĩnh Phúc, Bắc Ninh',
    area: '14,862 km²',
    population: '21.0 triệu người',
    climate: {
      type: 'Khí hậu nhiệt đới ẩm gió mùa',
      temperature: '23-27°C',
      rainfall: '1,500-1,800mm/năm',
      seasons: 'Mùa khô: tháng 11-4, Mùa mưa: tháng 5-10',
      humidity: '80-85%',
    },
    soil: {
      type: 'Đất phù sa sông Hồng',
      ph: '6.0-6.8',
      characteristics: 'Đất màu mỡ, dễ canh tác',
      depth: '1.0-1.8m',
      advantages: 'Thích hợp trồng lúa, rau màu, cây ăn quả',
    },
    address: {
      latitude: 20.9,
      longitude: 105.9,
      latitudeDelta: 1.2,
      longitudeDelta: 1.2,
    },
    crops: [
      {
        name: 'Lúa',
        season: 'Vụ chiêm, vụ mùa, vụ đông xuân',
        area: '720,000 ha',
        yield: '6.0-6.8 tấn/ha',
        description: 'Cây lương thực chủ đạo, canh tác 3 vụ/năm.',
        requirements: 'Khí hậu ẩm, nhiều nước tưới',
        techniques: 'Cấy thâm canh, gieo sạ hàng',
        diseases: 'Đạo ôn, rầy nâu, sâu cuốn lá',
      },
      {
        name: 'Rau màu',
        season: 'Trồng quanh năm',
        area: '210,000 ha',
        yield: '25-30 tấn/ha',
        description: 'Đa dạng chủng loại, phục vụ nội địa và xuất khẩu.',
        requirements: 'Đất tơi xốp, thoát nước tốt',
        techniques: 'Trồng nhà lưới, canh tác sạch',
        diseases: 'Sâu xanh, rệp, bệnh héo rũ',
      },
      {
        name: 'Cây ăn quả (chuối, nhãn, vải)',
        season: 'Thu hoạch từ tháng 5-8',
        area: '85,000 ha',
        yield: '15-20 tấn/ha',
        description: 'Chủ yếu phục vụ thị trường phía Bắc và xuất khẩu.',
        requirements: 'Ánh sáng tốt, tưới tiêu hợp lý',
        techniques: 'Tỉa cành, bón phân hữu cơ',
        diseases: 'Ruồi vàng, sâu đục trái',
      },
    ],
    advantages: [
      'Thị trường tiêu thụ lớn',
      'Trình độ canh tác cao',
      'Hệ thống thủy lợi phát triển',
      'Gần các trung tâm nghiên cứu nông nghiệp',
      'Nguồn lao động dồi dào',
    ],
    challenges: [
      'Thiếu đất sản xuất do đô thị hóa',
      'Ô nhiễm nguồn nước',
      'Biến đổi khí hậu ảnh hưởng mùa vụ',
      'Ngập úng vào mùa mưa',
      'Chi phí đầu vào tăng cao',
    ],
  },
  {
    id: '6',
    name: 'Trung du và miền núi Bắc Bộ',
    description:
      'Vùng có địa hình đồi núi, khí hậu đa dạng, thuận lợi cho cây công nghiệp dài ngày, cây ăn quả ôn đới và phát triển rừng.',
    images: [Images.mekong, Images.mekong, Images.mekong, Images.mekong],
    value: '6.1',
    percent: '+55.72% this week',
    location:
      'Bao gồm: Lào Cai, Yên Bái, Tuyên Quang, Hà Giang, Sơn La, Lai Châu, Điện Biên, Cao Bằng, Bắc Kạn, Lạng Sơn, Thái Nguyên, Phú Thọ',
    area: '101,000 km²',
    population: '12.3 triệu người',
    climate: {
      type: 'Cận nhiệt đới ẩm, vùng cao có khí hậu ôn đới',
      temperature: '15-25°C',
      rainfall: '1,800-2,500mm/năm',
      seasons: 'Mùa mưa: tháng 5-10, Mùa khô: tháng 11-4',
      humidity: '75-90%',
    },
    soil: {
      type: 'Đất feralit trên đá vôi, bazan',
      ph: '4.5-6.0',
      characteristics: 'Chua, thoát nước tốt',
      depth: '1.0-2.0m',
      advantages: 'Phù hợp trồng cây công nghiệp dài ngày',
    },
    address: {
      latitude: 22.0,
      longitude: 104.0,
      latitudeDelta: 1.8,
      longitudeDelta: 1.8,
    },
    crops: [
      {
        name: 'Chè',
        season: 'Thu hoạch quanh năm (chính vụ: tháng 4-11)',
        area: '125,000 ha',
        yield: '8-10 tấn/ha',
        description: 'Cây công nghiệp lâu năm chủ lực của vùng.',
        requirements: 'Đất đồi, độ cao > 500m, ẩm mát',
        techniques: 'Cắt tỉa thường xuyên, thu hái non',
        diseases: 'Bọ xít, rầy xanh, nấm lá',
      },
      {
        name: 'Ngô',
        season: 'Xuân hè và hè thu',
        area: '320,000 ha',
        yield: '4.5-5.5 tấn/ha',
        description: 'Cây lương thực thay thế cho lúa trên đất dốc.',
        requirements: 'Đất tơi xốp, khí hậu khô mát',
        techniques: 'Gieo theo hàng, phân chuồng hoai',
        diseases: 'Sâu đục thân, rệp hại ngô',
      },
      {
        name: 'Mận/Đào',
        season: 'Ra hoa: tháng 2-3, Thu hoạch: tháng 5-6',
        area: '30,000 ha',
        yield: '8-12 tấn/ha',
        description: 'Cây ăn quả ôn đới đặc sản vùng cao.',
        requirements: 'Nhiệt độ thấp, có mùa đông lạnh',
        techniques: 'Tỉa thưa, xử lý ra hoa bằng nhiệt',
        diseases: 'Nấm đốm lá, sâu đục quả',
      },
    ],
    advantages: [
      'Tài nguyên đất đai và rừng lớn',
      'Khí hậu đa dạng theo độ cao',
      'Phù hợp cây đặc sản và dược liệu',
      'Có tiềm năng du lịch nông nghiệp',
      'Chi phí đất thấp hơn đồng bằng',
    ],
    challenges: [
      'Địa hình chia cắt, giao thông khó khăn',
      'Khó cơ giới hóa sản xuất',
      'Thiếu nước vào mùa khô',
      'Tỉ lệ nghèo đói cao',
      'Biến đổi khí hậu ảnh hưởng nặng',
    ],
  },
];

const ProposeScreen = () => {
  const navigation = useNavigation();

  const navigateToAllPropose = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'CropZoneAll',
      params: {
        data: data,
      },
    });
  }, [navigation, data]);

  const navigateToProposeDetail = item => {
    navigation.navigate('NoBottomTab', {
      screen: 'CropZoneDetail',
      params: {item},
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Vùng trồng</Text>
        <TouchableOpacity onPress={navigateToAllPropose}>
          <Text>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      {data.slice(0, 3).map(item => (
        <ProposeItem
          key={item.id}
          title={item.name}
          description={item.description}
          images={item.images}
          value={item.value}
          percent={item.percent}
          onPress={() => navigateToProposeDetail(item)}
        />
      ))}
    </ScrollView>
  );
};

export default ProposeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: scale(20),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.title,
    fontSize: FontSizes.large,
    fontWeight: FontWeights.semiBold,
    marginBottom: scale(10),
  },
});
