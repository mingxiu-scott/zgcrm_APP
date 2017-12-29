/*
Navicat MySQL Data Transfer

Source Server         : 东哥
Source Server Version : 50505
Source Host           : 192.168.1.152:3306
Source Database       : zg_crm

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-12-29 14:12:38
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_chances
-- ----------------------------
INSERT INTO `crm_chances` VALUES ('2', '1', '1', '王秀键', '2017-12-13', '200000.00', '', '2017-12-13 15:10:14', '打把机会');
INSERT INTO `crm_chances` VALUES ('3', '1', '1', '王秀键', '2017-12-13', '25.00', 'dsa', '2017-12-13 15:41:30', '25g		');
INSERT INTO `crm_chances` VALUES ('4', '1', '1', '王秀键', '2017-12-13', '0.00', 'dfgs', '2017-12-13 15:43:32', 'fddg');
INSERT INTO `crm_chances` VALUES ('5', '1', '1', '王秀键', '2017-12-13', '0.00', 'aa', '2017-12-13 16:07:53', 'aa');
INSERT INTO `crm_chances` VALUES ('12', '1', '1', '张三', '2019-12-14', '456212.00', 'ad', '2017-12-14 09:41:15', 'cdn');
INSERT INTO `crm_chances` VALUES ('13', '1', '1', '陈友谅', '2017-12-14', '111.00', '发生地方2312312d', '2017-12-14 12:46:54', '彩票中奖');
INSERT INTO `crm_chances` VALUES ('14', '1', '1', '王秀键', '2029-12-14', '111111.00', '', '2017-12-14 12:50:50', 'sdasd');
INSERT INTO `crm_chances` VALUES ('15', '3', '2', '陈友谅', '2017-12-20', '132312312.00', '123123', '2017-12-20 14:26:12', 'dsafasdfads');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_customs
-- ----------------------------
INSERT INTO `crm_customs` VALUES ('1', '王秀键', '男', '18340891584', '456123486544563212', '中国银行', '4561231154565465', '辽宁大连', '', '0', '0000-00-00', '', '', '2017-12-25', '1', '1', '1', '2017-12-25 09:40:29');
INSERT INTO `crm_customs` VALUES ('2', '里欧', '男', '18524546546', '', '', '', '', '', '0', '0000-00-00', '', '', '2017-12-25', '1', '1', '1', '2017-12-25 14:12:24');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_follows_log
-- ----------------------------
INSERT INTO `crm_follows_log` VALUES ('1', '1', '1', '王秀键', '2017-12-13', 'b222333', '2017-12-13 15:19:18');
INSERT INTO `crm_follows_log` VALUES ('2', '12', '1', '张三', '2017-12-14', 'sdfasdfas', '2017-12-14 13:08:30');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_logs
-- ----------------------------
INSERT INTO `crm_logs` VALUES ('2', '1', '2018-05-13', 'wobuxingle a ', '2017-12-13 15:46:31');
INSERT INTO `crm_logs` VALUES ('3', '1', '2018-05-13', 'wobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a ', '2017-12-13 15:46:35');
INSERT INTO `crm_logs` VALUES ('7', '1', '2017-12-15', 'tomcatwobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a wobuxingle a ', '2017-12-15 13:53:51');

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
  `g_name` varchar(60) DEFAULT NULL COMMENT '理财产品ID',
  `o_money` decimal(11,2) DEFAULT NULL COMMENT '理财金额',
  `o_days` int(11) DEFAULT NULL COMMENT '理财周期',
  `o_return_date` date DEFAULT NULL COMMENT '到期日',
  `o_return_money` decimal(11,2) DEFAULT NULL COMMENT '回款金额',
  `o_welfare` varchar(100) DEFAULT NULL COMMENT '福利',
  `o_desc` varchar(100) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '还款状态',
  PRIMARY KEY (`o_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_orders
-- ----------------------------

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
INSERT INTO `crm_roles` VALUES ('100101', '1001', '开发区1门店店长', '1');
INSERT INTO `crm_roles` VALUES ('10010101', '100101', '团队经理', '1');
INSERT INTO `crm_roles` VALUES ('1001010101', '10010101', '理财经理', '1');
INSERT INTO `crm_roles` VALUES ('100102', '1001', '开发区2店长', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_stors
-- ----------------------------
INSERT INTO `crm_stors` VALUES ('1', '默认门店', '大连开发区', '0411-38383864');
INSERT INTO `crm_stors` VALUES ('2', '金州门店', '大连金州区', '0411-56998745');

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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_tasks
-- ----------------------------
INSERT INTO `crm_tasks` VALUES ('2', '1', '1', '王秀波', '2017-12-14', '0', 'fgdsgf', '2017-12-18 14:02:17', '哈哈', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('3', '2', '1', '王秀键', '2017-12-14', '0', 'dsafdas', '2017-12-13 15:44:40', '完事u', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('4', '3', '1', '王秀键', '2017-12-14', '0', 'dsafdas', '2017-12-13 15:44:42', '', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('5', '9', '1', '王秀键', '2017-12-14', '1', 'dsafdas', '2017-12-13 15:44:44', 'sdfsdfsd', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('6', '10', '1', '王秀键', '2017-12-14', '1', 'dsafdas', '2017-12-13 15:44:53', '', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('7', '13', '1', '王秀键', '2017-12-14', '1', 'dsafdas', '2017-12-13 15:45:26', '', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('9', '14', '1', '王秀键', '2017-12-13', '1', '我们是想有一个地方存储数据aa', '2017-12-15 10:15:02', 'bb', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('10', '15', '1', '朱棣', '2017-12-14', '1', 'adfadsf', '2017-12-18 14:34:39', 'asdasd', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('11', '16', '1', '陈大春', '2017-12-14', '1', '我们sda', '2017-12-15 14:47:20', 'asdasdasd', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('12', '17', '1', '朱元璋', '2017-12-14', '1', '运气好deyipi', '2017-12-18 14:24:51', 'sdasdasdasdas', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('15', '1', '1', 'ddddd', '2017-12-18', '1', 'fdasfadsfasdf', '2017-12-18 16:00:54', 'asdfadsfads', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('17', '1', '1', '陈大春', '2017-12-18', '1', 'a', '2017-12-18 16:39:15', 'a', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('18', '1', '1', '陈大春', '2017-12-19', '1', '', '2017-12-19 08:30:00', 'aaaa', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('19', '1', '1', '张三', '2017-12-19', '0', '第三方', '2017-12-19 10:47:22', '战三', '2017-12-29', '', '0000-00-00');
INSERT INTO `crm_tasks` VALUES ('20', '1', '1', '陈大春', '2017-12-19', '1', 'dasf', '2017-12-19 10:53:25', 'ad', '2017-12-29', 'dasf', '2017-12-28');
INSERT INTO `crm_tasks` VALUES ('21', '1', '1', '陈大春', '2017-12-19', '1', 'ccc', '2017-12-19 10:54:18', 'adc', '2017-12-29', 'afds', '2017-12-28');
INSERT INTO `crm_tasks` VALUES ('22', '0', '1', '客户姓名', '2017-12-28', '1', 'WrAryfch', '2017-12-28 16:37:52', 'The ', '0000-00-00', null, null);
INSERT INTO `crm_tasks` VALUES ('23', '2', '1', '里欧', '2017-12-28', '1', 'Sdfsdf dsf', '2017-12-28 16:38:26', 'Dsfsdfdsf', '0000-00-00', null, null);
INSERT INTO `crm_tasks` VALUES ('24', '1', '1', '王秀键', '2017-12-28', '1', 'Fdsfsdf', '2017-12-28 16:39:21', 'Fsdf;hd;tho;', '0000-00-00', null, null);
INSERT INTO `crm_tasks` VALUES ('25', '1', '2', '王秀键', '2017-12-28', '1', '大沙发上的', '2017-12-28 16:42:27', '今晚吃鸡', '2017-12-30', 'yiwabujg', '2017-12-28');
INSERT INTO `crm_tasks` VALUES ('26', '0', '0', '客户姓名', '2017-12-28', '0', '', '2017-12-28 16:52:52', 'Sdfdsfdsfdsfdsf', '0000-00-00', null, null);
INSERT INTO `crm_tasks` VALUES ('27', '2', '2', '里欧', '2017-12-29', '0', 'Fsdf', '2017-12-29 10:02:12', 'Fsdfsdf', '2017-12-30', null, null);

-- ----------------------------
-- Table structure for crm_users
-- ----------------------------
DROP TABLE IF EXISTS `crm_users`;
CREATE TABLE `crm_users` (
  `u_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_users
-- ----------------------------
INSERT INTO `crm_users` VALUES ('1', 'admin', '1', '18340891562', '管理员', '26', '0', '', '1', null, '1001');
INSERT INTO `crm_users` VALUES ('2', 'doner', '123456', '', 'doner', '25', '0', '', '1', null, '10010101');
INSERT INTO `crm_users` VALUES ('3', 'Hepeng', '123456', '12345678901', '何鹏', '20', '0', '', '1', null, '100102');
INSERT INTO `crm_users` VALUES ('5', '1234', '', '', '小明', '12', '0', '', '1', null, '1001010101');
INSERT INTO `crm_users` VALUES ('6', 'a', 'a', '12456456546', 'xiaopeng', '20', '0', '', '1', null, '1001010102');

-- ----------------------------
-- Table structure for crm_welfare
-- ----------------------------
DROP TABLE IF EXISTS `crm_welfare`;
CREATE TABLE `crm_welfare` (
  `w_id` int(11) NOT NULL AUTO_INCREMENT,
  `w_name` varchar(20) NOT NULL,
  `w_number` int(11) NOT NULL,
  PRIMARY KEY (`w_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of crm_welfare
-- ----------------------------
INSERT INTO `crm_welfare` VALUES ('1', '福利1', '20');
INSERT INTO `crm_welfare` VALUES ('2', '福利额', '0');

-- ----------------------------
-- View structure for crm_chanceslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_chanceslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `crm_chanceslist_view` AS select `c`.`ch_id` AS `ch_id`,`c`.`c_id` AS `c_id`,`c`.`u_id` AS `u_id`,`c`.`c_name` AS `c_name`,`c`.`ch_date` AS `ch_date`,`c`.`ch_money` AS `ch_money`,`c`.`ch_desc` AS `ch_desc`,`c`.`create_time` AS `create_time`,`c`.`ch_name` AS `ch_name`,`u`.`u_name` AS `u_name` from (`crm_chances` `c` left join `crm_users` `u` on((`c`.`u_id` = `u`.`u_id`))) ;

-- ----------------------------
-- View structure for crm_customlist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_customlist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `crm_customlist_view` AS select `c`.`c_id` AS `c_id`,`c`.`c_name` AS `c_name`,`c`.`c_sex` AS `c_sex`,`c`.`c_telphone` AS `c_telphone`,`c`.`c_idcard` AS `c_idcard`,`c`.`c_bankname` AS `c_bankname`,`c`.`c_bankcard` AS `c_bankcard`,`c`.`c_address` AS `c_address`,`c`.`c_called` AS `c_called`,`c`.`c_age` AS `c_age`,`c`.`c_birthday` AS `c_birthday`,`c`.`c_source` AS `c_source`,`c`.`c_desc` AS `c_desc`,`c`.`c_gettime` AS `c_gettime`,`c`.`s_id` AS `s_id`,`c`.`create_u_id` AS `create_u_id`,`c`.`u_id` AS `u_id`,`c`.`create_time` AS `create_time`,`ov`.`o_money` AS `o_money`,`ov`.`o_return_money` AS `o_return_money` from (`crm_customs` `c` left join `crm_ordersum_view` `ov` on((`c`.`c_id` = `ov`.`c_id`))) ;

-- ----------------------------
-- View structure for crm_followslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_followslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `crm_followslist_view` AS select `f`.`fl_id` AS `fl_id`,`f`.`c_id` AS `c_id`,`f`.`u_id` AS `u_id`,`f`.`c_name` AS `c_name`,`f`.`fl_date` AS `fl_date`,`f`.`fl_desc` AS `fl_desc`,`f`.`create_time` AS `create_time`,`u`.`u_name` AS `u_name` from (`crm_follows_log` `f` left join `crm_users` `u` on((`f`.`u_id` = `u`.`u_id`))) ;

-- ----------------------------
-- View structure for crm_logslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_logslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `crm_logslist_view` AS select `l`.`l_id` AS `l_id`,`l`.`u_id` AS `u_id`,`l`.`l_date` AS `l_date`,`l`.`l_desc` AS `l_desc`,`l`.`create_time` AS `create_time`,`u`.`u_name` AS `u_name` from (`crm_logs` `l` left join `crm_users` `u` on((`l`.`u_id` = `u`.`u_id`))) ;

-- ----------------------------
-- View structure for crm_orderslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_orderslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `crm_orderslist_view` AS select `o`.`o_id` AS `o_id`,`o`.`c_id` AS `c_id`,`o`.`u_id` AS `u_id`,`o`.`s_id` AS `s_id`,`o`.`o_date` AS `o_date`,`o`.`g_name` AS `g_name`,`o`.`o_money` AS `o_money`,`o`.`o_days` AS `o_days`,`o`.`o_return_date` AS `o_return_date`,`o`.`o_return_money` AS `o_return_money`,`o`.`o_welfare` AS `o_welfare`,`o`.`o_desc` AS `o_desc`,`o`.`create_time` AS `create_time`,`c`.`c_name` AS `c_name`,`u`.`u_name` AS `u_name`,`s`.`s_name` AS `s_name` from (((`crm_orders` `o` left join `crm_customs` `c` on((`o`.`c_id` = `c`.`c_id`))) left join `crm_users` `u` on((`o`.`u_id` = `u`.`u_id`))) left join `crm_stors` `s` on((`o`.`s_id` = `s`.`s_id`))) ;

-- ----------------------------
-- View structure for crm_ordersum_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_ordersum_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `crm_ordersum_view` AS select `crm_orders`.`c_id` AS `c_id`,sum(`crm_orders`.`o_money`) AS `o_money`,sum(`crm_orders`.`o_return_money`) AS `o_return_money` from `crm_orders` group by `crm_orders`.`c_id` ;

-- ----------------------------
-- View structure for crm_taskslist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_taskslist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `crm_taskslist_view` AS select `t`.`t_id` AS `t_id`,`t`.`c_id` AS `c_id`,`t`.`u_id` AS `u_id`,`t`.`c_name` AS `c_name`,`t`.`t_date` AS `t_date`,`t`.`t_status` AS `t_status`,`t`.`t_desc` AS `t_desc`,`t`.`create_time` AS `create_time`,`t`.`t_endtime` AS `t_endtime`,`t`.`t_name` AS `t_name`,`u`.`u_name` AS `u_name` from ((`crm_tasks` `t` left join `crm_customs` `c` on((`t`.`c_id` = `c`.`c_id`))) left join `crm_users` `u` on((`t`.`u_id` = `u`.`u_id`))) ;

-- ----------------------------
-- View structure for crm_userlist_view
-- ----------------------------
DROP VIEW IF EXISTS `crm_userlist_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `crm_userlist_view` AS select `u`.`u_id` AS `u_id`,`u`.`u_username` AS `u_username`,`u`.`u_password` AS `u_password`,`u`.`u_telphone` AS `u_telphone`,`u`.`u_name` AS `u_name`,`u`.`u_age` AS `u_age`,`u`.`s_id` AS `s_id`,`u`.`p_id` AS `p_id`,`u`.`u_state` AS `u_state`,`u`.`token` AS `token`,`u`.`r_id` AS `r_id`,`r`.`parent_id` AS `parent_id`,`r`.`r_name` AS `r_name` from (`crm_users` `u` left join `crm_roles` `r` on((`u`.`r_id` = `r`.`r_id`))) where (`r`.`r_status` = 1) ;
