import { Dimensions } from "react-native";
const {width,height} = Dimensions.get('screen');

export const COLORS = {
	primary : "#00BA87",
	primaryLight : "#D0E5F2",
	secondary : "#090A15",
	success : "#0ecb81",
	danger  : "#ff4a5c",
	info  : "#627EEA",
	warning : "#ffb02c",
	yellow  : "#fff346",
	white : "#fff",
	dark : "#2f2f2f",
  	light : "#E6E6E6",

	// light
	title : "#20212D",
	text : "#909090",
	background : "#FCFBFC",
	card : "#fff",
	border : "#eee",
	
	// dark 
	darkTitle : "#fff",
	darkText : "rgba(255,255,255,.6)",
	darkBackground : "#080912",
	darkCard : "#161724",
	darkBorder : "#252739",

}

export const SIZES = {
    font:14,
	fontSm:13,
	fontXs:12,
    radius:10,
	radius_lg:20,
	radius_sm : 6,

	//space
	padding:15,
	margin:15,

    //Font Sizes
    h1:40,
    h2:28,
    h3:24,
    h4:20,
    h5:18,
	h6:16,

    //App dimensions
    width,
    height,
	contentArea:{
		paddingTop:70,
		paddingBottom:150,
	}
};
export const FONTS = {
    font   : {fontSize:SIZES.font, lineHeight:20,fontFamily:'Poppins-Regular'},
	fontSm : {fontSize:SIZES.fontSm, lineHeight:18,fontFamily:'Poppins-Regular'},
	fontXs : {fontSize:SIZES.fontXs, lineHeight:14,fontFamily:'Poppins-Regular'},
    h1     : {fontSize:SIZES.h1, lineHeight:48, color:COLORS.title, fontFamily:'Poppins-SemiBold'},
    h2     : {fontSize:SIZES.h2, lineHeight:34, color:COLORS.title, fontFamily:'Poppins-SemiBold'},
    h3     : {fontSize:SIZES.h3, lineHeight:28, color:COLORS.title,fontFamily:'Poppins-SemiBold'},
    h4     : {fontSize:SIZES.h4, lineHeight:26, color:COLORS.title, fontFamily:'Poppins-SemiBold'},
    h5     : {fontSize:SIZES.h5, lineHeight:24, color:COLORS.title, fontFamily:'Poppins-SemiBold'},
    h6     : {fontSize:SIZES.h6, lineHeight:20, color:COLORS.title, fontFamily:'Poppins-SemiBold'},

	fontMedium : {fontFamily:'Poppins-Medium'},
	fontBold : {fontFamily:'Poppins-SemiBold'},
}

export const INTRO = {
	first: require('../assets/images/intro/first.png'),
	second: require('../assets/images/intro/second.png'),
	third: require('../assets/images/intro/third.png'),
}

export const IMAGES = {
	pic1 : require('../assets/images/pic1.png'),
	pic2 : require('../assets/images/pic2.png'),
	bg1 : require('../assets/images/background/bg1.png'),
	logoFullWhite : require('../assets/images/logo-full-white.png'),
	bitcoin : require('../assets/images/coins/bitcoin.png'),
	ethereum : require('../assets/images/coins/eth.png'),
	ripple : require('../assets/images/coins/mer.png'),
	dash : require('../assets/images/coins/dash.png'),
	nem : require('../assets/images/coins/nem.png'),
	emc : require('../assets/images/coins/emc.png'),
	etp : require('../assets/images/coins/etp.png'),
	flux : require('../assets/images/coins/flux.png'),
	gdb : require('../assets/images/coins/gdb.png'),
	cdn : require('../assets/images/coins/cdn.png'),
	lun : require('../assets/images/coins/lun.png'),
	qrCode : require('../assets/images/qrCode.png'),
	visa : require('../assets/images/visa.png'),
	event1 : require('../assets/images/event/pic1.png'),
	event2 : require('../assets/images/event/pic2.png'),
	event3 : require('../assets/images/event/pic3.png'),
	logoIcon : require('../assets/images/logo-icon.png'),
	tether : require('../assets/images/tether.png'),
}

