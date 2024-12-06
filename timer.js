async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
  return {
    totalWeek: 20, // 总周数：[1, 30]之间的整数
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: true, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 6, // 下午课程节数：[0, 10]之间的整数
    night: 3, // 晚间课程节数：[0, 10]之间的整数
    sections: [
      {
        section: 1, // 节次：[1, 30]之间的整数
        startTime: '08:30', // 开始时间：参照这个标准格式5位长度字符串
        endTime: '09:15', // 结束时间：同上
      },
      {
        section: 2,
        startTime: '09:20',
        endTime: '10:05',
      },
      {
        section: 3,
        startTime: '10:25',
        endTime: '11:10',
      },
      {
        section: 4,
        startTime: '11:15',
        endTime: '12:00',
      },
      {
        section: 5,
        startTime: '12:00',
        endTime: '12:55',
      },
      {
        section: 6,
        startTime: '13:20',
        endTime: '13:55',
      },
      {
        section: 7,
        startTime: '14:00',
        endTime: '14:45',
      },
      {
        section: 8,
        startTime: '14:50',
        endTime: '15:35',
      },
      {
        section: 9,
        startTime: '15:45',
        endTime: '16:30',
      },
      {
        section: 10,
        startTime: '16:35',
        endTime: '17:20',
      },
      {
        section: 11,
        startTime: '17:20',
        endTime: '18:25',
      },
      {
        section: 12,
        startTime: '18:30',
        endTime: '19:15',
      },
      {
        section: 13,
        startTime: '19:20',
        endTime: '20:05',
      }
    ] // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  }
}