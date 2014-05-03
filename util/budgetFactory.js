var _ = require("underscore");
var util = require("util");
var Q = require('q');

var resolveCost = function (chapterNo, amount) {
  return chapterNo <= 2800 ? amount : 0;
};
var resolveRevenue = function (chapterNo, amount) {
  return chapterNo > 3000 ? amount : 0;
};
var Post = function (budget, chapterNo, postNo, postName, amount) {
  this.budget = budget;
  this.chapterNo = chapterNo;
  this.no = postNo;
  this.name = postName;
  this.cost = resolveCost(chapterNo, amount);
  this.revenue = resolveRevenue(chapterNo, amount);
};
var Chapter = function (budget, frameNo, chapterNo, chapterName) {
  this.budget = budget;
  this.frameNo = frameNo;
  this.no = chapterNo;
  this.name = chapterName;
};
var Frame = function (budget, frameNo, frameName) {
  this.budget = budget;
  this.no = frameNo;
  this.name = frameName;
};
var Budget = function (name, year) {
  this.name = name;
  this.year = year;
  this.frames = [];
  this.frames._map = {};
  this.chapters = [];
  this.chapters._map = {};
  this.posts = [];
  this.posts._map = {};
};
Budget.prototype.addFrame = function (frameNo, frameName) {
  var frame = new Frame(this, frameNo, frameName);
  this.frames.push(frame);
  this.frames._map[frameNo] = this.frames._map[frameNo] || Q.defer();
  this.frames._map[frameNo].resolve(frame);
};
Budget.prototype.getFrame = function (frameNo) {
  this.frames._map[frameNo] = this.frames._map[frameNo] || Q.defer();
  return this.frames._map[frameNo].promise;
};
Budget.prototype.addChapter = function (frameNo, chapterNo, chapterName) {
  var chapter = new Chapter(this, frameNo, chapterNo, chapterName);
  this.chapters.push(chapter);
  this.chapters._map[chapterNo] = this.chapters._map[chapterNo] || Q.defer();
  this.chapters._map[chapterNo].resolve(chapter);
};
Budget.prototype.getChapter = function (chapterNo) {
  this.chapters._map[chapterNo] = this.chapters._map[chapterNo] || Q.defer();
  return this.chapters._map[chapterNo].promise;
};
var generatePostKey = function (chapterNo, postNo) {
  return util.format("%d-%d", chapterNo, postNo);
}
Budget.prototype.addPost = function (chapterNo, postNo, postName, amount) {
  var post = new Post(this, chapterNo, postNo, postName, amount);
  this.posts.push(post);
  var postKey = generatePostKey(chapterNo, postNo);
  this.posts._map[postKey] = this.posts._map[postKey] || Q.defer();
  this.posts._map[postKey].resolve(post);
};
Budget.prototype.getPost = function (chapterNo, postNo) {
  var postKey = generatePostKey(chapterNo, postNo);
  this.posts._map[postKey] = this.posts._map[postKey] || Q.defer();
  return this.posts._map[postKey].promise;
};
module.exports = {
  create: function (name, year) {
    return new Budget(name, year);
  }
};