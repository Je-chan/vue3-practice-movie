import { shallowMount } from '@vue/test-utils';
import router from '~/routes';
import store from '~/store';
import Header from '~/components/Header';

describe('components/Header.vue 테스트', () => {
  // 아래처럼 한다면 첫 번째 테스트로 인해서 오염될 수 있다.
  // 고유한 환경으로 테스트가 동작해야 하므로 이런 코드 작성은 할 수 없다.
  // const wrapper = shallowMount(Header, {
  //   global: {
  //     plugins: [router, store],
  //   },
  // });
  let wrapper;
  beforeEach(async () => {
    // 페이지 이동을 하기 위해서 현재 샘플로 tt1234567 라우터로 이동했다는 것.
    // 한 가지 문제점은 라우터로 이동을 했을 때 우리가 작성한 코드에서는 window.scrollTo 가 실행이 되는데
    // 테스트에서는 window 객체가 없으므로 에러를 반환한다.
    // 이런 문제를 해결하기 위해서 그냥 scrollTo를 가짜 함수로 실행시킨다. 그 가짜 함수가 바로 모의 함수.
    window.scrollTo = jest.fn();
    router.push('/movie/tt1234567');

    await router.isReady();
    wrapper = shallowMount(Header, {
      global: {
        plugins: [router, store],
      },
    });
  });

  test('경로 정규 표현식이 없는 경우 일치하지 않습니다.', () => {
    const regExp = undefined;
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });
  test('경로 정규 표현식과 일치해야 합니다', () => {
    const regExp = /^\/movie/;
    expect(wrapper.vm.isMatch(regExp)).toBe(true);
  });
  test('경로 정규 표현식과 일치하지 않아야 합니다', () => {
    const regExp = /^\/je/;
    expect(wrapper.vm.isMatch(regExp)).toBe(false);
  });
});
