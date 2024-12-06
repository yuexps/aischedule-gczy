async function scheduleHtmlProvider() {
   await loadTool('AIScheduleTools')
   
   let ts = `
      1.登陆智慧工程
      2.点击【我的】
      3.点击【课表查询】
      4.等待课表信息加载，选择对应学年、学期，确认无误后点击【查询】（确保位于【学生课表查询】页面）
      5.点击下方【一键导入】
      6.导入成功（记得修改[开始上课时间]，可查看[校历]参考；以后可直接覆盖更新课表）
   `
   try {
      const response = await fetch(window.location.href);
      const text = await response.text();
      if (text.includes("学生课表查询")) {
          console.log("查询成功！");
      } else {
          console.log("查询失败！");
          await AIScheduleAlert(ts)
          return 'do not continue'
      }
  } catch (error) {
      console.error("检查页面内容时出错:", error);
      await AIScheduleAlert(error.message)
      return 'do not continue'
  }

   const type = document.querySelector('#shcPDF').dataset['type'];
   return `<div id="type">${type}</div>${document.querySelector(type === 'list' ? '#kblist_table' : '#kbgrid_table_0').outerHTML}`;
}