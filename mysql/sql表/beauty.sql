/*
Navicat MySQL Data Transfer

Source Server         : lsq
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : egg_app

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-05-08 14:08:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for beauty
-- ----------------------------
DROP TABLE IF EXISTS `beauty`;
CREATE TABLE `beauty` (
  `id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `boyfriend_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of beauty
-- ----------------------------
INSERT INTO `beauty` VALUES ('1', '刘艳', '女', '1');
INSERT INTO `beauty` VALUES ('2', '吴祖贤', '女', '2');
