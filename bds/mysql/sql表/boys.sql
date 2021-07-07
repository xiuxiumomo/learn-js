/*
Navicat MySQL Data Transfer

Source Server         : lsq
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : egg_app

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-05-08 14:08:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for boys
-- ----------------------------
DROP TABLE IF EXISTS `boys`;
CREATE TABLE `boys` (
  `id` int(11) DEFAULT NULL,
  `boyName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userCP` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of boys
-- ----------------------------
INSERT INTO `boys` VALUES ('1', '张无忌', '100');
INSERT INTO `boys` VALUES ('2', '黄晓明', '80');
