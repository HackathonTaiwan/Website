
// speaker images
var jserv = require('Source/images/speakers/jserv.jpg');
var pcman = require('Source/images/speakers/pcman.png');
var hcchien = require('Source/images/speakers/hcchien.png');
var benjai = require('Source/images/speakers/benjai.jpg');
var pitchchen = require('Source/images/speakers/pitchchen.jpg');
var vickichiu = require('Source/images/speakers/vickichiu.jpg');
var diro = require('Source/images/speakers/diro.jpg');
var leonlin = require('Source/images/speakers/leonlin.jpg');
var jack = require('Source/images/speakers/jack.jpg');
var jollen = require('Source/images/speakers/jollen.jpg');
var ponli = require('Source/images/speakers/ponli.jpg');
var alexlau = require('Source/images/speakers/alexlau.jpg');
var jeremylu = require('Source/images/speakers/jeremylu.jpg');
var simonsun = require('Source/images/speakers/simonsun.jpg');
var dca = require('Source/images/speakers/dca.jpg');
var smlsun = require('Source/images/speakers/smlsun.jpg');
var threeDwang = require('Source/images/speakers/3dwang.jpg');
var threeDtseng = require('Source/images/speakers/3dtseng.jpg');
var fredchien = require('Source/images/speakers/fredchien.jpg');
var arklabchuang = require('Source/images/speakers/arklabchuang.jpg');
var sungheng = require('Source/images/speakers/sungheng.jpg');
var imacat = require('Source/images/speakers/imacat.jpg');

