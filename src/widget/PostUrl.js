//let http = 'http://192.168.2.159/zg_crm/'
let http = 'http://192.168.2.182/zg_crm/'
// let http = 'http://192.168.1.152/zg_crm/'
// let http = 'http://111.230.140.245:1212/zg_crm/';

const PostUrl = {
    userId: '',
    signCode: 'zgcrm_00001',
    tokenVal: '5555555',
    storId: '1',
    subUserList: null,

    createCustomUrl: http + 'index.php/Home/Custom/create_custom',
    getCustomsJsonUrl: http + 'index.php/Home/Custom/getCustomsList',
    getCustomsInfoJsonUrl: http + 'index.php/Home/Custom/getCustomsInfo',
    editCustomInfoUrl: http + 'index.php/Home/Custom/editCustomInfo',
    createChancesJsonUrl : http + 'index.php/Home/Chances/create_chances',
    createTasksJsonUrl : http + 'index.php/Home/Tasks/create_task',
    createOrderUrl: http + 'index.php/Home/Orders/create_order',
    createFollowUrl: http + 'index.php/Home/FollowsLog/create_followlog',
    createLogUrl: http + 'index.php/Home/Logs/create_log',
    getOrderListsJsonUrl: http + 'index.php/Home/Orders/getOrderLists',
    getOrderListInfoUrl: http + 'index.php/Home/Orders/getOrderListInfo',
    getOrderListEditUrl: http + 'index.php/Home/Orders/editOrderList',
    getReturnListsUrl: http + 'index.php/Home/Orders/getReturn',
    getReturnUrl: http + 'index.php/Home/Orders/getReturnOne',
    editReturnUrl: http + 'index.php/Home/Orders/editReturn',
    getLogJsonUrl : http + 'index.php/Home/Logs/get_logs',
    getTaskJsonUrl : http + 'index.php/Home/Tasks/get_tasks',
    editLogInfoUrl: http + 'index.php/Home/Logs/edit_log_Info',
    getTaskInfoJsonUrl: http + 'index.php/Home/Tasks/get_one_task',
    editTasksJsonUrl : http + 'index.php/Home/Tasks/edit_task',
    getLogInfoJsonUrl: http + 'index.php/Home/Logs/get_one_log',
    getFollowInfoJsonUrl: http + 'index.php/Home/FollowsLog/get_one_follows',
    deleteLogJsonUrl: http + 'index.php/Home/Logs/delete_log',
    deleteFollowJsonUrl: http + 'index.php/Home/FollowsLog/delete_follows_log',
    deleteTasksJsonUrl : http + 'index.php/Home/Tasks/delete_task',
    getFollowLogListJsonUrl : http + 'index.php/Home/FollowsLog/get_follows_log',
    deleteChanceUrl : http + 'index.php/Home/Chances/delete_chance',
    getChanceJsonUrl : http + 'index.php/Home/Chances/get_chance',
    EditChanceUrl: http + 'index.php/Home/Chances/edit_chance',
    getChanceInfoJsonUrl: http + 'index.php/Home/Chances/get_one_chance',
    EditFollowUrl: http + 'index.php/Home/FollowsLog/edit_follow_log',
    SureReturnUrl: http + 'index.php/Home/Orders/sureReturn',

    getUsersListsJsonUrl: http + 'index.php/Home/User/getUsersListsJson',
    getReportJsonUrl: http + 'index.php/Home/Orders/getReportJson',

    LoginJsonUrl: http + 'index.php/Home/User/login',
    getUsersJson: http + 'index.php/Home/User/getUsers',
    changePassJson: http + 'index.php/Home/User/changPass',

    getWelfareUrl: http + 'index.php/Home/Welfare/getwelfare',
};


export default PostUrl;