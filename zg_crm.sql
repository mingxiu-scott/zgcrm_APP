/*
Navicat MySQL Data Transfer

Source Server         : 111.230.140.245
Source Server Version : 50556
Source Host           : 111.230.140.245:3306
Source Database       : zg_crm

Target Server Type    : MYSQL
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-01-12 10:17:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for crm_chances
-- ----------------------------
DROP TABLE IF EXISTS `crm_chances`;
CREATE TABLE `crm_chances` (
  `ch_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '机会表ID',
  `c_id` int(11) NOT NULL COMMENT '客户ID',
  `u_id` int(11) NOT NULL COMMENT '用户ID',
  `c_name` varchar(20) NOT NULL COMMENT '客户姓名',
  `ch_date` date NOT NULL COMMENT '预期日期',
  `ch_money` decimal(11,2) NOT NULL COMMENT '预期金额',
  `ch_desc` varchar(200) DEFAULT NULL COMMENT '备注',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `ch_name` varchar(20) NOT NULL COMMENT '机会名称',
  PRIMARY KEY (`ch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_chances
-- ----------------------------
INSERT INTO `crm_chances` VALUES ('1', '5', '1', '李四', '2017-12-25', '1000.00', '我就知道这个客户很肥', '2017-12-25 10:31:59', '这个货100万');
INSERT INTO `crm_chances` VALUES ('2', '0', '1', '客户姓名', '2018-01-05', '100.00', 'afddsafdsf', '2018-01-05 08:52:25', '天通银y');

-- ----------------------------
-- Table structure for crm_customs
-- ----------------------------
DROP TABLE IF EXISTS `crm_customs`;
CREATE TABLE `crm_customs` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(20) NOT NULL COMMENT '客户名称',
  `c_sex` varchar(2) NOT NULL DEFAULT '男' COMMENT '1：男 2： 女',
  `c_telphone` char(20) NOT NULL COMMENT '客户联系电话',
  `c_idcard` char(20) DEFAULT NULL COMMENT '客户身份证号',
  `c_bankname` varchar(50) DEFAULT NULL COMMENT '客户开户行',
  `c_bankcard` char(20) DEFAULT NULL COMMENT '客户开户银行卡号',
  `c_address` varchar(100) DEFAULT NULL COMMENT '客户地址',
  `c_called` varchar(50) DEFAULT NULL COMMENT '客户称呼',
  `c_age` int(3) DEFAULT NULL COMMENT '客户年龄',
  `c_birthday` date DEFAULT NULL COMMENT '客户生日',
  `c_source` varchar(50) DEFAULT NULL COMMENT '客户来源',
  `c_desc` varchar(100) DEFAULT NULL COMMENT '备注',
  `c_gettime` date DEFAULT NULL COMMENT '获取时间',
  `s_id` int(11) NOT NULL COMMENT '店铺id',
  `create_u_id` int(11) NOT NULL COMMENT '创建者id',
  `u_id` int(11) NOT NULL COMMENT '拥有者id',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_customs
-- ----------------------------
INSERT INTO `crm_customs` VALUES ('1', '何鹏', '女', '18340891376', '9486494', '中国银行', '84685498469569556', '', '', '0', '2017-12-27', '', '', '2017-12-21', '1', '3', '3', '2017-12-21 14:13:37');
INSERT INTO `crm_customs` VALUES ('2', '没事', '男', '12345678901', '1234789012345678', '中国银行', '1234567890123456', '辽宁大连', '你猜啊', '20', '2017-12-27', '', '', '2017-12-21', '1', '3', '3', '2017-12-21 14:23:37');
INSERT INTO `crm_customs` VALUES ('3', '李琦', '男', '15468249465', '946875461987616', '中国型钢', '9485481318751694595', '', '', '0', '2017-12-27', '', '', '2017-12-21', '1', '3', '3', '2017-12-21 14:43:45');
INSERT INTO `crm_customs` VALUES ('4', '张三', '女', '12345678901', '123456789012345678', '建设银行', '1234567890123456', '', '', '0', '2017-12-27', '', '', '2017-12-21', '1', '1', '1', '2018-01-08 15:04:30');
INSERT INTO `crm_customs` VALUES ('5', '李四', '女', '97349986566', '973794346467852498', '大连银行', '7584963825408796', '', '', '0', '2017-12-27', '', '', '2017-12-21', '1', '1', '1', '2017-12-21 15:30:06');
INSERT INTO `crm_customs` VALUES ('6', '王五', '男', '18340891371', '450512456221233123', '招商银行', '4532212336544587', '辽宁大连', '老五', '45', '2017-12-25', '淘宝', '', '2017-12-25', '1', '1', '1', '2017-12-25 10:35:54');
INSERT INTO `crm_customs` VALUES ('7', '王大妈', '女', '18564966845', '', '', '', '金州区', '', '0', '2017-12-27', '', '', '2017-12-27', '1', '1', '1', '2017-12-27 08:22:09');
INSERT INTO `crm_customs` VALUES ('8', '何六', '男', '4561231', '', '', '', '', '', '0', '2017-12-27', '', '', '2017-12-27', '1', '1', '1', '2017-12-27 08:37:51');
INSERT INTO `crm_customs` VALUES ('9', '从然', '男', '237849273', '948548764873948648', '中国银行', '948678648', '', '', '0', '2017-12-27', '', '', '2017-12-27', '1', '1', '1', '2017-12-27 08:38:48');
INSERT INTO `crm_customs` VALUES ('12', 'zhang', '男', '13944606792', '', '', '', '', '', '0', '2017-12-27', '', '', '2017-12-27', '1', '1', '1', '2017-12-27 15:56:25');
INSERT INTO `crm_customs` VALUES ('13', 'sdf', '男', '18340431562', '', '', '', '', '', '0', '2017-12-28', '', '', '2017-12-28', '1', '1', '1', '2017-12-28 09:14:56');
INSERT INTO `crm_customs` VALUES ('14', '张三', '男', '12345678901', '', '', '', '', '张三', '0', '0000-00-00', '', '', '2017-12-28', '1', '3', '3', '2017-12-28 09:48:31');
INSERT INTO `crm_customs` VALUES ('15', '李大牛', '男', '12345678901', '123456789123456789', '是', '123456789', '', '李大牛', '0', '0000-00-00', '', '军事基地世界顶级\n你这件事\n涉及计算机技术呢\n井上康生呢\n那些军事基地\n', '2017-12-28', '1', '1', '1', '2017-12-28 14:14:52');
INSERT INTO `crm_customs` VALUES ('16', '李司机', '男', '18340562315', '', '', '', '', '', '0', '2018-01-09', '', '', '2018-01-09', '1', '2', '2', '2018-01-09 13:21:08');

-- ----------------------------
-- Table structure for crm_follows_log
-- ----------------------------
DROP TABLE IF EXISTS `crm_follows_log`;
CREATE TABLE `crm_follows_log` (
  `fl_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '跟进表ID',
  `c_id` int(11) NOT NULL COMMENT '客户ID',
  `u_id` int(11) NOT NULL COMMENT '用户ID',
  `c_name` varchar(20) NOT NULL COMMENT '客户姓名',
  `fl_date` date NOT NULL COMMENT '跟进日期',
  `fl_desc` varchar(200) NOT NULL COMMENT '跟进内容',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`fl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_follows_log
-- ----------------------------
INSERT INTO `crm_follows_log` VALUES ('1', '4', '1', '张三', '2017-12-25', '我的天扭曲大沙发脚就是对方考虑就发了达康书记福利卡极乐空间阿拉丁看风景解放路卡惊世毒妃减肥啦达康书记福利健康就开了房间打死了家乐福快捷ADSL复健科拉速度李经理分', '2017-12-25 11:25:27');
INSERT INTO `crm_follows_log` VALUES ('2', '4', '1', '张三', '2017-12-28', '', '2017-12-28 09:44:25');
INSERT INTO `crm_follows_log` VALUES ('3', '4', '1', '张三', '2017-12-28', '', '2017-12-28 09:44:32');
INSERT INTO `crm_follows_log` VALUES ('4', '4', '1', '张三', '2017-12-28', 'bdhbdbj', '2017-12-28 09:44:34');
INSERT INTO `crm_follows_log` VALUES ('5', '4', '1', '张三', '2017-12-28', '3', '2017-12-28 09:44:43');
INSERT INTO `crm_follows_log` VALUES ('6', '4', '1', '张三', '2017-12-28', '4', '2017-12-28 09:44:51');
INSERT INTO `crm_follows_log` VALUES ('7', '0', '1', '客户姓名', '2017-12-28', '5', '2017-12-28 09:44:57');
INSERT INTO `crm_follows_log` VALUES ('8', '4', '1', '张三', '2017-12-28', 'Nxidjdlsl', '2017-12-28 09:45:03');
INSERT INTO `crm_follows_log` VALUES ('9', '3', '3', '李琦', '2017-12-28', '纳斯达克', '2017-12-28 09:47:41');
INSERT INTO `crm_follows_log` VALUES ('10', '14', '3', '张三', '2017-12-28', '时尚男士开衫', '2017-12-28 09:48:42');
INSERT INTO `crm_follows_log` VALUES ('11', '14', '3', '张三', '2017-12-28', '江西得目瞪口呆', '2017-12-28 09:48:54');
INSERT INTO `crm_follows_log` VALUES ('12', '0', '1', '客户姓名', '2018-01-08', 'Sdfsdf sdf ', '2018-01-08 08:27:47');
INSERT INTO `crm_follows_log` VALUES ('13', '5', '1', '李四', '2018-01-31', '打死他除非他投资', '2018-01-08 15:24:42');

-- ----------------------------
-- Table structure for crm_goods
-- ----------------------------
DROP TABLE IF EXISTS `crm_goods`;
CREATE TABLE `crm_goods` (
  `g_id` int(11) NOT NULL COMMENT '理财表ID',
  `g_name` varchar(20) NOT NULL COMMENT '理财名称',
  `g_days` int(11) NOT NULL COMMENT '理财周期',
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_goods
-- ----------------------------
INSERT INTO `crm_goods` VALUES ('1', '月利惠30天', '30');

-- ----------------------------
-- Table structure for crm_logs
-- ----------------------------
DROP TABLE IF EXISTS `crm_logs`;
CREATE TABLE `crm_logs` (
  `l_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '日记ID',
  `u_id` int(11) NOT NULL COMMENT '用户ID',
  `l_date` date NOT NULL COMMENT '日志日期',
  `l_desc` varchar(200) NOT NULL COMMENT '日志内容',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`l_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_logs
-- ----------------------------
INSERT INTO `crm_logs` VALUES ('1', '3', '2017-12-25', '准时我还信', '2017-12-25 08:30:48');
INSERT INTO `crm_logs` VALUES ('2', '1', '2017-12-25', 'aD阿萨德', '2017-12-25 10:32:21');
INSERT INTO `crm_logs` VALUES ('3', '1', '2017-12-27', '鬼斧神工电饭锅单方事故发电公司电饭锅豆腐干豆腐丝割发代首割发代首单方事故打算放过单方事故是对方告诉对方公司 讽德诵功', '2017-12-27 10:07:01');
INSERT INTO `crm_logs` VALUES ('4', '1', '2018-01-05', 'hjdjdndjjfnjdjrunr', '2018-01-05 10:08:23');

-- ----------------------------
-- Table structure for crm_orders
-- ----------------------------
DROP TABLE IF EXISTS `crm_orders`;
CREATE TABLE `crm_orders` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '理财表ID',
  `c_id` int(11) NOT NULL COMMENT '客户ID',
  `u_id` int(11) DEFAULT NULL COMMENT '用户ID',
  `s_id` int(11) DEFAULT NULL COMMENT '店铺ID',
  `o_date` date DEFAULT NULL COMMENT '成交日期',
  `g_name` varchar(60) DEFAULT NULL COMMENT '理财产品名称',
  `o_money` decimal(11,2) DEFAULT NULL COMMENT '理财金额',
  `o_days` int(11) DEFAULT NULL COMMENT '理财周期',
  `o_return_date` date DEFAULT NULL COMMENT '到期日',
  `o_return_money` decimal(11,2) DEFAULT NULL COMMENT '回款金额',
  `o_welfare` varchar(100) DEFAULT NULL COMMENT '福利',
  `o_desc` varchar(100) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '还款状态',
  PRIMARY KEY (`o_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_orders
-- ----------------------------
INSERT INTO `crm_orders` VALUES ('1', '1', '3', '1', '2017-12-21', '月反133', '300.00', '10', '2017-12-21', '200.00', '', '', '2017-12-21 14:14:23', '1');
INSERT INTO `crm_orders` VALUES ('2', '2', '3', '1', '2017-12-21', '我搜索中破', '10000.00', '30', '2018-01-21', '15000.00', '', '', '2017-12-21 14:16:24', '1');
INSERT INTO `crm_orders` VALUES ('3', '1', '3', '1', '2017-12-21', '这破', '20000.00', '30', '2018-03-08', '25000.00', '', '', '2017-12-21 14:20:07', '1');
INSERT INTO `crm_orders` VALUES ('4', '6', '1', '1', '2017-12-25', '微信返利300', '200.00', '10', '2017-12-25', '200.00', '', '', '2017-12-25 10:35:15', '1');
INSERT INTO `crm_orders` VALUES ('5', '4', '1', '1', '2017-12-25', '返回300', '5000.00', '10', '2017-12-25', '5000.00', '', '', '2017-12-25 11:24:12', '0');
INSERT INTO `crm_orders` VALUES ('6', '4', '1', '1', '2017-12-25', '返回300', '5000.00', '10', '2017-12-25', '5000.00', '', '', '2017-12-25 11:24:17', '0');
INSERT INTO `crm_orders` VALUES ('7', '4', '1', '1', '2017-12-25', '返回300', '5000.00', '10', '2017-12-25', '5000.00', '', '', '2017-12-25 11:24:31', '0');
INSERT INTO `crm_orders` VALUES ('8', '6', '1', '1', '2017-12-25', '微信100', '1000.00', '10', '2017-12-25', '1000.00', '', '', '2017-12-25 11:25:13', '0');
INSERT INTO `crm_orders` VALUES ('9', '5', '1', '1', '2017-12-25', '放到', '122.00', '12', '2017-12-25', '122.00', '', '', '2017-12-25 11:27:29', '0');
INSERT INTO `crm_orders` VALUES ('10', '9', '1', '1', '2017-12-27', '没有产品', '180.00', '10', '2017-12-27', '10.00', '2', '', '2017-12-27 15:18:37', '0');
INSERT INTO `crm_orders` VALUES ('11', '15', '1', '1', '2017-12-29', '是啊', '20000.00', '30', '2018-03-31', '202.00', '1', '在线内将是未来发展潜力大、这种情况在', '2017-12-29 15:15:24', '0');
INSERT INTO `crm_orders` VALUES ('12', '0', '1', '1', '2018-01-05', '这', '100.00', '200', '2018-01-05', '200.00', '1', '', '2018-01-05 08:45:53', '1');
INSERT INTO `crm_orders` VALUES ('13', '9', '1', '1', '2018-01-05', 'Aaaaaa', '10000.00', '30', '2018-02-05', '11000.00', '2', 'Sdfsdf', '2018-01-05 10:08:41', '0');
INSERT INTO `crm_orders` VALUES ('14', '4', '1', '1', '2018-01-05', '喝得很好', '300.00', '1', '2018-01-05', '400.00', '', '', '2018-01-05 10:14:26', '1');
INSERT INTO `crm_orders` VALUES ('15', '4', '1', '1', '2018-01-05', '欢呼', '200.00', '100', '2018-04-05', '200.00', '', '', '2018-01-05 10:17:43', '0');
INSERT INTO `crm_orders` VALUES ('16', '4', '1', '1', '2018-01-08', 'jdjj', '9649.00', '949', '2018-01-08', '100.00', '2', 'jdbdnjdj', '2018-01-08 08:33:53', '0');
INSERT INTO `crm_orders` VALUES ('17', '4', '1', '1', '2018-01-09', 'chiji', '123.00', '12', '2018-01-10', '123.00', '1', 'fsad', '2018-01-09 13:54:44', '0');

-- ----------------------------
-- Table structure for crm_roles
-- ----------------------------
DROP TABLE IF EXISTS `crm_roles`;
CREATE TABLE `crm_roles` (
  `r_id` char(11) NOT NULL COMMENT '职级ID',
  `parent_id` char(11) NOT NULL COMMENT '父ID',
  `r_name` varchar(20) NOT NULL COMMENT '职级名称',
  `r_status` tinyint(1) NOT NULL COMMENT '状态值 1表示激活 0表示未激活',
  PRIMARY KEY (`r_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_roles
-- ----------------------------
INSERT INTO `crm_roles` VALUES ('1001', '0', '管理员', '1');
INSERT INTO `crm_roles` VALUES ('100101', '1001', '总经理', '1');

-- ----------------------------
-- Table structure for crm_role_user
-- ----------------------------
DROP TABLE IF EXISTS `crm_role_user`;
CREATE TABLE `crm_role_user` (
  `ru_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `u_id` int(11) NOT NULL,
  `r_id` int(11) NOT NULL,
  `ru_status` tinyint(2) NOT NULL DEFAULT '1' COMMENT '1在职 0不在职',
  PRIMARY KEY (`ru_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_role_user
-- ----------------------------

-- ----------------------------
-- Table structure for crm_stors
-- ----------------------------
DROP TABLE IF EXISTS `crm_stors`;
CREATE TABLE `crm_stors` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '店铺表ID',
  `s_name` varchar(50) NOT NULL COMMENT '店铺名称',
  `s_address` varchar(100) NOT NULL COMMENT '店铺地址',
  `s_phone` char(20) NOT NULL COMMENT '店铺电话',
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_stors
-- ----------------------------
INSERT INTO `crm_stors` VALUES ('1', '开发区门店', '大连开发区', '0411-38383864');
INSERT INTO `crm_stors` VALUES ('2', '金州门店', '大连金州区', '0411-56998745');
INSERT INTO `crm_stors` VALUES ('3', '市区门店', '大连市区', '0411-56998896');

-- ----------------------------
-- Table structure for crm_tasks
-- ----------------------------
DROP TABLE IF EXISTS `crm_tasks`;
CREATE TABLE `crm_tasks` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '任务表ID',
  `c_id` int(11) NOT NULL COMMENT '客户ID',
  `u_id` int(11) NOT NULL COMMENT '用户ID',
  `c_name` varchar(20) NOT NULL COMMENT '客户姓名',
  `t_date` date NOT NULL,
  `t_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1表示已经激活 0 表示未激活',
  `t_desc` varchar(200) NOT NULL COMMENT '内容',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `t_name` varchar(20) NOT NULL COMMENT '任务名称',
  `t_endtime` date DEFAULT NULL,
  `t_feedback` varchar(200) DEFAULT NULL,
  `t_finishtime` date DEFAULT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_tasks
-- ----------------------------
INSERT INTO `crm_tasks` VALUES ('1', '3', '3', '李琦', '2017-12-21', '0', '考虑考虑', '2017-12-21 14:45:32', '不是任务', '2018-01-03', null, null);
INSERT INTO `crm_tasks` VALUES ('2', '4', '1', '张三', '2017-12-22', '1', '大法师的', '2017-12-22 08:35:08', '很大的任务', '2018-01-03', 'dsafasdf', '2017-12-29');
INSERT INTO `crm_tasks` VALUES ('3', '5', '1', '李四', '2017-12-27', '1', '你确定今晚能拿下这个订单', '2017-12-27 10:05:29', '今晚拿下', '2018-01-03', 'fdasf', '2017-12-30');
INSERT INTO `crm_tasks` VALUES ('4', '7', '2', '王大妈', '2018-01-03', '1', 'aaaa', '2018-01-03 13:19:11', 'aaa', '2018-01-03', 'aaaaa', '2018-01-03');
INSERT INTO `crm_tasks` VALUES ('5', '0', '2', '客户姓名', '2018-01-05', '0', '这', '2018-01-05 09:02:32', '雨后', '2018-01-05', null, null);
INSERT INTO `crm_tasks` VALUES ('6', '0', '3', '客户姓名', '2018-01-05', '0', '喝喝酒\n', '2018-01-05 09:05:37', '在一起', '2018-01-05', '欢呼', '2018-01-05');
INSERT INTO `crm_tasks` VALUES ('7', '5', '3', '李四', '2018-01-05', '0', 'Sdf', '2018-01-05 09:06:51', 'Fsdf', '2018-01-05', null, null);
INSERT INTO `crm_tasks` VALUES ('8', '8', '3', '何六', '2018-01-10', '0', '啊啊啊吧\n\n', '2018-01-08 15:14:56', '打死他不投资', '2018-01-31', null, null);
INSERT INTO `crm_tasks` VALUES ('9', '6', '3', '王五', '2018-01-10', '1', '爸爸', '2018-01-08 15:16:52', '不投资打死他', '2018-01-31', '王五说打死他他也不投', '2018-02-02');

-- ----------------------------
-- Table structure for crm_users
-- ----------------------------
DROP TABLE IF EXISTS `crm_users`;
CREATE TABLE `crm_users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `u_username` char(11) NOT NULL COMMENT '用户名',
  `u_password` char(64) NOT NULL COMMENT '登录密码',
  `u_telphone` char(20) NOT NULL COMMENT '用户电话',
  `u_name` varchar(10) NOT NULL COMMENT '姓名',
  `u_age` varchar(10) NOT NULL COMMENT '年龄',
  `s_id` int(11) NOT NULL COMMENT '店铺id',
  `p_id` char(11) NOT NULL COMMENT '职级ID',
  `u_state` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1:是激活状态 0 是未激活状态',
  `token` char(64) DEFAULT NULL,
  `r_id` char(11) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_users
-- ----------------------------
INSERT INTO `crm_users` VALUES ('1', 'admin', '2', '18340891562', '管理员', '26', '0', '', '1', null, '');
INSERT INTO `crm_users` VALUES ('2', 'doner', '1', '', 'doner', '25', '0', '', '1', null, '');
INSERT INTO `crm_users` VALUES ('3', 'hepeng', '123456', '12345678901', '何鹏', '20', '0', '', '1', null, '');
INSERT INTO `crm_users` VALUES ('5', 'abc123', 'abc123', '', '小明', '12', '0', '', '1', null, '');
INSERT INTO `crm_users` VALUES ('6', 'john', 'a', '12456456546', 'xiaopeng', '20', '0', '', '1', null, '');
INSERT INTO `crm_users` VALUES ('7', 'Baitianyi', '123456', '12345678901', '白天亿', '', '0', '', '1', null, '');

-- ----------------------------
-- Table structure for crm_welfare
-- ----------------------------
DROP TABLE IF EXISTS `crm_welfare`;
CREATE TABLE `crm_welfare` (
  `w_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '福利表id',
  `w_name` varchar(20) NOT NULL COMMENT '福利名称',
  `w_number` int(11) NOT NULL COMMENT '福利数量',
  PRIMARY KEY (`w_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_welfare
-- ----------------------------
INSERT INTO `crm_welfare` VALUES ('1', '月返100', '177');
INSERT INTO `crm_welfare` VALUES ('2', '月返170', '187');

-- ----------------------------
-- View structure for crm_chanceslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_chanceslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_chanceslist_view` AS select `c`.`ch_id` AS `ch_id`,`c`.`c_id` AS `c_id`,`c`.`u_id` AS `u_id`,`c`.`c_name` AS `c_name`,`c`.`ch_date` AS `ch_date`,`c`.`ch_money` AS `ch_money`,`c`.`ch_desc` AS `ch_desc`,`c`.`create_time` AS `create_time`,`c`.`ch_name` AS `ch_name`,`u`.`u_name` AS `u_name` from (`crm_chances` `c` left join `crm_users` `u` on((`c`.`u_id` = `u`.`u_id`))) ;

-- ----------------------------
-- View structure for crm_customlist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_customlist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_customlist_view` AS select `c`.`c_id` AS `c_id`,`c`.`c_name` AS `c_name`,`c`.`c_sex` AS `c_sex`,`c`.`c_telphone` AS `c_telphone`,`c`.`c_idcard` AS `c_idcard`,`c`.`c_bankname` AS `c_bankname`,`c`.`c_bankcard` AS `c_bankcard`,`c`.`c_address` AS `c_address`,`c`.`c_called` AS `c_called`,`c`.`c_age` AS `c_age`,`c`.`c_birthday` AS `c_birthday`,`c`.`c_source` AS `c_source`,`c`.`c_desc` AS `c_desc`,`c`.`c_gettime` AS `c_gettime`,`c`.`s_id` AS `s_id`,`c`.`create_u_id` AS `create_u_id`,`c`.`u_id` AS `u_id`,`c`.`create_time` AS `create_time`,`ov`.`o_money` AS `o_money`,`ov`.`o_return_money` AS `o_return_money` from (`crm_customs` `c` left join `crm_ordersum_view` `ov` on((`c`.`c_id` = `ov`.`c_id`))) ;

-- ----------------------------
-- View structure for crm_followslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_followslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_followslist_view` AS select `f`.`fl_id` AS `fl_id`,`f`.`c_id` AS `c_id`,`f`.`u_id` AS `u_id`,`f`.`c_name` AS `c_name`,`f`.`fl_date` AS `fl_date`,`f`.`fl_desc` AS `fl_desc`,`f`.`create_time` AS `create_time`,`u`.`u_name` AS `u_name` from (`crm_follows_log` `f` left join `crm_users` `u` on((`f`.`u_id` = `u`.`u_id`))) ;

-- ----------------------------
-- View structure for crm_logslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_logslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_logslist_view` AS select `l`.`l_id` AS `l_id`,`l`.`u_id` AS `u_id`,`l`.`l_date` AS `l_date`,`l`.`l_desc` AS `l_desc`,`l`.`create_time` AS `create_time`,`u`.`u_name` AS `u_name` from (`crm_logs` `l` left join `crm_users` `u` on((`l`.`u_id` = `u`.`u_id`))) ;

-- ----------------------------
-- View structure for crm_orderslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_orderslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_orderslist_view` AS select `o`.`o_id` AS `o_id`,`o`.`c_id` AS `c_id`,`o`.`u_id` AS `u_id`,`o`.`s_id` AS `s_id`,`o`.`o_date` AS `o_date`,`o`.`g_name` AS `g_name`,`o`.`o_money` AS `o_money`,`o`.`o_days` AS `o_days`,`o`.`o_return_date` AS `o_return_date`,`o`.`o_return_money` AS `o_return_money`,`o`.`o_welfare` AS `o_welfare`,`o`.`o_desc` AS `o_desc`,`o`.`create_time` AS `create_time`,`o`.`state` AS `state`,`c`.`c_name` AS `c_name`,`u`.`u_name` AS `u_name`,`s`.`s_name` AS `s_name` from (((`crm_orders` `o` left join `crm_customs` `c` on((`o`.`c_id` = `c`.`c_id`))) left join `crm_users` `u` on((`o`.`u_id` = `u`.`u_id`))) left join `crm_stors` `s` on((`o`.`s_id` = `s`.`s_id`))) ;

-- ----------------------------
-- View structure for crm_ordersum_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_ordersum_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_ordersum_view` AS select `crm_orders`.`c_id` AS `c_id`,sum(`crm_orders`.`o_money`) AS `o_money`,sum(`crm_orders`.`o_return_money`) AS `o_return_money` from `crm_orders` group by `crm_orders`.`c_id` ;

-- ----------------------------
-- View structure for crm_taskslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_taskslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_taskslist_view` AS select `t`.`t_id` AS `t_id`,`t`.`c_id` AS `c_id`,`t`.`u_id` AS `u_id`,`t`.`c_name` AS `c_name`,`t`.`t_date` AS `t_date`,`t`.`t_status` AS `t_status`,`t`.`t_desc` AS `t_desc`,`t`.`create_time` AS `create_time`,`t`.`t_endtime` AS `t_endtime`,`t`.`t_name` AS `t_name`,`u`.`u_name` AS `u_name` from ((`crm_tasks` `t` left join `crm_customs` `c` on((`t`.`c_id` = `c`.`c_id`))) left join `crm_users` `u` on((`t`.`u_id` = `u`.`u_id`))) ;

-- ----------------------------
-- View structure for crm_userlist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_userlist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_userlist_view` AS select `u`.`u_id` AS `u_id`,`u`.`u_username` AS `u_username`,`u`.`u_password` AS `u_password`,`u`.`u_telphone` AS `u_telphone`,`u`.`u_name` AS `u_name`,`u`.`u_age` AS `u_age`,`u`.`s_id` AS `s_id`,`u`.`p_id` AS `p_id`,`u`.`u_state` AS `u_state`,`u`.`token` AS `token`,`u`.`r_id` AS `r_id`,`r`.`parent_id` AS `parent_id`,`r`.`r_name` AS `r_name` from (`crm_users` `u` left join `crm_roles` `r` on((`u`.`r_id` = `r`.`r_id`))) where (`r`.`r_status` = 1) ;

-- ----------------------------
-- View structure for crm_user_roles_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_user_roles_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`xinmiaosen_root`@`%` SQL SECURITY DEFINER VIEW `crm_user_roles_view` AS select `u`.`u_id` AS `u_id`,`ru`.`r_id` AS `r_id`,`r`.`r_name` AS `r_name`,`u`.`u_name` AS `u_name`,`u`.`u_username` AS `u_username`,`ru`.`ru_id` AS `ru_id`,`ru`.`ru_status` AS `ru_status` from ((`crm_users` `u` left join `crm_role_user` `ru` on((`u`.`u_id` = `ru`.`u_id`))) left join `crm_roles` `r` on((`ru`.`r_id` = `r`.`r_id`))) ;
