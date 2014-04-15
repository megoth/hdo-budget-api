module.exports = {
  less: {
    files: ['**/*.less'],
    tasks: ['less'],
    options: {
      spawn: false
    }
  },
  sass: {
    files: ['**/*.scss'],
    tasks: ['sass'],
    options: {
      spawn: false
    }
  }
};