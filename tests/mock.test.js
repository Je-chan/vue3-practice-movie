import axios from 'axios';
import * as mockTest from './mock';

describe('mock 테스트', () => {
  test('spyOn', async () => {
    jest.spyOn(mockTest, 'mockFn').mockResolvedValue('6 second!');

    const res = await mockTest.mockFn();
    expect(res).toBe('6 second!');
  });
});

describe('axios 테스트', () => {
  test('영화 제목 변환', async () => {
    // get 메소드를 모의 함수로 만들고자 함
    // 모의로 만들어진 함수가 실행된다.
    // 하나의 콜백 함수를 만들고 axios.get 이 비동기처리가 되니 Promise 를 반환한다
    // 그리고 데이터를 받는 구조와 동일한 로직을 작성한다.

    axios.get = jest.fn(() => {
      return new Promise((resolve) => {
        resolve({
          data: {
            Title: 'Frozen II',
          },
        });
      });
    });

    const title = await mockTest.fetchMovieTitle();
    expect(title).toBe('Frozen ii');
  });
});
