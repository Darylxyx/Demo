import './main.css';
import $ from 'jquery';

var pageIndex = 0;
const $pageArr = $('.page');

$('body').on('click', () => {
	pageIndex ++;
	if (pageIndex > 3) {
		pageIndex = 0;
	}
	$pageArr.hide();
	$pageArr.eq(pageIndex).show();
});
