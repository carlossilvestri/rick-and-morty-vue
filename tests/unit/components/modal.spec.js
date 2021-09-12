import { mount } from '@vue/test-utils'
import Modal from '@/components/Modal.vue'
import mockCharacters from '../../mock-data/characters.json'

describe('Modal.vue', () => {
  it('Must have data prop object', () => {
    const wrapper = mount(Modal, {
      propsData: {
        data: mockCharacters
      }
    });
    const dataImage = wrapper.find("[data-testId='image-modal']");
    const dataStatus = wrapper.find("[data-testId='data-status']");
    const dataName = wrapper.find("[data-testId='data-name']");
    const dataSpecies = wrapper.find("[data-testId='data-species']");

    expect(dataImage.element.src.length).toBeGreaterThan(0);
    expect(dataStatus.element.textContent.length).toBeGreaterThan(0);
    expect(dataName.element.textContent.length).toBeGreaterThan(0);
    expect(dataSpecies.element.textContent.length).toBeGreaterThan(0);
  });
})
