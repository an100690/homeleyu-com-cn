// content-map.js
// 站点内容分区与搜索过滤工具

const siteConfig = {
  baseUrl: "https://homeleyu.com.cn",
  defaultSection: "首页",
  tags: ["乐鱼体育", "新闻", "赛事", "攻略", "社区"]
};

const contentSections = [
  {
    id: "sec001",
    title: "乐鱼体育首页",
    keywords: ["乐鱼体育", "首页", "推荐"],
    description: "平台最新动态与热门推荐"
  },
  {
    id: "sec002",
    title: "赛事中心",
    keywords: ["乐鱼体育", "赛事", "比分", "直播"],
    description: "实时赛事数据与直播入口"
  },
  {
    id: "sec003",
    title: "新闻资讯",
    keywords: ["乐鱼体育", "新闻", "报道", "分析"],
    description: "体育新闻与深度分析"
  },
  {
    id: "sec004",
    title: "攻略技巧",
    keywords: ["乐鱼体育", "攻略", "技巧", "教程"],
    description: "玩法攻略与技巧分享"
  },
  {
    id: "sec005",
    title: "社区互动",
    keywords: ["乐鱼体育", "社区", "讨论", "论坛"],
    description: "用户交流与社区活动"
  }
];

function buildSectionMap(sections) {
  const map = {};
  sections.forEach(section => {
    map[section.id] = {
      title: section.title,
      keywords: section.keywords,
      description: section.description,
      url: siteConfig.baseUrl + "/" + section.id
    };
  });
  return map;
}

function searchSections(query, sections) {
  if (!query || query.trim() === "") {
    return [];
  }
  const lowerQuery = query.toLowerCase().trim();
  return sections.filter(section => {
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const descMatch = section.description.toLowerCase().includes(lowerQuery);
    const keywordMatch = section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
    return titleMatch || descMatch || keywordMatch;
  });
}

function getTagsBySectionId(sectionId, sections) {
  const section = sections.find(s => s.id === sectionId);
  if (!section) {
    return [];
  }
  return section.keywords.filter(kw => siteConfig.tags.includes(kw));
}

function filterByTag(tag, sections) {
  if (!tag || tag.trim() === "") {
    return [];
  }
  return sections.filter(section => section.keywords.includes(tag.trim()));
}

function printSectionSummary(section) {
  const summary = `[${section.id}] ${section.title} - ${section.description}`;
  return summary;
}

function listAllTitles(sections) {
  return sections.map(section => section.title);
}

// 示例使用（不自动执行，仅展示调用方式）
// const sectionMap = buildSectionMap(contentSections);
// const results = searchSections("乐鱼体育", contentSections);
// console.log(results);

// 导出（Node.js 环境）
if (typeof module !== "undefined") {
  module.exports = {
    siteConfig,
    contentSections,
    buildSectionMap,
    searchSections,
    getTagsBySectionId,
    filterByTag,
    printSectionSummary,
    listAllTitles
  };
}