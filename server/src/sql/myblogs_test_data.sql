/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost
 Source Database       : myblogs_test

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : utf-8

 Date: 05/18/2022 23:13:45 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` mediumtext CHARACTER SET utf8mb4,
  `viewCount` int(11) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `article`
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES ('-1', '留言页面', '留言页面，区分是留言还是文章，勿删', '33', '2021-04-11 17:46:55', '2021-05-01 08:58:15'), ('96', '测试添加文章', '# 测试下修改登录方式后的文章\n### 我是文章详情\n- markdown\n- 傻了', '22', '2021-05-01 06:38:09', '2021-05-01 08:58:05'), ('103', '月色倾城，红尘唯你是念', '   皎洁而琼秀的月轮，高高地挂在云空，千束万束的月华清辉倾洒在大地上。远山近水，楼台亭榭，在银装的裹束下，格外寂静。夜色茫茫，在月下阒寂无声，似乎那么凝重、那么庄严、那么肃穆，但又很迷朦。庭前的碧树草畦被月色披扮着，比起日间神秘而奇特。那树，显得格外纤颀；畦中的小草，显得格外地碧翠；池中的水，也显得格外柔静。\n\n   天空是黝蓝色，浩茫而深邃。满天没有一丝白云，静悄悄的。夜阑人静，没有白日的喧嚣，也没有往日的满天星斗，往日伴随纤月的天罡地煞、太白天狼、牵牛织女也都不知了去向，许是躲进了自己的床榻，悄悄地安睡去了。风儿轻轻地吹，但有点踟蹰，似乎在诉说着自己的心结。那踟蹰而蹒跚的步履，像是有点醉。那低吟浅唱的哝哝絮语，象吟喟着古老的歌谣。那踟蹰的行迹，也留下了一串串的脚印，像是在寻找，像是在梭巡，又像是在搀扶着什么。它的脚印中也有无数的记忆，那有人世的沧桑，世故的冷暖、世态的炎凉……\n\n   人们说，天上一个月亮，地上有无数的月亮。是啊，“千江有水千江月，万里无云万里天”。无论江河湖海、池沼荷塘、潭沟水荡，只要有水，就会有秀媚的月亮。就是端一盆水放到空廷阶下，也会映出一轮明月。所谓“碧池若清浅，映月尤光辉”。确实，哪怕再清浅的一抔水，也能映出月轮的妩媚。这就是人们都唱的“天上的月亮在水中，水中的月亮在天上”。\n\n  坛中的群芳，没了日间的光彩。虽然花颜顿失，她们为此感到憾恨，但依旧在散洒着她们的浓香。这浓香是在随伴着夜行未归的游子，也许是在陪伴着羁旅在外的天涯行客，也像在和月光一起跳着婆娑的舞。无论怎样，还是为月的窈窕和风采增加了光辉和灿烂。\n\n远处的楼台亭阁，高低错落，朦朦胧胧，如痴如醉，在似乎的摇曳中，像是在炫耀着他那虚幻的隐约。那高楼低阁，高的、低的，相互错落着，再加上它的隐约的摇曳，和深邃的天空、皎白月轮、远山近树，构成了一幅硕大的画卷。\n\n倾城的月色，演绎着千古的传说，讲述着亘古的诗话，鸣奏着不朽的红尘恋歌。这是江山的锦绣，是乾坤的钟灵，是天地的造化。这月、这夜、这风、这花、这景，构成了妙曼的红尘仙境。\n\n“古人未见今时月，今月曾经照古人”。无论古今，没有几个文人诗客不对明月充满着景仰和钟爱。那些崇月爱月的大家巨擘，用最动人的诗句，歌颂月亮、赞美月亮、寄心于月轮、眷恋着月轮。而张若虚的一首《春江花月夜》更以他优雅浪漫的诗言，把对明月的挚爱和情感推到极致。他的全诗共九韵三十六句，那也是他在空灵而玄奥的景色中，从永恒的明月，到代代无已的人生、从男女相思相恋到情爱，赞颂了情爱的纯洁与美好。“人生代代无穷已，江月年年初照人”，是人生短暂、明月永恒的坦荡吐露。“不知江月待何人，但见长江东流水”，是在寄予时空的不朽，生命脆弱的情怀。那一轮孤月徘徊中天，像是有所等待，然而永远不能如愿。“江月有恨，流水无情”，男女相思相恋的离愁别恨，其凄苦之心可想而知。此诗，诗情荡漾，思恋无穷，幽怨声声，凄苦落寞。而苏轼的“明月如佳人，出海初异色。涓涓到湖上，潋潋摇空碧。”则更是以脉脉的凝望，心底的深情，用遥遥相视的目光，咏出了对明月那天仙似的气质、摄魂夺魄魅力的浩叹。他把自己的胸臆直抒出来。而韦庄的“炉边人似月，皓腕凝霜雪”也是传魂动神，仅以“人似月”和“皓腕”让你去遐思，去勾画玉女情态。王安石的“月移花影上栏杆”则是以活化的文学手段，让你去勾画丽媛的婀娜。赵嘏的“月色如水水如天”则是把明月的柔媚和水的柔媚比类。可见，古人对明月的钟情于推崇。\n\n可见，明月不仅有光艳迷人的外美，更有秀外慧中的内涵。她慷慨大方，善良多情；静谧安详，满腹经纶；气质典雅，含蓄而磊落；她志趣高远，；气质空灵淡远，性情温婉而静谧；她高贵而谦虚，妙曼而持重；她风骨遗世独立，才华非凡。\n\n啊，这就是你，内秀外华的女神，满腔情话的精灵，辉煌神圣的娇颜。这就是你，满腔温情、高古飘逸、情深义重的长空月！\n\n人们说，生与死、爱与恨，是人世的永恒。今夜的月轮，我确信，会是我此生永无泯灭的记忆，因为那人性中永远不可阻遏的力量，沉淀着万载千年的积淀！你高挂在无极飘渺之上，将辉煌的神圣洒在万丈红尘之中，是一首不朽红尘恋歌，给红尘中万物以生机。在这月色倾城之夜，望月思君，我想，此时此刻，这远方的她也许也在望着月轮，凝神地沉思吧？她是否也在寄托自己的心音？所以，我对着娇秀的月轮，不知不觉地攀着月华的清辉，踏上了月思的梦海。\n\n红尘中，天底下，最可珍贵的就是“情”字。情是不知不觉地，是相互心灵的相撞；是两人心音的共鸣，是无形无迹的默契。那轮圆融的皎月，敲开了我心灵的櫺窗，把思念的清辉，撒进了我的心房。使我那蛰伏在心底的激情，牵系着我的思念，飞向了那遥远的地方，飞向了她的方向，飞到了她的身边。也许这月轮不仅牵系着我的今生，还会牵系着我的来世来生。因为我分明看见了那月轮的后面，写着她的名字，也刻着我的心语，这难道不是冥冥中的缘么？\n\n红尘中，聚散离合都是缘。我顿然记起了她的名字，就是这个名字其实早已眠在了我的心底。是这天赐的福分，牵系着我的虔诚，慰藉着我干涩而焦灼的心。你的名字，就是我永无穷尽的、温柔酣香的梦，是永远缭绕着我的分分秒秒的时光。你用那赤诚和炽烈，唤起了我的青春的勇气。是你，用那轻旋袅远的美韵，张设起缤纷异彩的仙妙，在芳菲的日子，在香橙的季节，在娇媚的时刻，笼罩我将要焦干的躯壳。你的温润，总是令人迷离、眩痴。是你的温润，穿过了时空的一切，倏然降临到了我的身边。谱写了今生的红尘恋歌。\n\n红尘中，你的灵魂和我的灵魂永远牵系着，一起在飞，一起在飘，一起在翱翔。跨越了江河湖海，跨越了原野壑川，登上无极的山巅，在那清静的遥远的地方，我们述说着红尘的喜怒哀乐……\n\n红尘中，我愿与你同苦共难。你是莹雪，我便是洁冰；你是天上的云，我便是九霄的风；你是百灵，我愿做黄莺。我把这颗心交给你，让我们的心一起，流淌永不褪色的赤诚。\n\n假如红尘是朵鲜花，我愿和你一起同为花儿浇水汲肥，让花儿更加娇美艳丽。日间，我们牵手在花间牵手徜徉。夜里，我们在花丛同眠。\n\n假如红尘是一个美梦，我愿和你一起去追逐。梦中，我们一起打造理想和青春，让月更圆、草更绿、天更蓝、水更清。让生活更绮翠，让生命永恒。\n\n假如红尘是一首诗，不需要文字，不需要标点。不需要赞美，不需要描绘。只要我们灵魂的相通、相融，让缠绵的诗语去讴歌深情与真爱的高亢抑扬的铿锵。\n\n假如红尘是一首歌，我愿意和你去尽情的演绎。哼着同样的曲，呤着同样的调，颂唱着同样的主题，弹奏着一样的悠远的音譜，让生活中充满着关怀和爱护。\n\n假如红尘是一部书，我们一起去欣赏奇诗美文。一起为忧伤而忧伤，一起为欢乐而欢乐。\n\n在字里行间去推敲玄妙，去寻找趣味，去体验着快乐着的快乐，去叹惋着伤感的伤感。让瞬息变得漫长，让遥远来得更近、更快。\n\n假如红尘是一幅风景画，我愿和你一起去赴那些名山大川，在魂与梦的旖旎中，共浴光阴飘忽，共赏秀丽的绚奇，共摹画图的深邃，共绘我们的身影相随的姿采……\n\n在这月色倾城之际，在这红尘中、天底下、涛声里，你是我的恋，你是我的歌，我唯你是念。我让这念，随诗入画；让这念驰骋腾飞；让这念陪你遂心所欲地去追寻……\n\n没有身体的欲，没有龌龊的意，没有那贪鄙的邪，只是高尚的神往，只是高洁的情谊，魂与义，绝不是灵与肉的交织。\n\n让我撩起你那如云的发缕，怜惜地轻抚你那根根青丝，捧着你那皎玉般的脸庞，看着你那秋水似的明眸，尽情地欣赏你那秀颀的身影。我发现，你在会心地笑了。你看，那明月也在偷偷地笑。她也笑得真诚而自然……\n', '11', '2022-04-23 12:33:27', '2022-04-23 12:33:27'), ('104', '34243345', '<p>123</p>', '6', '2022-04-27 13:03:09', '2022-04-27 13:03:09'), ('106', '测试文化', '<div data-w-e-type=\"todo\" style=\"text-align: center;\"><input type=\"checkbox\" disabled=\"\"><span style=\"color: rgb(225, 60, 57);\"><em><strong>我就是测试的内容</strong></em></span></div><p style=\"text-align: center;\"><span style=\"color: rgb(225, 60, 57);\"><em><strong>&nbsp;</strong></em></span><a href=\"https://www.baidu.com\" target=\"_blank\">百度</a>&nbsp;</p>', '2', '2022-04-30 15:34:06', '2022-04-30 15:34:06'), ('112', '测试markdown语法', '<h1>一级标题</h1><p>皎洁而琼秀的月轮，高高地挂在云空，千束万束的月华清辉倾洒在大地上。远山近水，楼台亭榭，在银装的裹束下，格外寂静。夜色茫茫，在月下阒寂无声，似乎那么凝重、那么庄严、那么肃穆，但又很迷朦。庭前的碧树草畦被月色披扮着，比起日间神秘而奇特。那树，显得格外纤颀；畦中的小草，显得格外地碧翠；池中的水，也显得格外柔静。</p><p>天空是黝蓝色，浩茫而深邃。满天没有一丝白云，静悄悄的。夜阑人静，没有白日的喧嚣，也没有往日的满天星斗，往日伴随纤月的天罡地煞、太白天狼、牵牛织女也都不知了去向，许是躲进了自己的床榻，悄悄地安睡去了。风儿轻轻地吹，但有点踟蹰，似乎在诉说着自己的心结。那踟蹰而蹒跚的步履，像是有点醉。那低吟浅唱的哝哝絮语，象吟喟着古老的歌谣。那踟蹰的行迹，也留下了一串串的脚印，像是在寻找，像是在梭巡，又像是在搀扶着什么。它的脚印中也有无数的记忆，那有人世的沧桑，世故的冷暖、世态的炎凉……</p><p>人们说，天上一个月亮，地上有无数的月亮。是啊，“千江有水千江月，万里无云万里天”。无论江河湖海、池沼荷塘、潭沟水荡，只要有水，就会有秀媚的月亮。就是端一盆水放到空廷阶下，也会映出一轮明月。所谓“碧池若清浅，映月尤光辉”。确实，哪怕再清浅的一抔水，也能映出月轮的妩媚。这就是人们都唱的“天上的月亮在水中，水中的月亮在天上”。</p><h2>二级标题</h2><p>坛中的群芳，没了日间的光彩。虽然花颜顿失，她们为此感到憾恨，但依旧在散洒着她们的浓香。这浓香是在随伴着夜行未归的游子，也许是在陪伴着羁旅在外的天涯行客，也像在和月光一起跳着婆娑的舞。无论怎样，还是为月的窈窕和风采增加了光辉和灿烂。</p><p>远处的楼台亭阁，高低错落，朦朦胧胧，如痴如醉，在似乎的摇曳中，像是在炫耀着他那虚幻的隐约。那高楼低阁，高的、低的，相互错落着，再加上它的隐约的摇曳，和深邃的天空、皎白月轮、远山近树，构成了一幅硕大的画卷。</p><p>倾城的月色，演绎着千古的传说，讲述着亘古的诗话，鸣奏着不朽的红尘恋歌。这是江山的锦绣，是乾坤的钟灵，是天地的造化。这月、这夜、这风、这花、这景，构成了妙曼的红尘仙境。</p><p>人们说，生与死、爱与恨，是人世的永恒。今夜的月轮，我确信，会是我此生永无泯灭的记忆，因为那人性中永远不可阻遏的力量，沉淀着万载千年的积淀！你高挂在无极飘渺之上，将辉煌的神圣洒在万丈红尘之中，是一首不朽红尘恋歌，给红尘中万物以生机。在这月色倾城之夜，望月思君，我想，此时此刻，这远方的她也许也在望着月轮，凝神地沉思吧？她是否也在寄托自己的心音？所以，我对着娇秀的月轮，不知不觉地攀着月华的清辉，踏上了月思的梦海。</p><p>红尘中，天底下，最可珍贵的就是“情”字。情是不知不觉地，是相互心灵的相撞；是两人心音的共鸣，是无形无迹的默契。那轮圆融的皎月，敲开了我心灵的櫺窗，把思念的清辉，撒进了我的心房。使我那蛰伏在心底的激情，牵系着我的思念，飞向了那遥远的地方，飞向了她的方向，飞到了她的身边。也许这月轮不仅牵系着我的今生，还会牵系着我的来世来生。因为我分明看见了那月轮的后面，写着她的名字，也刻着我的心语，这难道不是冥冥中的缘么？</p><p>红尘中，聚散离合都是缘。我顿然记起了她的名字，就是这个名字其实早已眠在了我的心底。是这天赐的福分，牵系着我的虔诚，慰藉着我干涩而焦灼的心。你的名字，就是我永无穷尽的、温柔酣香的梦，是永远缭绕着我的分分秒秒的时光。你用那赤诚和炽烈，唤起了我的青春的勇气。是你，用那轻旋袅远的美韵，张设起缤纷异彩的仙妙，在芳菲的日子，在香橙的季节，在娇媚的时刻，笼罩我将要焦干的躯壳。你的温润，总是令人迷离、眩痴。是你的温润，穿过了时空的一切，倏然降临到了我的身边。谱写了今生的红尘恋歌。</p><p>红尘中，你的灵魂和我的灵魂永远牵系着，一起在飞，一起在飘，一</p><h3>三级标题</h3><p>人们说，生与死、爱与恨，是人世的永恒。今夜的月轮，我确信，会是我此生永无泯灭的记忆，因为那人性中永远不可阻遏的力量，沉淀着万载千年的积淀！你高挂在无极飘渺之上，将辉煌的神圣洒在万丈红尘之中，是一首不朽红尘恋歌，给红尘中万物以生机。在这月色倾城之夜，望月思君，我想，此时此刻，这远方的她也许也在望着月轮，凝神地沉思吧？她是否也在寄托自己的心音？所以，我对着娇秀的月轮，不知不觉地攀着月华的清辉，踏上了月思的梦海。</p><p>红尘中，天底下，最可珍贵的就是“情”字。情是不知不觉地，是相互心灵的相撞；是两人心音的共鸣，是无形无迹的默契。那轮圆融的皎月，敲开了我心灵的櫺窗，把思念的清辉，撒进了我的心房。使我那蛰伏在心底的激情，牵系着我的思念，飞向了那遥远的地方，飞向了她的方向，飞到了她的身边。也许这月轮不仅牵系着我的今生，还会牵系着我的来世来生。因为我分明看见了那月轮的后面，写着她的名字，也刻着我的心语，这难道不是冥冥中的缘么？</p><p>红尘中，聚散离合都是缘。我顿然记起了她的名字，就是这个名字其实早已眠在了我的心底。是这天赐的福分，牵系着我的虔诚，慰藉着我干涩而焦灼的心。你的名字，就是我永无穷尽的、温柔酣香的梦，是永远缭绕着我的分分秒秒的时光。你用那赤诚和炽烈，唤起了我的青春的勇气。是你，用那轻旋袅远的美韵，张设起缤纷异彩的仙妙，在芳菲的日子，在香橙的季节，在娇媚的时刻，笼罩我将要焦干的躯壳。你的温润，总是令人迷离、眩痴。是你的温润，穿过了时空的一切，倏然降临到了我的身边。谱写了今生的红尘恋歌。</p><p>红尘中，你的灵魂和我的灵魂永远牵系着，一起在飞，一起在飘，一</p><pre><code class=\"language-javascript\">const a = 100</code></pre><p><br></p>', '84', '2022-04-30 16:38:17', '2022-04-30 16:38:17'), ('113', 'ces1', '<p>cev</p>', '1', '2022-05-01 01:08:13', '2022-05-01 01:08:13');
COMMIT;

-- ----------------------------
--  Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `articleId` int(11) DEFAULT NULL,
  `category_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`),
  KEY `articleId_2` (`articleId`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `category`
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES ('170', '测试', null, null), ('175', '测试', '96', null);
COMMIT;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `commentId` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`),
  KEY `userId` (`userId`),
  KEY `articleId_2` (`articleId`),
  KEY `userId_2` (`userId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `comment`
-- ----------------------------
BEGIN;
INSERT INTO `comment` VALUES ('75', '96', '测试下评论功能', '2021-05-01 06:39:02', '2021-05-01 06:39:02', '47529560', null), ('76', '-1', '测试下留言', '2021-05-01 06:40:27', '2021-05-01 06:40:27', '47529560', null), ('77', '96', '我能回复不', '2021-05-01 07:14:33', '2021-05-01 07:14:33', '47529561', null), ('78', '-1', '但是为啥留言就不行', '2021-05-01 07:15:05', '2021-05-01 07:15:05', '47529561', null), ('79', '96', '测试测试', '2022-03-21 14:04:17', '2022-03-21 14:04:17', '47529560', null), ('80', '96', '33333333', '2022-03-21 14:06:07', '2022-03-21 14:06:07', '47529560', null), ('81', '96', '继续评论', '2022-03-21 14:09:09', '2022-03-21 14:09:09', '47529560', null), ('82', '96', '再评论', '2022-03-21 14:10:43', '2022-03-21 14:10:43', '47529560', null), ('83', '96', 'comment', '2022-03-21 14:15:35', '2022-03-21 14:15:35', '47529560', null), ('85', '96', 'tesrrrr', '2022-03-21 14:23:46', '2022-03-21 14:23:46', '47529560', null), ('87', '96', '3333333333', '2022-03-21 14:36:03', '2022-03-21 14:36:03', '47529560', null), ('88', '96', '4444444', '2022-03-21 14:38:08', '2022-03-21 14:38:08', '47529560', null), ('89', '96', '12', '2022-03-21 15:16:13', '2022-03-21 15:16:13', '47529560', null), ('93', '96', '44444444', '2022-03-21 15:23:56', '2022-03-21 15:23:56', '47529560', null), ('94', '103', '今生今世，你就是我永远的红尘恋歌！', '2022-04-23 12:36:07', '2022-04-23 12:36:07', '47529560', null), ('95', '106', '## 评论\n### 评论评论', '2022-04-30 15:34:52', '2022-04-30 15:34:52', '47529560', null);
COMMIT;

-- ----------------------------
--  Table structure for `ip`
-- ----------------------------
DROP TABLE IF EXISTS `ip`;
CREATE TABLE `ip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` text NOT NULL,
  `auth` tinyint(1) DEFAULT '1',
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `userId` (`userId`) USING BTREE,
  CONSTRAINT `ip_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `reply`
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `articleId` int(11) DEFAULT NULL,
  `commentId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `reply_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`),
  KEY `userId` (`userId`),
  KEY `articleId_2` (`articleId`),
  KEY `userId_2` (`userId`),
  CONSTRAINT `reply_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reply_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `reply`
-- ----------------------------
BEGIN;
INSERT INTO `reply` VALUES ('34', '再回复一下', '2021-05-01 06:39:13', '2021-05-01 06:39:13', '96', '75', '47529560', null), ('35', '看来是可以的', '2021-05-01 07:14:47', '2021-05-01 07:14:47', '96', '77', '47529561', null), ('36', '为啥我回复不了你', '2021-05-01 07:15:25', '2021-05-01 07:15:25', '-1', '76', '47529561', null), ('37', '我回复你', '2022-03-22 14:45:41', '2022-03-22 14:45:41', '96', '89', '47529560', null), ('38', '回复回复', '2022-03-22 14:47:50', '2022-03-22 14:47:50', '96', '80', '47529560', null), ('44', 'reply', '2022-03-22 15:10:45', '2022-03-22 15:10:45', '96', '83', '47529560', null), ('45', 'fuhui', '2022-03-22 15:11:05', '2022-03-22 15:11:05', '96', '93', '47529560', null);
COMMIT;

-- ----------------------------
--  Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 NOT NULL,
  `articleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `articleId` (`articleId`),
  KEY `articleId_2` (`articleId`),
  CONSTRAINT `tag_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `article` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `tag`
-- ----------------------------
BEGIN;
INSERT INTO `tag` VALUES ('227', '测试', '96'), ('230', '心情', '103'), ('234', '测试标签', '106'), ('235', 'ce1', null), ('236', 'ces1', null), ('237', 'ces2', null), ('239', 'markdown', '112'), ('240', 'ces', '113');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(255) DEFAULT NULL COMMENT '通过 bcrypt 加密后的密码',
  `email` varchar(50) DEFAULT NULL,
  `notice` tinyint(1) DEFAULT '1',
  `disabledDiscuss` tinyint(1) DEFAULT '0',
  `role` tinyint(4) DEFAULT '2' COMMENT '用户权限：1 - admin, 2 - 普通用户',
  `github` text CHARACTER SET utf8mb4,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47529564 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('39258456', 'lcmomo', null, null, '1', '0', '1', '{\"login\":\"lcmomo\",\"id\":39258456,\"node_id\":\"MDQ6VXNlcjM5MjU4NDU2\",\"avatar_url\":\"https://avatars.githubusercontent.com/u/39258456?v=4\",\"gravatar_id\":\"\",\"url\":\"https://api.github.com/users/lcmomo\",\"html_url\":\"https://github.com/lcmomo\",\"followers_url\":\"https://api.github.com/users/lcmomo/followers\",\"following_url\":\"https://api.github.com/users/lcmomo/following{/other_user}\",\"gists_url\":\"https://api.github.com/users/lcmomo/gists{/gist_id}\",\"starred_url\":\"https://api.github.com/users/lcmomo/starred{/owner}{/repo}\",\"subscriptions_url\":\"https://api.github.com/users/lcmomo/subscriptions\",\"organizations_url\":\"https://api.github.com/users/lcmomo/orgs\",\"repos_url\":\"https://api.github.com/users/lcmomo/repos\",\"events_url\":\"https://api.github.com/users/lcmomo/events{/privacy}\",\"received_events_url\":\"https://api.github.com/users/lcmomo/received_events\",\"type\":\"User\",\"site_admin\":false,\"name\":null,\"company\":\"西北农林科技大学\",\"blog\":\"\",\"location\":\"陕西西安\",\"email\":null,\"hireable\":null,\"bio\":null,\"twitter_username\":null,\"public_repos\":18,\"public_gists\":0,\"followers\":0,\"following\":0,\"created_at\":\"2018-05-14T07:31:10Z\",\"updated_at\":\"2021-04-05T13:55:34Z\"}', '2021-04-11 17:28:51', '2021-04-11 17:28:51'), ('47529560', 'su', 'pl0ozjSUHUtf2PGRe1tiCg==', '1234@qq.com', '1', '0', '1', null, '2021-05-01 06:29:36', '2021-05-01 06:29:36'), ('47529561', 'momo', 'syDCt72hUfTWAdiGTfAmyA==', '12345@qq.com', '1', '0', '2', null, '2021-05-01 07:08:52', '2021-05-01 07:08:52'), ('47529562', '苏兮执梦', '3agwZhEWk/VZkR3GbR9/Pg==', '333@qq.con', '1', '0', '2', null, '2022-03-07 15:45:28', '2022-03-07 15:45:28'), ('47529563', '苏兮执梦1', '3agwZhEWk/VZkR3GbR9/Pg==', '3333@qq.con', '1', '0', '2', null, '2022-03-07 15:50:16', '2022-03-07 15:50:16');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