export const ICONS = {
	google : require('../assets/images/icons/google.png'),
	facebook : require('../assets/images/icons/facebook.png'),
	whatsapp : require('../assets/images/icons/whatsapp.png'),
	instagram : require('../assets/images/icons/instagram.png'),
	twitter : require('../assets/images/icons/twitter.png'),
	home : require('../assets/images/icons/home.png'),
	wallet : require('../assets/images/icons/wallet.png'),
	profile : require('../assets/images/icons/profile.png'),
	colorswatch : require('../assets/images/icons/colorswatch.png'),
	trade : require('../assets/images/icons/trade.png'),
	grid : require('../assets/images/icons/grid.png'),
	setting : require('../assets/images/icons/setting.png'),
	logout : require('../assets/images/icons/logout.png'),
	sun : require('../assets/images/icons/sun.png'),
	moon : require('../assets/images/icons/moon.png'),
	bell : require('../assets/images/icons/bell.png'),
	wallet2 : require('../assets/images/icons/wallet2.png'),
	chart : require('../assets/images/icons/chart.png'),
	trophy : require('../assets/images/icons/trophy.png'),
	withdrawal : require('../assets/images/icons/withdrawal.png'),
	transfer : require('../assets/images/icons/transfer.png'),
	delete : require('../assets/images/icons/delete.png'),
	qr : require('../assets/images/icons/qr.png'),
	copy : require('../assets/images/icons/copy.png'),
	cryptowallet : require('../assets/images/icons/cryptowallet.png'),
	cashwallet : require('../assets/images/icons/cashwallet.png'),
	card : require('../assets/images/icons/card.png'),
	bank : require('../assets/images/icons/bank.png'),
	info : require('../assets/images/icons/info.png'),
	check : require('../assets/images/icons/check.png'),
	verified : require('../assets/images/icons/verified.png'),
	history : require('../assets/images/icons/history.png'),
	support : require('../assets/images/icons/support.png'),
	badge : require('../assets/images/icons/badge.png'),
	doubts : require('../assets/images/icons/doubts.png'),
	email : require('../assets/images/icons/email.png'),
	lock : require('../assets/images/icons/lock.png'),
	phone : require('../assets/images/icons/phone.png'),
	payment : require('../assets/images/icons/payment.png'),
	document : require('../assets/images/icons/document.png'),
	windows : require('../assets/images/icons/windows.png'),
	chrome : require('../assets/images/icons/chrome.png'),
	firefox : require('../assets/images/icons/firefox.png'),
	microsoft : require('../assets/images/icons/microsoft.png'),
	minus : require('../assets/images/icons/minus.png'),
	plus : require('../assets/images/icons/plus.png'),
	csv : require('../assets/images/icons/csv.png'),
	xlsx : require('../assets/images/icons/xlsx.png'),
	pdf : require('../assets/images/icons/pdf.png'),
	arrowUp : require('../assets/images/icons/up-arrow.png'),
	arrowDown : require('../assets/images/icons/down-arrow.png'),
	attachment : require('../assets/images/icons/attachment.png'),
	send : require('../assets/images/icons/send.png'),
	customer : require('../assets/images/icons/customer.png'),
	dollor : require('../assets/images/icons/dollor.png'),
	mail : require('../assets/images/icons/mail.png'),
	thumbsUp : require('../assets/images/icons/thumbs-up.png'),
}

export const WELCOMEIMAGES = {
	first: require('../assets/images/welcome/first.png'),
	second: require('../assets/images/welcome/second.png'),
}

const appTheme = {COLORS, SIZES, FONTS, IMAGES, ICONS, INTRO, WELCOMEIMAGES}

export default appTheme;