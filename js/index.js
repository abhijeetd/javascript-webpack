//CSS
require("../css/main.css")
require("../css/dashboard/networkanamolies.css")
require("../libs/css/jquery.datepicker.css")
require("../node_modules/timepicker/jquery.timepicker.css")
require("../node_modules/billboard.js/dist/billboard.css")
require("../node_modules/billboard.js/dist/billboard.min.css")

// Libraries
require("expose-loader?window.$!expose-loader?$!expose-loader?jQuery!../node_modules/jquery/dist/jquery.min")
require("../libs/JS/jquery.jqGrid.min")
require("script-loader!../libs/JS/jquery-ui")
require("script-loader!../node_modules/timepicker/jquery.timepicker")
require("script-loader!../node_modules/billboard.js/dist/billboard")

// Source code. 
require("script-loader!./dashboard/networkanamolies/app")
require("script-loader!./dashboard/utility")
require("script-loader!./dashboard/networkanamolies/duration")
require("script-loader!./dashboard/networkanamolies/totalMessageCount")
require("script-loader!./dashboard/networkanamolies/failedMessagesList_Graph")
require("script-loader!./dashboard/networkanamolies/failedMessagesList")

