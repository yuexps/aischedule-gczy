
function scheduleHtmlParser(html) {
   let result = [];
   if ($('#type').text() === 'list') {
      result = parserList(html);
   } else {
      result = parserTbale(html);
   }
   return {
      courseInfos: result
   };
}

/**
 * 解析表格
 * 
 * @param {String} html
 */
function parserTbale(html) {
   const regexName = /[●★○]/g;

   const courseInfoList = [];
   const $ = cheerio.load(html, { decodeEntities: false });

   $('#kbgrid_table_0 td').each((i, td) => {
      if ($(td).hasClass('td_wrap') && $(td).text().trim() !== '') {
         const day = parseInt($(td).attr('id').split('-')[0]);
         $(td).find('.timetable_con.text-left').each((i, course) => {
            const name = $(course).find('.title font').text().replace(regexName, '').trim();
            const infoStr = $(course).find('p').eq(0).find('font').text().trim();
            const position = $(course).find('p').eq(1).find('font').text().trim();
            const teacher = $(course).find('p').eq(2).find('font').text().trim();

            if (infoStr && infoStr.match(/\((\d+-\d+节)\)/) && infoStr.split('节)')[1]) {
               const [sections, weeks] = parserInfo(infoStr);

               if (name && position && teacher && sections.length && weeks.length) {
                  const data = { name, day, weeks, sections, teacher, position };
                  courseInfoList.push(data);
               }
            }
         });
      }
   });
   return courseInfoList;
}




/**
 * 解析列表
 * 
 * @param {String} html 
 */
function parserList(html) {
   const $ = cheerio.load(html, { decodeEntities: false });

   const regexName = /[●★○]/g;
   const regexWeekNum = /周数：|周/g;
   const regexPosition = /上课地点：/g;
   const regexTeacher = /教师 ：/g;

   let courseInfoList = [];
   $('#kblist_table tbody').each((day, tbody) => {
      if (day > 0 && day < 8) {
         let sections;
         $(tbody).find('tr:not(:first-child)').each((trIndex, tr) => {
            const data = {};
            let name, font;
            if ($(tr).find('td').length > 1) {
               sections = parserSections($(tr).find('td:first-child').text());
               name = $(tr).find('td:nth-child(2)').find('.title').text().replace(regexName, '').trim();
               font = $(tr).find('td:nth-child(2)').find('p font');
            } else {
               name = $(tr).find('td').find('.title').text().replace(regexName, '').trim();
               font = $(tr).find('td').find('p font');
            }
            const weeks = parserWeeks($(font[0]).text().replace(regexWeekNum, '').trim());
            const position = $(font[1]).text().replace(regexPosition, '').trim().split(' ')[1];
            const teacher = $(font[2]).text().replace(regexTeacher, '').trim();
            Object.assign(data, { name, day, weeks, sections, teacher, position });
            courseInfoList.push(data);
         });
      }
   });
   return courseInfoList;
}


/**
 * 解析课程信息
 *
 * @param {String} str
 */
function parserInfo(str) {
   const sections = parserSections(str.match(/\((\d+-\d+节)\)/)[1].replace(/节/g, ''));
   const weeks = parserWeeks(str.split('节)')[1].replace(/周/g, ''));
   return [sections, weeks];
}

/**
 * 解析节次
 * 
 * @param {String} str
 */
function parserSections(str) {
   const [start, end] = str.split('-').map(Number);
   return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

/**
 * 解析周次
 * 
 * @param {String} str
 */
function parserWeeks(str) {
   const array = str.split(',');
   let weeks = array.reduce((acc, item) => {
      const [flag, _str] = parserWeekFlag(item);
      if (_str.includes('-')) {
         const [start, end] = _str.split('-').map(Number);
         for (let i = start; i <= end; i++) {
            acc.push({ flag, week: i });
         }
      } else {
         acc.push({ flag, week: Number(_str) });
      }
      return acc;
   }, []);

   return weeks.filter(i => {
      if (i.flag === 1) return i.week % 2 === 1;
      if (i.flag === 2) return i.week % 2 === 0;
      return true;
   }).map(item => item.week);
}

/**
 * 判断单双周
 * 
 * @param {String} str
 */
function parserWeekFlag(str) {
   let flag = 0;
   if (str.includes('单')) {
      flag = 1;
   } else if (str.includes('双')) {
      flag = 2;
   }
   str = str.replace(/\(.*\)/, '');
   return [flag, str];
}