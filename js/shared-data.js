

const DEFAULT_TENANTS = [
  { id: 1, name: "Ayam Bakar Bu Sri", desc: "Spesialis ayam bakar madu bumbu meresap dan aneka sambal Nusantara sejak 1999.", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=60", isPromo: true, promoBadge: "Diskon 25%", rating: 4.8, price: 25000, category: "makanan" },
  { id: 2, name: "Pusat Oleh-Oleh Mbok Giyem", desc: "Menyediakan aneka keripik tempe, singkong, pisang lumer, dan buah kering renyah khas lokal.", img: "https://gotravelly.com/blog/wp-content/uploads/2017/12/oleh-oleh-solo-intip.jpg", isPromo: true, promoBadge: "Potongan Rp10rb", rating: 4.5, price: 15000, category: "cemilan" },
  { id: 3, name: "Kedai Kopi Pak Kumis", desc: "Tempat berkumpulnya penikmat kopi lokal racikan manual brew barista berpengalaman.", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60", isPromo: true, promoBadge: "Buy 1 Get 1", rating: 4.9, price: 20000, category: "minuman" },
  { id: 4, name: "Warung Sate Khas Madura Cak Malik", desc: "Sate ayam dan kambing pilihan dengan siraman bumbu kacang kental legendaris.", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60", isPromo: true, promoBadge: "Diskon 15%", rating: 4.6, price: 28000, category: "makanan" },
  { id: 5, name: "Dapur Organik Sehat Mama", desc: "Menyediakan katering makanan sehat, rendah kalori, non-MSG, dan ramah diet.", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60", isPromo: true, promoBadge: "Diskon 20%", rating: 4.7, price: 35000, category: "makanan" },
  { id: 6, name: "Kedai Pizza Italia Wong Kito", desc: "Perpaduan pizza tipis kering khas Italia dengan toping kearifan lokal yang melimpah.", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60", isPromo: true, promoBadge: "Potongan Rp5rb", rating: 4.4, price: 45000, category: "makanan" },
  { id: 7, name: "Salad & Juice Bar Premium", desc: "Pilihan potongan buah segar dan sayur organik premium dengan dressing homemade istimewa.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60", isPromo: false, promoBadge: "", rating: 4.2, price: 26000, category: "cemilan" },
  { id: 8, name: "Boba Time Kekinian", desc: "Aneka minuman boba manis bertekstur kenyal dengan racikan susu segar berbagai varian rasa.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", isPromo: false, promoBadge: "", rating: 4.3, price: 18000, category: "minuman" },
  { id: 9, name: "Mie Ayam & Bakso Solo Mas Dino", desc: "Mie homemade kenyal dipadukan kuah kaldu sapi murni dan bakso urat super mantap.", img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60", isPromo: false, promoBadge: "", rating: 4.5, price: 17000, category: "makanan" },
  { id: 10, name: "Soto Lamongan Asli Cak Jono", desc: "Soto ayam kampung khas Jawa Timur bertabur koya udang gurih melimpah.", img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60", isPromo: false, promoBadge: "", rating: 4.6, price: 19000, category: "makanan" },
  { id: 11, name: "Burger Corner & Grill", desc: "Daging burger premium dipanggang sempurna dengan saus keju lumer dan sayur segar.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60", isPromo: false, promoBadge: "", rating: 4.7, price: 32000, category: "makanan" },
  { id: 12, name: "Iga Bakar Cobek Si Jangkung", desc: "Iga sapi tebal dibakar kecap harum dan disajikan di atas cobek tanah liat panas.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60", isPromo: false, promoBadge: "", rating: 4.9, price: 55000, category: "makanan" },
];

const DEFAULT_MENUS = {
  1: [
    { id: 101, name: "Ayam Bakar Madu", desc: "Ayam bakar dengan olesan madu murni manis gurih meresap.", likes: 124, priceOriginal: 30000, priceFinal: 25000, img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 102, name: "Ayam Goreng Lengkuas", desc: "Ayam goreng renyah bertabur kremesan lengkuas gurih.", likes: 85, priceOriginal: 28000, priceFinal: 24000, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 103, name: "Nasi Uduk Spesial", desc: "Nasi uduk gurih lengkap dengan telur balado dan orek tempe.", likes: 67, priceOriginal: 20000, priceFinal: 18000, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 104, name: "Tahu Tempe Bacem", desc: "Tahu dan tempe direbus dengan bumbu manis legit.", likes: 42, priceOriginal: 12000, priceFinal: 10000, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 105, name: "Es Teh Manis", desc: "Teh melati seduh murni segar dingin.", likes: 131, priceOriginal: 7000, priceFinal: 5000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 106, name: "Es Jeruk Peras", desc: "Perasan jeruk asli segar pelepas dahaga.", likes: 89, priceOriginal: 10000, priceFinal: 8000, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  2: [
    { id: 201, name: "Keripik Tempe Super", desc: "Keripik tempe renyah diiris tipis dengan racikan ketumbar asli.", likes: 250, priceOriginal: 20000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 202, name: "Pisang Lumer Cokelat", desc: "Pisang kepok balut kulit lumpia renyah isian cokelat.", likes: 195, priceOriginal: 18000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 203, name: "Keripik Singkong Balado", desc: "Singkong iris tipis bumbu balado pedas manis lengket.", likes: 142, priceOriginal: 15000, priceFinal: 12000, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 204, name: "Sale Pisang Kering", desc: "Sale pisang khas manis alami tanpa pengawet.", likes: 110, priceOriginal: 22000, priceFinal: 18000, img: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 205, name: "Wedang Jahe Instan", desc: "Serbuk jahe merah asli siap seduh untuk kehangatan tubuh.", likes: 88, priceOriginal: 25000, priceFinal: 20000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 206, name: "Kopi Susu Bubuk", desc: "Campuran kopi robusta dan krimer dalam kemasan pouch.", likes: 76, priceOriginal: 30000, priceFinal: 25000, img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  3: [
    { id: 301, name: "Kopi Susu Gula Aren", desc: "Espresso blend dicampur susu segar krimi dan sirup aren.", likes: 550, priceOriginal: 22000, priceFinal: 18000, img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 302, name: "Americano Dingin", desc: "Espresso murni dengan campuran air es pelepas ngantuk.", likes: 210, priceOriginal: 18000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 303, name: "Matcha Latte", desc: "Teh hijau jepang premium dikocok dengan susu.", likes: 320, priceOriginal: 25000, priceFinal: 20000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 304, name: "Roti Bakar Cokelat Keju", desc: "Roti tawar tebal bakar dengan taburan cokelat keju melimpah.", likes: 430, priceOriginal: 20000, priceFinal: 16000, img: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 305, name: "Pisang Goreng Keju", desc: "Pisang tanduk goreng renyah disiram kental manis dan keju.", likes: 310, priceOriginal: 18000, priceFinal: 14000, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 306, name: "Kentang Goreng Sosis", desc: "Platter kentang goreng dan sosis mini bumbu keju.", likes: 280, priceOriginal: 25000, priceFinal: 20000, img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=500&q=60", category: "makanan" },
  ],
  4: [
    { id: 401, name: "Nasi Goreng Sate Kambing", desc: "Nasi goreng rempah disajikan bersama tusukan sate empuk.", likes: 375, priceOriginal: 50000, priceFinal: 40000, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 402, name: "Sate Ayam Madura", desc: "Sate ayam daging tebal bumbu kacang gurih legendaris.", likes: 420, priceOriginal: 30000, priceFinal: 28000, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 403, name: "Sate Kambing Muda", desc: "Sate kambing pilihan dihidangkan dengan kecap merica.", likes: 315, priceOriginal: 45000, priceFinal: 40000, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 404, name: "Gule Kambing", desc: "Kuah santan kaya rempah dengan irisan daging kambing empuk.", likes: 290, priceOriginal: 35000, priceFinal: 30000, img: "https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 405, name: "Es Teh Manis", desc: "Es teh murni klasik penghilang penat.", likes: 150, priceOriginal: 8000, priceFinal: 5000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 406, name: "Es Jeruk Nipis", desc: "Jeruk nipis asli, manis asam segar.", likes: 130, priceOriginal: 10000, priceFinal: 8000, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  5: [
    { id: 501, name: "Salad Dada Ayam", desc: "Salad sayur organik dengan potongan dada ayam rebus protein tinggi.", likes: 215, priceOriginal: 45000, priceFinal: 35000, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 502, name: "Gado-Gado Siram Sehat", desc: "Rebusan sayur lengkap siram bumbu kacang mede ringan.", likes: 180, priceOriginal: 30000, priceFinal: 25000, img: "https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 503, name: "Nasi Merah Salmon Bakar", desc: "Karbohidrat kompleks dan lemak baik disajikan selaras.", likes: 320, priceOriginal: 65000, priceFinal: 55000, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 504, name: "Smoothie Bowl Berry", desc: "Campuran beri di-blend beku dengan taburan chia seeds.", likes: 265, priceOriginal: 40000, priceFinal: 35000, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 505, name: "Jus Detox ABC", desc: "Campuran Apel, Bit, dan Carrot segar perasan dingin.", likes: 145, priceOriginal: 25000, priceFinal: 20000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 506, name: "Infused Water Lemon Mint", desc: "Air murni dengan rendaman buah segar alami tanpa gula.", likes: 90, priceOriginal: 15000, priceFinal: 10000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  6: [
    { id: 601, name: "Pizza Meat Lover", desc: "Pizza kerak tipis dengan sosis, daging cincang, dan mozzarella.", likes: 450, priceOriginal: 65000, priceFinal: 50000, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 602, name: "Pizza Margherita", desc: "Klasik italia dengan saus tomat segar, basil, dan keju murni.", likes: 380, priceOriginal: 50000, priceFinal: 40000, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 603, name: "Spaghetti Bolognese", desc: "Pasta al dente disiram saus daging cincang lezat gurih.", likes: 410, priceOriginal: 35000, priceFinal: 30000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 604, name: "Garlic Bread Cheese", desc: "Roti perancis panggang mentega bawang putih bertabur keju.", likes: 290, priceOriginal: 25000, priceFinal: 20000, img: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 605, name: "Cola Float", desc: "Minuman cola dingin diberi topping es krim vanilla lembut.", likes: 160, priceOriginal: 18000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 606, name: "Lemon Tea Es", desc: "Teh lemon dingin segar ala restoran.", likes: 140, priceOriginal: 12000, priceFinal: 10000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  7: [
    { id: 701, name: "Salad Buah Premium", desc: "Potongan buah musiman dengan dressing yogurt manis keju.", likes: 280, priceOriginal: 30000, priceFinal: 26000, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60", category: "cemilan" },
    { id: 702, name: "Rujak Sayur Asin", desc: "Buah dan sayur dengan cocolan bumbu rujak pedas legit.", likes: 195, priceOriginal: 20000, priceFinal: 18000, img: "https://images.unsplash.com/photo-1621510456681-23a23cfb5f57?auto=format&fit=crop&w=500&q=60", category: "cemilan" },
    { id: 703, name: "Jus Alpukat Cokelat", desc: "Alpukat kental diblend dengan pemanis susu cokelat.", likes: 310, priceOriginal: 20000, priceFinal: 18000, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 704, name: "Jus Mangga Manis", desc: "Mangga harum manis asli diblend segar.", likes: 240, priceOriginal: 18000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 705, name: "Jus Buah Naga", desc: "Warna ungu merona, kaya antioksidan segar dingin.", likes: 180, priceOriginal: 18000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 706, name: "Es Kelapa Jeruk", desc: "Air kelapa muda dipadu perasan jeruk manis.", likes: 160, priceOriginal: 15000, priceFinal: 12000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  8: [
    { id: 801, name: "Brown Sugar Boba Milk", desc: "Susu segar disiram karamel aren lumer dan boba kenyal.", likes: 450, priceOriginal: 22000, priceFinal: 18000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 802, name: "Taro Milk Tea", desc: "Teh susu rasa taro wangi dengan boba hitam manis.", likes: 320, priceOriginal: 20000, priceFinal: 16000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 803, name: "Matcha Boba Float", desc: "Teh hijau jepang dengan boba dan es krim.", likes: 380, priceOriginal: 25000, priceFinal: 22000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 804, name: "Thai Tea Ori", desc: "Teh khas thailand orange pekat manis dingin.", likes: 290, priceOriginal: 15000, priceFinal: 12000, img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 805, name: "Corndog Mozzarella", desc: "Sosis balut adonan dengan keju mulur renyah di luar.", likes: 410, priceOriginal: 20000, priceFinal: 16000, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 806, name: "Kentang Goreng Keju", desc: "Snack kentang renyah tabur bubuk keju asin.", likes: 250, priceOriginal: 18000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=500&q=60", category: "makanan" },
  ],
  9: [
    { id: 901, name: "Mie Ayam Pangsit", desc: "Mie kuning kenyal dengan ayam kecap dan pangsit rebus.", likes: 320, priceOriginal: 18000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 902, name: "Mie Ayam Bakso Urat", desc: "Mie ayam komplit tambah dua butir bakso urat sapi.", likes: 450, priceOriginal: 25000, priceFinal: 22000, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 903, name: "Bakso Super Pedas", desc: "Semangkuk bakso kuah kaldu siram sambal ulek setan.", likes: 380, priceOriginal: 22000, priceFinal: 18000, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 904, name: "Bakso Telur Asin", desc: "Bakso beranak isi telur asin gurih nikmat.", likes: 290, priceOriginal: 25000, priceFinal: 22000, img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 905, name: "Es Kampul Solo", desc: "Es teh khas solo dengan irisan jeruk peras meresap.", likes: 190, priceOriginal: 8000, priceFinal: 6000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 906, name: "Es Jeruk Manis", desc: "Perasan jeruk asli penghilang dahaga ekstra es.", likes: 140, priceOriginal: 10000, priceFinal: 8000, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  10: [
    { id: 1001, name: "Soto Ayam Koya", desc: "Kuah kuning segar bertabur koya udang dan suwiran ayam.", likes: 450, priceOriginal: 20000, priceFinal: 18000, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1002, name: "Soto Daging Sapi", desc: "Soto kuah bening dengan daging sapi empuk melimpah.", likes: 380, priceOriginal: 28000, priceFinal: 25000, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1003, name: "Nasi Putih", desc: "Nasi putih pulen hangat dibungkus rapi.", likes: 120, priceOriginal: 6000, priceFinal: 5000, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1004, name: "Kerupuk Udang", desc: "Pelengkap soto renyah gurih ukuran besar.", likes: 210, priceOriginal: 5000, priceFinal: 4000, img: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1005, name: "Es Teh Jumbo", desc: "Es teh ukuran gelas besar puaskan dahaga.", likes: 160, priceOriginal: 8000, priceFinal: 6000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 1006, name: "Es Jeruk Nipis", desc: "Jeruk nipis asam segar bikin melek.", likes: 110, priceOriginal: 10000, priceFinal: 8000, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  11: [
    { id: 1101, name: "Beef Burger Classic", desc: "Patty sapi panggang, selada, tomat, saus rahasia dalam bun empuk.", likes: 340, priceOriginal: 35000, priceFinal: 30000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1102, name: "Double Cheese Burger", desc: "Dua lapis keju cheddar meleleh di atas daging premium.", likes: 420, priceOriginal: 45000, priceFinal: 40000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1103, name: "Chicken Crispy Burger", desc: "Ayam krispi gurih dengan mayo khas lezat.", likes: 280, priceOriginal: 30000, priceFinal: 25000, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1104, name: "French Fries Medium", desc: "Kentang goreng gurih asin potongan memanjang.", likes: 210, priceOriginal: 18000, priceFinal: 15000, img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1105, name: "Cola Jumbo", desc: "Minuman soda cola menyegarkan gelas besar.", likes: 150, priceOriginal: 12000, priceFinal: 10000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 1106, name: "Chocolate Milkshake", desc: "Susu kocok cokelat kental manis krim lembut.", likes: 190, priceOriginal: 20000, priceFinal: 16000, img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
  12: [
    { id: 1201, name: "Iga Bakar Kecap Hot", desc: "Iga tebal bakar bumbu kecap pedas disajikan di cobek panas.", likes: 520, priceOriginal: 60000, priceFinal: 55000, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1202, name: "Iga Bakar Madu", desc: "Iga bakar balut bumbu madu legit tak pedas ramah anak.", likes: 480, priceOriginal: 60000, priceFinal: 55000, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1203, name: "Sup Iga Kuah Bening", desc: "Sup hangat daging iga lepas tulang lengkap dengan wortel.", likes: 310, priceOriginal: 50000, priceFinal: 45000, img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1204, name: "Nasi Putih Spesial", desc: "Nasi pulen pas teman makan iga cobek.", likes: 190, priceOriginal: 7000, priceFinal: 6000, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60", category: "makanan" },
    { id: 1205, name: "Es Jeruk Manis", desc: "Penghilang rasa gurih di lidah penutup iga nikmat.", likes: 160, priceOriginal: 12000, priceFinal: 10000, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60", category: "minuman" },
    { id: 1206, name: "Es Teh Tawar", desc: "Teh seduh dingin tanpa pemanis segar.", likes: 90, priceOriginal: 6000, priceFinal: 4000, img: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=500&q=60", category: "minuman" },
  ],
};

const DEFAULT_GENERIC_MENU = [
  { id: 9991, name: "Paket Nasi Kuning Lengkap", desc: "Nasi kuning dengan ayam goreng, telur dadar iris, kering tempe, dan sambal.", likes: 45, priceOriginal: 35000, priceFinal: 25000, img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=60", category: "makanan" },
  { id: 9992, name: "Ayam Goreng Mentega", desc: "Ayam goreng gurih dengan siraman saus mentega yang meresap sempurna.", likes: 38, priceOriginal: 40000, priceFinal: 32000, img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=60", category: "makanan" },
];

function seedSharedData() {
  const savedTenants = localStorage.getItem("tenants");
  if (!savedTenants || JSON.parse(savedTenants).length === 0) {
    localStorage.setItem("tenants", JSON.stringify(DEFAULT_TENANTS));
  }
  if (!localStorage.getItem("tenantMenusData")) {
    localStorage.setItem("tenantMenusData", JSON.stringify(DEFAULT_MENUS));
  }
}

function getTenants() {
  seedSharedData();
  return JSON.parse(localStorage.getItem("tenants")) || [];
}

function saveTenants(tenantsArr) {
  localStorage.setItem("tenants", JSON.stringify(tenantsArr));
}

function getMenus() {
  seedSharedData();
  return JSON.parse(localStorage.getItem("tenantMenusData")) || {};
}

function saveMenus(menusObj) {
  localStorage.setItem("tenantMenusData", JSON.stringify(menusObj));
}

function getTenantById(id) {
  return getTenants().find((t) => t.id === Number(id));
}

function getNextTenantId() {
  const tenants = getTenants();
  return tenants.length ? Math.max(...tenants.map((t) => t.id)) + 1 : 1;
}

function getNextMenuId(tenantId) {
  const menus = getMenus();
  const list = menus[tenantId] || [];
  if (list.length) return Math.max(...list.map((m) => m.id)) + 1;
  return Number(tenantId) * 100 + 1;
}

function getTotalProdukCount() {
  const menus = getMenus();
  return Object.values(menus).reduce((sum, list) => sum + list.length, 0);
}

seedSharedData();
