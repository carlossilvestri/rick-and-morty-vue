import { mount } from '@vue/test-utils'
import Card from '@/components/Card.vue'
import mockCharacters from '../../mock-data/characters.json'

describe('Card.vue', () => {
  it('Must have info prop object', () => {
    const wrapper = mount(Card, {
      propsData: {
        info: mockCharacters
      }
    });
    const infoImage = wrapper.find("[data-testId='image']");
    const infoName = wrapper.find("[data-testId='info-name']");
    const infoLocationName = wrapper.find("[data-testId='info-location-name']");
    const infoCreated = wrapper.find("[data-testId='info-created']");

    expect(infoImage.element.src.length).toBeGreaterThan(0);
    expect(infoName.element.textContent.length).toBeGreaterThan(0);
    expect(infoLocationName.element.textContent.length).toBeGreaterThan(0);
    expect(infoCreated.element.textContent.length).toBeGreaterThan(0);
  });
  xit('Must call $emit method when click on ', async () => {
    const wrapper = mount(Card, {
      propsData: {
        info: mockCharacters
      }
    });
    const contTextCard = wrapper.find("[data-testId='cont-text-card']");
    contTextCard.trigger("click");
    await wrapper.vm.$nextTick();
    const openModal = jest.spyOn(Card.methods, 'openModal');
    console.log("openModal ", openModal);
    expect(openModal).toHaveBeenCalled();

  })
})