export default function *() {
	var store = this.getState('Speakers', {
		speakers: [
			{
				'nameCn': '黃敬群(Jserv)',
				'nameEn': 'Jim Huang',
				'introduce': '南星創速器 (SSX) / 技術長，無大學學歷，但目前是成功大學、交通大學資訊工程系兼任教師，並在聯發科技、工研院資通所，台達電子等單位擔任技術顧問。',
				'img': jserv
			},
			{
				'nameCn': '洪任諭',
				'nameEn': 'PC Man',
				'introduce': '知名 PCMAN BBS 連線程式原始作者，LXDE 計畫發起人，新酷音輸入法 WINDOWS 版本維護者。原內科住院醫師，現脫下白袍去台大資工研究所唸書，全心投入程式。',
				'img': pcman
			},
			{
				'nameCn': '簡信昌',
				'nameEn': 'H.C Chien',
				'introduce': '台灣開放源碼開發者研討會 OSDC.TW 創辦人，超過十年以上的 OPEN SOURCE 社群推廣經驗，將程式設計視為藝術創作的開源人，曾任職於 YAHOO!，現活躍於 G0V 社群。',
				'img': hcchien
			},
			{
				'nameCn': '翟本喬',
				'nameEn': 'Ben Jai',
				'introduce': '和沛科技 CEO，台大數學系、紐約大學電腦科學系博士，曾擔任貝爾實驗室研究員、史坦普及美林證券顧問、紐約大學講師、GOOGLE 平台架構工程師、台達電雲端技術處資深處長。',
				'img': benjai
			},
			{
				'nameCn': '伊瑪貓',
				'nameEn': 'Imacat',
				'introduce': '熱衷於女權運動，積極推動女性參與技術社群，是台灣女性 IT 社群的主要推手，為 WoFOSS 台灣女子自由軟體工作小組成員、PyLadies Taiwan 成員與同志家庭權益促進會成員。也是資深 Hacker 和自由軟體開發者，目前為 OpenOffice 開發管理團隊成員，更參與 EducOOo/OOo4Kids 和 Greenfoot 台灣社群，日前也協助籌劃 Ignite 2015 國際女子黑客松活動，讓台灣的女性開發者與全球高手交流。',
				'img': imacat
			},
			{
				'nameCn': '陳碧芬',
				'nameEn': 'Cristina Chen',
				'introduce': '淡江大學國際研究學院博士．中歐國際工商學院資深財經記者MBA課程，中央大學經濟系兼任助理教授、工商時報金融理財新聞中心副主任．主要研究領域為ICT全球變遷，科技創新創業，歐洲科技產業政策。',
				'img': pitchchen
			},
			{
				'nameCn': '邱于芸',
				'nameEn': 'Vicki Chiu',
				'introduce': '現任文化部次長、國立臺北科技大學文化事業發展系助理教授，曾任國立政治大學商學院與傳播學院助理教授，為卡市達創業加油站、政大公企中心創立方創辦人，過去於英國劍橋唸書並教書多年，為英國劍橋大學東亞系博士。',
				'img': vickichiu
			},
			{
				'nameCn': '林為志',
				'nameEn': 'Leon Lin',
				'introduce': '會寫程式的畫家、藝術家及設計師，擅長 UI/UX 、平面、攝影及藝術創作與賞析，除了油畫創作外，也擅長Web相關的開發技術。熟悉的程式技術以 WEB FULLSTACK 為主，也擅長 QML 使用者界面的相關開發。',
				'img': leonlin
			},
			{
				'nameCn': '錢逢祥',
				'nameEn': 'Fred Chien',
				'introduce': 'HANGEE 國民機發起人，AVENGERGEAR 公司核心創辦人，也是 LXDE 核心開發者之一，多年致力推廣開放原始碼。擅長 LINUX BSP、嵌入式系統、軟硬整合及 WEB 前後端等領域，近年來投入 NODE.JS，致力於開發 JAVASCRIPT 硬體整合及物聯網（IOT）相關技術。',
				'img': fredchien
			},
			{
				'nameCn': '劉俊賢',
				'nameEn': 'Alex Lau',
				'introduce': '外商 SYMBIO 技術長、AVENGERGEAR 執行長，為 LINUX 技術早期在中國的先驅推廣者，曾擔任北京 NOVELL 技術經理、香港即時有限公司 R&D 技術總監，於美國 NORTEL NETWORK 負責軟體分析及研發的工作。',
				'img': alexlau
			},
			{
				'nameCn': '陳俊宏',
				'nameEn': 'Jollen Chen',
				'introduce': 'MOKO365 與 MOKOVERSITY 創辦人，資深的嵌入式 LINUX 、ANDROID 專家與知名講師，擁有豐富的顧問與教育訓練經驗。現投入 ARM MBED 與物聯網（IOT）推廣與發展。',
				'img': jollen
			},
			{
				'nameCn': '沈胖立',
				'nameEn': '',
				'introduce': '創客電台創辦人，致力於分享開源的軟硬體整合技術（ARDUINO、3D PRINTER 等），喚醒台灣人對玩具自造，玩具設計的熱愛，於第三次工業革命重新喚醒沉睡的玩具王國-台灣。',
				'img': ponli
			},
			{
				'nameCn': '',
				'nameEn': 'Jack Yang',
				'introduce': '任職於網路攝影機大廠 VIVOTEK 晶睿通訊股份有限公司，資深軟體工程師，為 QT 、嵌入式系統及軟硬體整合專家，擅長解決 QT 相關疑難雜症。',
				'img': jack
			},
			{
				'nameCn': '',
				'nameEn': 'Jeremy Lu',
				'introduce': '旅美工作多年，LOVELYREADER, PUBULOUS, VISUALMARKS, DOCKNOTE 等公司創辦人，十五年教學經驗，曾擔任資策會、恆逸講師，為數千家企業客戶提供教育訓練服務，為國內 REACT.JS 與 FULLSTACK 重要推手。',
				'img': jeremylu
			},
			{
				'nameCn': '孫豪佑',
				'nameEn': 'Simon Sun',
				'introduce': '現為 NODE.JS PARTY 主辦人，JSDC 2015 活動總招，推廣 JAVASCRIPT 與 NODE.JS 不遺餘力，曾任職於 FANDORA，擅長 NODE.JS 後端應用程式開發。',
				'img': simonsun
			},
			{
				'nameCn': '',
				'nameEn': 'Dca Hsu',
				'introduce': 'NODESCHOOL 台灣區管理員之一，也是 JSDC 2015 籌辦團隊成員及 NODE.JS TAIWAN 社群活耀者，擅長 JAVASCRIPT 與 NODE.JS 後端應用程式相關開發。',
				'img': dca
			},
			{
				'nameCn': '謝宗穎',
				'nameEn': 'Smlsun Xie',
				'introduce': 'HIIIR 時間軸 主任工程師，WEB FULL STACK 開發者，軟體自動化測試專家，熟知大型軟體開發過程及團隊控管，善於開發流程改善。平時也樂於與社群交流和分享經驗，協助更多人改善自家產品開發流程。',
				'img': smlsun
			},
			{
				'nameCn': '王振宇',
				'nameEn': 'Dennis Wang',
				'introduce': '電腦輔助製圖備取國手，大中華區AUTODESK競賽國內備取選手，為工程圖製圖專家。目前為北科大數位設計與製造研究社社長，擅長繪機構圖及 3D 建模、3D 印表機，與北科大3D實驗室長期合作。',
				'img': threeDwang
			},
			{
				'nameCn': '曾孟凡',
				'nameEn': 'Eddie Tseng',
				'introduce': '主修機械熱流工程，目前在交大APPL研究室擔任研究生。大中華區AUTODESK競賽國內備取選手，為工程圖製圖專家，現任北科大數位設計與製造研究社副社長，擅長機構設計、繪圖、 3D 建模及 3D 印表機，與北科大3D實驗室長期合作。',
				'img': threeDtseng
			},
			{
				'nameCn': '范姜士武',
				'nameEn': 'Diro',
				'introduce': '網路攝影機大廠 VIVOTEK 晶睿通訊股份有限公司的 TECHNICAL DEPUTY MANAGER，QT@TAIWAN 社群核心推廣者，為 LINUX 嵌入式系統、軟硬體整合及 QT 領域的專家。',
				'img': diro
			},
			{
				'nameCn': '張東琳',
				'nameEn': 'Chuang',
				'introduce': 'ARKLAB 多旋翼工坊創辦人，致力於發展與推廣開放原始碼的多旋翼，與其各種面向運用，力圖將開源無人飛行器的技術門檻大幅降低，並能夠更貼近我們的生活中。以開源的天空為理念，在多個大型活動如 MAKER FAIRE 2015、COSCUP 上進行分享及籌辦競賽。',
				'img': arklabchuang
			},
			{
				'nameCn': '宋恆',
				'nameEn': 'Sung Heng',
				'introduce': '梅林鬍子實驗室 MERLINS MUSTACHE LAB 所長，從 2006 年開始，致力於互動設計與新媒體藝術創作。曾受邀展演於台北數位藝術節、北京夏日數字娛樂節、高雄國際貨櫃藝術節、404 FESTIVAL、巴西FILE PRIX LUX 以及阿根廷TSONAMI BUENOS AIRES 國際聲響藝術節、超旅程–2012 未來媒體藝術節、荷蘭TODAYSART FESTIVAL 等國內外具指標性之重要藝術活動。',
				'img': sungheng
			}
		]
	});
};
