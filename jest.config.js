module.expoirts = {
  // 파일 확장자를 지정하지 않을 경우 Jest 가 참고할 확장자 목록을 의미한다.
  moduleFileExtensions: ['js', 'vue'],

  // <rootDir> 은 토큰으로 모든 루트 경로를 참조할 수 있다.
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },

  // 해당하는 경로에서 모듈을 가져오지 않는다
  modulePathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/dist'],

  // jsdom 에 대한 URL 을 설정한다
  // jest 는 브라우저에서 동작하는 것처럼 환경을 제공해야 하는데 jsdom 을 이용해서 테스트를 제공하는 것
  // https://github.com/facebook/jest/issues/6766
  testURL: 'http://localhost',

  // jest 는 vue.js 환경에서만 테스트를 하는 것이 아님
  // 그렇기에 vue라는 확장자, js 라는 확장자에 맞춰서 새로운 코드로 변환을 해줘야 한다.
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
  },
};
