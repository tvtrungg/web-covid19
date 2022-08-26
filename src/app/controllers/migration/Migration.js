const mongoose = require("mongoose");
const User = require('../../models/User')
const Product = require('../../models/Product')
const Package = require('../../models/Package')
const Hospital = require('../../models/Hospital')
const Ward = require('../../models/Ward')
const District = require('../../models/District')
const City = require('../../models/City')

class Migration {
      async migrateInit(req, res, next) {
            var packs, products, packitems;
            // var city, district, ward, hospital;

            // city = await City.create([
            //       { _id: mongoose.Types.ObjectId(), name: 'TP.Hồ Chí Minh' },
            //       { _id: mongoose.Types.ObjectId(), name: 'TP.Hà Nội' },
            //       { _id: mongoose.Types.ObjectId(), name: 'TP.Đà Nẵng' },
            //       { _id: mongoose.Types.ObjectId(), name: 'TP.Cần Thơ' },
            //       { _id: mongoose.Types.ObjectId(), name: 'TP.Châu Đốc' },
            // ]);

            // district = await District.create([
            //       /*TP. Hồ Chí Minh */
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận 1', _cityid: city[0]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận 4', _cityid: city[0]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận 5', _cityid: city[0]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận 7', _cityid: city[0]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận 8', _cityid: city[0]._id },
            //       /*TP. Hà Nội */
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Thanh Xuân', _cityid: city[1]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Cầu Giấy', _cityid: city[1]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Nam Từ Liêm', _cityid: city[1]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Hoàn Kiếm', _cityid: city[1]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Hai Bà Trưng', _cityid: city[1]._id },
            //       /*TP. Đà Nẵng */
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Hải Châu', _cityid: city[2]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Cẩm Lệ', _cityid: city[2]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Thanh Khê', _cityid: city[2]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Liên Chiểu', _cityid: city[2]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Ngũ Hành Sơn', _cityid: city[2]._id },
            //       /*TP. Cần Thơ */
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Bình Thủy', _cityid: city[3]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Cái Răng', _cityid: city[3]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Ninh Kiều', _cityid: city[3]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Ô Môn', _cityid: city[3]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Thốt Nốt', _cityid: city[3]._id },
            //       /*TP. Châu Đốc */
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Châu Phú', _cityid: city[4]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Tân Châu', _cityid: city[4]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Tri Tôn', _cityid: city[4]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận Tịnh Biên', _cityid: city[4]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Quận An Phú', _cityid: city[4]._id },


            // ]);

            // ward = await Ward.create([
            //       /*TP. Hồ Chí Minh */
            //       /*Các Phường của Quận 1 */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bến Nghé', _distid: district[0]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bến Thành', _distid: district[0]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Cô Giang', _distid: district[0]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Cầu Kho', _distid: district[0]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Cầu Tân Định', _distid: district[0]._id },
            //       /*Các Phường của Quận 4 */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 1', _distid: district[1]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 2', _distid: district[1]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 3', _distid: district[1]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 4', _distid: district[1]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 5', _distid: district[1]._id },
            //       /*Các Phường của Quận 5 */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 1', _distid: district[2]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 2', _distid: district[2]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 3', _distid: district[2]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 4', _distid: district[2]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 5', _distid: district[2]._id },
            //       /*Các Phường của Quận 7 */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Tân Hưng', _distid: district[3]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Tân Phong', _distid: district[3]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Tân Quy', _distid: district[3]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Phú Mỹ', _distid: district[3]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bình Thuận', _distid: district[3]._id },
            //       /*Các Phường của Quận 8 */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Xóm Củi', _distid: district[4]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hưng Phú', _distid: district[4]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bình An', _distid: district[4]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Chánh Hưng', _distid: district[4]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Rạch Ông', _distid: district[4]._id },

            //       /*TP. Hà Nội */
            //       /*Các Phường của Quận Thanh Xuân */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hạ Đình', _distid: district[5]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Kim Giang', _distid: district[5]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Khương Đình', _distid: district[5]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Khương Mai', _distid: district[5]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Khương Trung', _distid: district[5]._id },
            //       /*Các Phường của Quận Cầu Giấy */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Dịch Vọng', _distid: district[6]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Dịch Vọng Hậu', _distid: district[6]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Mai Dịch', _distid: district[6]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Nghĩa Đô', _distid: district[6]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Nghĩa Tân', _distid: district[6]._id },
            //       /*Các Phường của Quận Nam Từ Liêm */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Cầu Diễn', _distid: district[7]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Mỹ Đình 1', _distid: district[7]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Mỹ Đình 2', _distid: district[7]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Phú Đô', _distid: district[7]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Mễ Trì', _distid: district[7]._id },
            //       /*Các Phường của Quận Hoàn Kiếm */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Chương Dương', _distid: district[8]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Cửa Đông', _distid: district[8]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Cửa Nam', _distid: district[8]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Đồng Xuân', _distid: district[8]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hàng Bạc', _distid: district[8]._id },
            //       /*Các Phường của Quận Hai Bà Trưng */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Nguyễn Du', _distid: district[9]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Lê Đại Hành', _distid: district[9]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bùi Thị Xuân', _distid: district[9]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Phố Huế', _distid: district[9]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Ngô Thì Nhậm', _distid: district[9]._id },

            //       /*TP. Đà Nẵng */
            //       /*Các Phường của Quận Hải Châu */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hải Châu 1', _distid: district[10]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hải Châu 2', _distid: district[10]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thạch Thang', _distid: district[10]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thanh Bình', _distid: district[10]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thuận Phước', _distid: district[10]._id },
            //       /*Các Phường của Quận Cẩm Lệ */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Khuê Trung', _distid: district[11]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa Thọ Đông', _distid: district[11]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa Thọ Tây', _distid: district[11]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa An', _distid: district[11]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa Phát', _distid: district[11]._id },
            //       /*Các Phường của Quận Thanh Khê*/
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Vĩnh Trung', _distid: district[12]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Tân Chính', _distid: district[12]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thạc Gián', _distid: district[12]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Chính Gián', _distid: district[12]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Tam Thuận', _distid: district[12]._id },
            //       /*Các Phường của Quận Liên Chiểu */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa Minh', _distid: district[13]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa Khánh Nam', _distid: district[13]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hoà Khánh Bắc', _distid: district[13]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa Hiệp Nam', _distid: district[13]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hoà Hiệp Bắc', _distid: district[13]._id },
            //       /*Các Phường của Quận Ngũ Hành Sơn */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường 1', _distid: district[14]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Mỹ An', _distid: district[14]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Khuê Mỹ', _distid: district[14]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa Hải', _distid: district[14]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Hòa Quý', _distid: district[14]._id },

            //       /*TP. Cần Thơ */
            //       /*Các Phường của Quận Bình Thủy*/
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Trà Nóc', _distid: district[15]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Trà An', _distid: district[15]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường An Thới', _distid: district[15]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bùi Hữu Nghĩa', _distid: district[15]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bình Thủy', _distid: district[15]._id },
            //       /*Các Phường của Quận Cái Răng */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Lê Bình', _distid: district[16]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thường Thạnh', _distid: district[16]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Phú Thứ', _distid: district[16]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Tân Phú', _distid: district[16]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Ba Láng', _distid: district[16]._id },
            //       /*Các Phường của Quận Ninh Kiều */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Cái Khế', _distid: district[17]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường An Hoà', _distid: district[17]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thới Bình', _distid: district[17]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường An Nghiệp', _distid: district[17]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường An Cư', _distid: district[17]._id },
            //       /*Các Phường của Quận Ô Môn */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Châu Văn Liêm', _distid: district[18]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Long Hưng', _distid: district[18]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Phước Thới', _distid: district[18]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thới An', _distid: district[18]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thới Hoà', _distid: district[18]._id },
            //       /*Các Phường của Quận Thốt Nốt */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thốt Nốt', _distid: district[19]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thới Thuận', _distid: district[19]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thuận An', _distid: district[19]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Trung Nhứt', _distid: district[19]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Thạnh Hòa', _distid: district[19]._id },

            //       /*TP. Châu Đốc */
            //       /*Các Phường của Quận Châu Phú */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bình Mỹ', _distid: district[20]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bình Thủy', _distid: district[20]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bình Long', _distid: district[20]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bình Chánh', _distid: district[20]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Bình Phú', _distid: district[20]._id },
            //       /*Các Phường của Quận Tân Châu */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Long Thạnh', _distid: district[21]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Long Hưng', _distid: district[21]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Long Châu', _distid: district[21]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Long Sơn', _distid: district[21]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Long Phú', _distid: district[21]._id },
            //       /*Các Phường của Quận Tri Tôn */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Lạc Quới', _distid: district[22]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Lê Trì', _distid: district[22]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Vĩnh Gia', _distid: district[22]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Vĩnh Phước', _distid: district[22]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Châu Lăng', _distid: district[22]._id },
            //       /*Các Phường của Quận Tịnh Biên */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường An Cư', _distid: district[23]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường An Hảo', _distid: district[23]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường An Nông', _distid: district[23]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường An Phú', _distid: district[23]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Nhơn Hưng', _distid: district[23]._id },
            //       /*Các Phường của Quận An Phú */
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Đa Phước', _distid: district[24]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Khánh An', _distid: district[24]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Khánh Bình', _distid: district[24]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Nhơn Hội', _distid: district[24]._id },
            //       { _id: mongoose.Types.ObjectId(), name: 'Phường Phú Hội', _distid: district[24]._id },

