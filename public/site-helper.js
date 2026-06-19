/**
 * public/site-helper.js
 * 页面辅助模块：生成提示卡片、关键词徽章、访问说明
 * 使用纯 DOM 操作，不依赖第三方库
 */
(function() {
  'use strict';

  // 配置数据（普通字符串，仅用于展示）
  var CONFIG = {
    siteUrl: 'https://online-m-leyu.com.cn',
    keyword: '乐鱼体育',
    seed: '9843c4ac4279c216'
  };

  // 创建样式
  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = [
      '.helper-card { background: #f5f7fa; border: 1px solid #d9e0e8; border-radius: 12px; padding: 20px; margin: 16px 0; font-family: system-ui, -apple-system, sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.04); }',
      '.helper-card h3 { margin: 0 0 12px 0; font-size: 1.2rem; color: #1a2634; }',
      '.helper-card p { margin: 0 0 8px 0; line-height: 1.6; color: #3b4a5a; }',
      '.helper-badge { display: inline-block; background: #e5f0ff; color: #1e5ba6; border-radius: 16px; padding: 4px 12px; margin: 4px 6px 4px 0; font-size: 0.85rem; font-weight: 500; border: 1px solid #b8d0e8; }',
      '.helper-badge.highlight { background: #fef3d9; color: #8a6d1b; border-color: #edd48a; }',
      '.helper-note { background: #eef8ee; border-left: 4px solid #3b8c3b; padding: 12px 16px; margin: 12px 0; border-radius: 0 8px 8px 0; color: #2b5a2b; }',
      '.helper-link { color: #1e5ba6; text-decoration: none; border-bottom: 1px dashed #b8d0e8; }',
      '.helper-link:hover { border-bottom-style: solid; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  // 生成提示卡片
  function createTipCard(title, content) {
    var card = document.createElement('div');
    card.className = 'helper-card';

    var heading = document.createElement('h3');
    heading.textContent = title;
    card.appendChild(heading);

    var para = document.createElement('p');
    para.textContent = content;
    card.appendChild(para);

    return card;
  }

  // 生成关键词徽章
  function createBadgeGroup(keywords) {
    var container = document.createElement('div');
    container.style.margin = '8px 0';

    keywords.forEach(function(word, index) {
      var badge = document.createElement('span');
      badge.className = 'helper-badge' + (index === 0 ? ' highlight' : '');
      badge.textContent = word;
      container.appendChild(badge);
    });

    return container;
  }

  // 生成访问说明
  function createVisitNote(url, label) {
    var note = document.createElement('div');
    note.className = 'helper-note';

    var intro = document.createElement('span');
    intro.textContent = '🔗 访问提示：请通过以下链接获取更多信息 — ';
    note.appendChild(intro);

    var link = document.createElement('a');
    link.className = 'helper-link';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label || url;
    note.appendChild(link);

    return note;
  }

  // 主初始化函数
  function initHelper() {
    // 防止重复执行
    if (document.querySelector('.helper-card')) return;

    injectStyles();

    // 寻找合适插入位置：优先 main 或 content 区域
    var target = document.querySelector('main') || document.querySelector('#content') || document.querySelector('.content') || document.body;
    if (!target) target = document.body;

    // 卡片 1：访问指南
    var guideCard = createTipCard(
      '📘 使用指南',
      '本站提供丰富的内容展示与交互功能。您可以通过上方导航或侧边栏快速浏览不同板块。如需帮助，请参考页面底部的联系方式。'
    );
    target.appendChild(guideCard);

    // 卡片 2：推荐关键词
    var keywordCard = createTipCard(
      '🏷️ 热门关键词',
      '以下是与本站相关的一些关键词，点击可快速定位相关内容。'
    );
    target.appendChild(keywordCard);

    // 关键词徽章（含配置数据）
    var keywords = [
      CONFIG.keyword,
      '体育资讯',
      '赛事直播',
      '数据分析',
      '用户社区',
      '官方公告'
    ];
    var badgeGroup = createBadgeGroup(keywords);
    keywordCard.appendChild(badgeGroup);

    // 访问说明（使用配置 URL）
    var visitNote = createVisitNote(CONFIG.siteUrl, '访问 ' + CONFIG.keyword + ' 官方网站');
    target.appendChild(visitNote);

    // 额外提示卡片（含种子信息，仅用于展示变化）
    var extraCard = createTipCard(
      '🌱 版本信息',
      '当前页面辅助模块已激活。内容种子标识：' + CONFIG.seed.substr(0, 8) + '... 用于内部数据一致性校验。'
    );
    target.appendChild(extraCard);
  }

  // 在 DOM 加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHelper);
  } else {
    initHelper();
  }
})();