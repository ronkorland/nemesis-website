/**
 * Created by Ron on 17/03/14.
 */
'use strict';

reportsApp.directive('showOnRowHover', function () {
    return {
        link: function (scope, element, attrs) {

            element.closest('tr').bind('mouseenter', function () {
                element.show();
            });
            element.closest('tr').bind('mouseleave', function () {
                element.hide();

                var contextmenu = element.find('#contextmenu');
                contextmenu.click();

                element.parent().removeClass('open');

            });

        }
    };
});