import { loginTimeout } from '../error';
export default [
  {
    url: '/basic-api/history',
    methods: 'get',
    timeout: 100,
    statusCode: 200,
    response: ({ headers }) => {
      if (headers.authorization && headers.authorization.split('Bearer')[1]) {
        return {
          code: '0000',
          message: 'ok',
          status: true,
          data: {
            referenceAddress: [
              'https://baike.baidu.com/item/%E6%8A%97%E6%97%A5%E6%88%98%E4%BA%89/128498?fr=ge_ala',
              'https://baijiahao.baidu.com/s?id=1759237820867361964&wfr=spider&for=pc',
            ],
            historyList: [
              {
                id: '一',
                eventName: '九一八事变',
                occurTime: '1931.9.18',
                description:
                  '九一八事变，又称奉天事变、柳条湖事件，是日本驻中国东北地区的关东军突然袭击沈阳，以武力侵占东北的事件',
              },
              {
                id: '二',
                eventName: '华北事变',
                occurTime: '1935',
                description:
                  '华北事变是指继九一八事变东北沦陷之后，1935年日本侵略军蚕食侵犯华北地区的一系列事件的统称',
              },
              {
                id: '三',
                eventName: '一二九运动',
                occurTime: '1935.12.9',
                description:
                  '为反对华北自治和日本帝国主义，北平大中学生数千人举行了抗日救国示威游行，反对华北自治，反抗日本帝国主义，要求保全中国领土的完整，掀起全国抗日救国新高潮',
              },
              {
                id: '四',
                eventName: '西安事变',
                occurTime: '1936.12.12',
                description:
                  '张学良和杨虎城为了达到劝谏蒋介石改变“攘外必先安内”的国策，在西安发动“兵谏”，又称“双十二事变”。在中共中央和周恩来主导下，以蒋介石接受“停止内战，联共抗日”的主张而和平解决。',
              },
              {
                id: '五',
                eventName: '七七事变',
                occurTime: '1937.7.7',
                description:
                  '七七事变，又称卢沟桥事变，是日军假借搜寻士兵为由对中国军队发起的战争。',
              },
              {
                id: '六',
                eventName: '淞沪会战',
                occurTime: '1937.8.13-1937.11.12',
                description:
                  '淞沪会战开始于1937年8月13日，是卢沟桥事变后，蒋介石为了把日军由北向南的入侵方向引导改变为由东向西，以利于长期作战，而在上海采取主动反击的战役',
              },
              {
                id: '七',
                eventName: '太原会战',
                occurTime: '1937.09-1937.11',
                description:
                  '太原会战是抗战爆发后，中国第2战区部队同日军华北方面军在山西省北部、东部和中部地区进行的大规模的战略性防御战役，为中日双方在华北进行的第一场大规模会战。主要包括平型关战役、忻口战役、娘子关战役、太原保卫战等。',
              },
              {
                id: '八',
                eventName: '南京保卫战',
                occurTime: '1937.12',
                description:
                  '南京保卫战是中国军队在淞沪会战失利后，为保卫首都南京与日本侵略军展开的作战。1937年12月13日，南京沦陷，日军开始了惨绝人寰的南京大屠杀。（12月13日也成为国家公祭日）',
              },
              {
                id: '九',
                eventName: '徐州会战',
                occurTime: '1938.01',
                description:
                  '徐州会战是中日双方在以江苏省徐州为中心的进行的一次大规模防御战役，其中以1938年三四月间的台儿庄大战最为著名，因围歼日军一万余人，史称之为台儿庄大捷',
              },
              {
                id: '十',
                eventName: '武汉会战',
                occurTime: '1938.6-1938.10',
                description:
                  '武汉会战是抗日战争战略防御阶段规模最大、时间最长、歼敌最多的一次战役，此后，中国抗日战争进入战略相持阶段',
              },
              {
                id: '十一',
                eventName: '长沙会战',
                occurTime: '1939.9月-1942.2',
                description:
                  '长沙会战是抗日战争进入相持阶段以后，国民党正面战场抵抗日本帝国主义军队侵略所取得的重大胜利，是抗战爆发以来，中国军队第一次以武力迫使日军回到原战略态势的战役',
              },
              {
                id: '十二',
                eventName: '桂南会战',
                occurTime: '1939.10-1940.1',
                description:
                  '桂南会战是中国守军抵抗日军为打击中国国际交通线并威胁西南大后方而在广西南宁等地区展开的作战。',
              },
              {
                id: '十三',
                eventName: '枣宜会战',
                occurTime: '1940.5-1940.6',
                description:
                  '枣宜会战中，国民党第33集团军总司令张自忠殉国，是二战中同盟国牺牲的最高将领',
              },
              {
                id: '十四',
                eventName: '百团大战',
                occurTime: '1940.8-1941.1',
                description:
                  '百团大战由彭德怀指挥，是抗日战争相持阶段八路军在华北地区发动的一次规模最大、持续时间最长的战役。',
              },
              {
                id: '十五',
                eventName: '日本投降',
                occurTime: '1945.8.15',
                description:
                  '1945年8月14日，中国与苏联签订《中苏友好同盟条约》；15日，日本照会中、苏、美、英四国，表示接受《波茨坦公告》。15日正午，日本裕仁天皇通过广播发表《终战诏书》，宣布无条件投降。',
              },
            ],
          },
        };
      } else {
        return { ...loginTimeout };
      }
    },
  },
  {
    url: '/basic-api/dashboardBasic',
    methods: 'get',
    timeout: 1000,
    statusCode: 200,
    response: ({ headers }) => {
      if (headers.authorization && headers.authorization.split('Bearer')[1]) {
        return {
          code: '0000',
          message: 'ok',
          status: true,
          data: [
            {
              title: '浏览量',
              number: 92839,
              icon: '',
            },
            {
              title: '下载数',
              number: 82421,
              icon: '',
            },
            {
              title: '点赞量',
              number: 1032839,
              icon: '',
            },
            {
              title: '更新幅度',
              number: 890,
              icon: '',
            },
          ],
        };
      } else {
        return { ...loginTimeout };
      }
    },
  },
];