            // ]);

            // hospital = await Hospital.create([
            //       { _id: mongoose.Types.ObjectId(), name: 'Bệnh viện Nhi Đồng 1', _wardid: ward[0]._id, address: 'Phường Bến Nghé', capacity: 10000, intake: 3000 },
            //       { _id: mongoose.Types.ObjectId(), name: 'Bệnh viện Quận 10', _wardid: ward[1]._id, address: 'Phường Bến Thành', capacity: 11000, intake: 3000 },
            //       { _id: mongoose.Types.ObjectId(), name: 'Bệnh viện Nhân Dân 115', _wardid: ward[2]._id, address: 'Phường Cô Giang', capacity: 12000, intake: 3000 },
            //       { _id: mongoose.Types.ObjectId(), name: 'Bệnh viện Chợ Rẫy', _wardid: ward[3]._id, address: 'Phường Cầu Kho', capacity: 13000, intake: 3000 },
            //       { _id: mongoose.Types.ObjectId(), name: 'Bệnh viện Bệnh Nhiệt đới', _wardid: ward[4]._id, address: 'Phường Cầu Tân Định', capacity: 14000, intake: 3000 },
            //       { _id: mongoose.Types.ObjectId(), name: 'Bệnh viện Đại học Y Dược', _wardid: ward[5]._id, address: 'Phường 1', capacity: 15000, intake: 3000 },
            // ]);
            products = await Product.find({})
            packitems =
                  [{ _itemid: products[0]._id , amount: '3',amountMax: '3' },
                  { _itemid: products[1]._id , amount: '3',amountMax: '3' },
                  { _itemid: products[2]._id , amount: '3',amountMax: '3' }];

            packs = await Package.create([
                  { _id: mongoose.Types.ObjectId(), name: 'Gói 1', image: 'nyp1.png', limit: '3', time: 'ngày', amount: '3', price: '33000', package: packitems },
                  { _id: mongoose.Types.ObjectId(), name: 'Gói 2', image: 'nyp2.png', limit: '3', time: 'ngày', amount: '3', price: '33000', package: packitems },
                  { _id: mongoose.Types.ObjectId(), name: 'Gói 3', image: 'nyp3.png', limit: '3', time: 'ngày', amount: '3', price: '33000', package: packitems }
            ]);
            res.set('Content-Type', 'text/html');
            res.send(JSON.stringify("Đã load data"));
      }
}

// thêm từ khóa new nó sẽ tạo ra 1 đối tượng mới export ra ngoài
module.exports = new Migration();