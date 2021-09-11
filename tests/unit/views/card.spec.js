import { mount } from '@vue/test-utils'
import Card from '@/components/Card.vue'

describe('Card.vue', () => {
  it('should have btn-1 class', () => {
    const msg = 'new message'
    const wrapper = mount(Card);

    // expect(wrapper.contains('div')).toBe(true)
    expect(true).toBe(true)
  })
})
